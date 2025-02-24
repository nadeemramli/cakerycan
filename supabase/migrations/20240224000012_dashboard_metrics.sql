-- Create dashboard metrics and analytics functions
BEGIN;

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES auth.users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    delivery_date TIMESTAMPTZ,
    notes TEXT
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage orders"
    ON orders FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Admins can manage order items"
    ON order_items FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Function to get total revenue for a date range
CREATE OR REPLACE FUNCTION get_total_revenue(
    start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '30 days',
    end_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result jsonb;
    previous_period_revenue DECIMAL(10,2);
    current_period_revenue DECIMAL(10,2);
BEGIN
    -- Get current period revenue
    SELECT COALESCE(SUM(total_amount), 0)
    INTO current_period_revenue
    FROM orders
    WHERE created_at BETWEEN start_date AND end_date;

    -- Get previous period revenue
    SELECT COALESCE(SUM(total_amount), 0)
    INTO previous_period_revenue
    FROM orders
    WHERE created_at BETWEEN (start_date - (end_date - start_date)) AND start_date;

    -- Calculate percentage change
    result := jsonb_build_object(
        'amount', current_period_revenue,
        'previous_amount', previous_period_revenue,
        'percentage_change', 
        CASE 
            WHEN previous_period_revenue = 0 THEN 100
            ELSE ROUND(((current_period_revenue - previous_period_revenue) / previous_period_revenue * 100)::numeric, 1)
        END
    );

    RETURN result;
END;
$$;

-- Function to get active orders count
CREATE OR REPLACE FUNCTION get_active_orders()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result jsonb;
    current_count INTEGER;
    previous_count INTEGER;
BEGIN
    -- Get current active orders
    SELECT COUNT(*)
    INTO current_count
    FROM orders
    WHERE status IN ('pending', 'processing', 'ready_for_delivery')
    AND created_at > NOW() - INTERVAL '7 days';

    -- Get previous period count
    SELECT COUNT(*)
    INTO previous_count
    FROM orders
    WHERE status IN ('pending', 'processing', 'ready_for_delivery')
    AND created_at BETWEEN NOW() - INTERVAL '14 days' AND NOW() - INTERVAL '7 days';

    result := jsonb_build_object(
        'count', current_count,
        'previous_count', previous_count,
        'change', current_count - previous_count
    );

    RETURN result;
END;
$$;

-- Function to get low stock items
CREATE OR REPLACE FUNCTION get_low_stock_items()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result jsonb;
    items_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO items_count
    FROM inventory i
    JOIN products p ON p.id = i.ingredient_id
    WHERE i.current_stock <= i.low_stock_threshold;

    result := jsonb_build_object(
        'count', items_count,
        'items', (
            SELECT jsonb_agg(jsonb_build_object(
                'id', p.id,
                'name', p.name,
                'current_stock', i.current_stock,
                'threshold', i.low_stock_threshold
            ))
            FROM inventory i
            JOIN products p ON p.id = i.ingredient_id
            WHERE i.current_stock <= i.low_stock_threshold
            LIMIT 10
        )
    );

    RETURN result;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_total_revenue(TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION get_active_orders() TO authenticated;
GRANT EXECUTE ON FUNCTION get_low_stock_items() TO authenticated;

-- Grant table permissions
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;

COMMIT; 