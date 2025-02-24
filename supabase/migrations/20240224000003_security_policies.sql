-- Additional security policies for product management
BEGIN;

-- Enable RLS on all tables (if not already enabled)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'products'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'ingredients'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'recipes'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'inventory'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Customers can view available products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage ingredients" ON ingredients;
DROP POLICY IF EXISTS "Admins can manage recipes" ON recipes;
DROP POLICY IF EXISTS "Admins can manage inventory" ON inventory;

-- Products policies
CREATE POLICY "Customers can view available products" ON products
    FOR SELECT
    TO authenticated
    USING (
        status != 'out_of_stock'
        AND EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND (raw_user_meta_data->>'role' = 'customer' OR raw_user_meta_data->>'role' = 'admin')
        )
    );

CREATE POLICY "Admins can manage products" ON products
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Ingredients policies
CREATE POLICY "Admins can manage ingredients" ON ingredients
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Recipes policies
CREATE POLICY "Admins can manage recipes" ON recipes
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Inventory policies
CREATE POLICY "Admins can manage inventory" ON inventory
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Additional specific policies
CREATE POLICY "Notify low stock" ON inventory
    FOR SELECT
    TO authenticated
    USING (
        current_stock <= low_stock_threshold
        AND EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "View recipe details" ON recipes
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

COMMIT;