import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, getCurrentProfile, getCurrentBusiness } from "./supabase";
import type { Business, Menu, Category, MenuItem } from "@/types/database";

// Profile hooks
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentProfile,
  });
}

// Business hooks
export function useBusiness() {
  return useQuery({
    queryKey: ["business"],
    queryFn: getCurrentBusiness,
  });
}

export function useUpdateBusiness() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (business: Partial<Business>) => {
      const { data, error } = await supabase
        .from("businesses")
        .update(business)
        .eq("id", business.id!)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
  });
}

// Menu hooks
export function useMenus(businessId?: string) {
  return useQuery({
    queryKey: ["menus", businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("business_id", businessId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!businessId,
  });
}

export function useMenu(menuId?: string) {
  return useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      if (!menuId) return null;
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("id", menuId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!menuId,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menu: Omit<Menu, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("menus")
        .insert(menu)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menus", variables.business_id] });
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menu: Partial<Menu>) => {
      const { data, error } = await supabase
        .from("menus")
        .update(menu)
        .eq("id", menu.id!)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["menus", data.business_id] });
      queryClient.invalidateQueries({ queryKey: ["menu", data.id] });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menuId: string) => {
      const { error } = await supabase.from("menus").delete().eq("id", menuId);
      if (error) throw error;
    },
    onSuccess: (_, menuId) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menu", menuId] });
    },
  });
}

// Category hooks
export function useCategories(menuId?: string) {
  return useQuery({
    queryKey: ["categories", menuId],
    queryFn: async () => {
      if (!menuId) return null;
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("menu_id", menuId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!menuId,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories", variables.menu_id] });
    },
  });
}

// Menu item hooks
export function useMenuItems(categoryId?: string) {
  return useQuery({
    queryKey: ["menuItems", categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("category_id", categoryId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<MenuItem, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("menu_items")
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.category_id] });
    },
  });
}
