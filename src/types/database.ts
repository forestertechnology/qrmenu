export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  address?: string;
  phone?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface Menu {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  background_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  menu_id: string;
  name: string;
  description?: string;
  image_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
  is_available: boolean;
  display_order: number;
  dietary_info: {
    vegetarian: boolean;
    vegan: boolean;
    gluten_free: boolean;
    contains_nuts: boolean;
    spicy: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface MenuItemOption {
  id: string;
  menu_item_id: string;
  name: string;
  price: string;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  subscription_plan: "free" | "advanced";
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'created_at'>;
        Update: Partial<Omit<User, 'created_at'>>;
      };
      businesses: {
        Row: Business;
        Insert: Omit<Business, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Business, 'id' | 'created_at' | 'updated_at'>>;
      };
      menus: {
        Row: Menu;
        Insert: Omit<Menu, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Menu, 'id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      menu_items: {
        Row: MenuItem;
        Insert: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>>;
      };
      menu_item_options: {
        Row: MenuItemOption;
        Insert: Omit<MenuItemOption, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MenuItemOption, 'id' | 'created_at' | 'updated_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'created_at' | 'updated_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
