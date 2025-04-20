import type { Menu, Category, MenuItem, Business } from './database';

export interface MenuWithCategories extends Menu {
  type: 'menu';
  categories: Category[];
  background_type: 'color' | 'pattern';
  background_value: string;
}

export interface BusinessFormData {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  phone_type: 'cell' | 'landline';
  business_name: string;
  business_phone: string;
  business_address: string;
  business_email: string;
  description?: string;
  business_website?: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
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
        Row: {
          id: string;
          menu_item_id: string;
          name: string;
          price: string;
          is_available: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          {
            id: string;
            menu_item_id: string;
            name: string;
            price: string;
            is_available: boolean;
            display_order: number;
            created_at: string;
            updated_at: string;
          },
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<
          Omit<
            {
              id: string;
              menu_item_id: string;
              name: string;
              price: string;
              is_available: boolean;
              display_order: number;
              created_at: string;
              updated_at: string;
            },
            'id' | 'created_at' | 'updated_at'
          >
        >;
      };
      profiles: {
        Row: {
          id: string;
          subscription_plan: 'free' | 'advanced';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          subscription_plan?: 'free' | 'advanced';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subscription_plan?: 'free' | 'advanced';
          created_at?: string;
          updated_at?: string;
        };
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
