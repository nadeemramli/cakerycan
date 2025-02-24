-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create an admin role
CREATE TYPE user_role AS ENUM ('admin', 'customer');

-- Add role column to auth.users
ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'customer';

-- Products policies
-- Everyone can view available products
CREATE POLICY "Anyone can view available products" ON products
    FOR SELECT
    USING (true);

-- Only admins can insert/update/delete products
CREATE POLICY "Admins can manage products" ON products
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin'::text);

-- Ingredients policies
-- Only admins can view and manage ingredients
CREATE POLICY "Admins can manage ingredients" ON ingredients
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin'::text);

-- Recipes policies
-- Only admins can manage recipes
CREATE POLICY "Admins can manage recipes" ON recipes
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin'::text);

-- Customers can view recipes for available products
CREATE POLICY "Customers can view recipes of available products" ON recipes
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = recipes.product_id
            AND p.status != 'out_of_stock'
        )
    );

-- Inventory policies
-- Only admins can manage inventory
CREATE POLICY "Admins can manage inventory" ON inventory
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin'::text);

-- Function to set user role
CREATE OR REPLACE FUNCTION set_user_role(user_id UUID, new_role user_role)
RETURNS void AS $$
BEGIN
    UPDATE auth.users
    SET role = new_role
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER; 