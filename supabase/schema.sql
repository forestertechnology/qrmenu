-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Set up storage for images
insert into storage.buckets (id, name, public) values ('menu-images', 'menu-images', true);
create policy "Menu images are publicly accessible" on storage.objects for select using (bucket_id = 'menu-images');
create policy "Authenticated users can upload menu images" on storage.objects for insert with check (bucket_id = 'menu-images' and auth.role() = 'authenticated');
create policy "Users can update their own menu images" on storage.objects for update using (bucket_id = 'menu-images' and auth.uid() = owner);
create policy "Users can delete their own menu images" on storage.objects for delete using (bucket_id = 'menu-images' and auth.uid() = owner);

-- Create enum types
create type user_role as enum ('business', 'admin');
create type subscription_plan as enum ('free', 'advanced');
create type menu_type as enum ('regular', 'catering');
create type background_type as enum ('color', 'pattern');

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role user_role not null default 'business',
  subscription_plan subscription_plan not null default 'free',
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create businesses table
create table businesses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  phone_type text not null check (phone_type in ('cell', 'landline')),
  business_name text not null,
  business_phone text not null,
  business_address text not null,
  business_email text not null,
  business_website text,
  logo_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create menus table
create table menus (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses on delete cascade not null,
  name text not null,
  type menu_type not null default 'regular',
  description text,
  background_type background_type not null,
  background_value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  menu_id uuid references menus on delete cascade not null,
  name text not null,
  display_order integer not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create menu_items table
create table menu_items (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references categories on delete cascade not null,
  name text not null,
  price decimal(10,2) not null,
  description text not null,
  calories integer,
  allergy_info text,
  image_url text,
  display_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create analytics table for QR code scans and menu views
create table analytics (
  id uuid default uuid_generate_v4() primary key,
  menu_id uuid references menus on delete cascade not null,
  event_type text not null check (event_type in ('scan', 'view')),
  user_agent text,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up row level security (RLS)
alter table profiles enable row level security;
alter table businesses enable row level security;
alter table menus enable row level security;
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table analytics enable row level security;

-- Create policies
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view their own businesses" on businesses for select using (auth.uid() = user_id);
create policy "Users can insert their own businesses" on businesses for insert with check (auth.uid() = user_id);
create policy "Users can update their own businesses" on businesses for update using (auth.uid() = user_id);
create policy "Users can delete their own businesses" on businesses for delete using (auth.uid() = user_id);

create policy "Users can view their own menus" on menus for select using (
  business_id in (select id from businesses where user_id = auth.uid())
);
create policy "Users can insert their own menus" on menus for insert with check (
  business_id in (select id from businesses where user_id = auth.uid())
);
create policy "Users can update their own menus" on menus for update using (
  business_id in (select id from businesses where user_id = auth.uid())
);
create policy "Users can delete their own menus" on menus for delete using (
  business_id in (select id from businesses where user_id = auth.uid())
);

create policy "Users can view their own categories" on categories for select using (
  menu_id in (select id from menus where business_id in (select id from businesses where user_id = auth.uid()))
);
create policy "Users can insert their own categories" on categories for insert with check (
  menu_id in (select id from menus where business_id in (select id from businesses where user_id = auth.uid()))
);
create policy "Users can update their own categories" on categories for update using (
  menu_id in (select id from menus where business_id in (select id from businesses where user_id = auth.uid()))
);
create policy "Users can delete their own categories" on categories for delete using (
  menu_id in (select id from menus where business_id in (select id from businesses where user_id = auth.uid()))
);

create policy "Users can view their own menu items" on menu_items for select using (
  category_id in (
    select id from categories where menu_id in (
      select id from menus where business_id in (
        select id from businesses where user_id = auth.uid()
      )
    )
  )
);
create policy "Users can insert their own menu items" on menu_items for insert with check (
  category_id in (
    select id from categories where menu_id in (
      select id from menus where business_id in (
        select id from businesses where user_id = auth.uid()
      )
    )
  )
);
create policy "Users can update their own menu items" on menu_items for update using (
  category_id in (
    select id from categories where menu_id in (
      select id from menus where business_id in (
        select id from businesses where user_id = auth.uid()
      )
    )
  )
);
create policy "Users can delete their own menu items" on menu_items for delete using (
  category_id in (
    select id from categories where menu_id in (
      select id from menus where business_id in (
        select id from businesses where user_id = auth.uid()
      )
    )
  )
);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, subscription_plan)
  values (new.id, 'business', 'free');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers for all tables
create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();
create trigger update_businesses_updated_at before update on businesses
  for each row execute procedure update_updated_at_column();
create trigger update_menus_updated_at before update on menus
  for each row execute procedure update_updated_at_column();
create trigger update_categories_updated_at before update on categories
  for each row execute procedure update_updated_at_column();
create trigger update_menu_items_updated_at before update on menu_items
  for each row execute procedure update_updated_at_column();
