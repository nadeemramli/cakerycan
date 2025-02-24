-- Insert test data for dashboard
BEGIN;

-- Insert some ingredients first
INSERT INTO ingredients (id, name, unit, cost_per_unit) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Flour', 'kg', 2.50),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sugar', 'kg', 3.00),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Cocoa Powder', 'kg', 8.00),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Butter', 'kg', 10.00);

-- Insert products with initial status
INSERT INTO products (id, name, description, price, status, stock) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Chocolate Cake', 'Rich chocolate cake with ganache', 35.00, 'out_of_stock', 0),
    ('22222222-2222-2222-2222-222222222222', 'Vanilla Cupcakes', 'Classic vanilla cupcakes', 3.50, 'out_of_stock', 0),
    ('33333333-3333-3333-3333-333333333333', 'Red Velvet Cake', 'Cream cheese frosted red velvet', 40.00, 'out_of_stock', 0);

-- Insert recipes
INSERT INTO recipes (id, product_id, ingredient_id, quantity_required) VALUES
    ('aaaaaaaa-1111-aaaa-1111-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 0.5),  -- Chocolate Cake - Flour
    ('bbbbbbbb-2222-bbbb-2222-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 0.2),  -- Chocolate Cake - Cocoa
    ('cccccccc-3333-cccc-3333-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 0.25), -- Vanilla Cupcakes - Flour
    ('dddddddd-4444-dddd-4444-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 0.5);  -- Red Velvet - Flour

-- Insert inventory data last (this will trigger stock updates)
INSERT INTO inventory (id, ingredient_id, current_stock, low_stock_threshold) VALUES
    ('11111111-aaaa-1111-aaaa-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 15.0, 10.0),  -- Flour
    ('22222222-bbbb-2222-bbbb-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 8.0, 10.0),   -- Sugar (low stock)
    ('33333333-cccc-3333-cccc-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 2.0, 5.0),    -- Cocoa (low stock)
    ('44444444-dddd-4444-dddd-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 12.0, 8.0);   -- Butter

-- Insert some test orders
INSERT INTO orders (id, customer_id, status, total_amount, created_at) VALUES
    ('aaaaaaaa-1111-bbbb-2222-cccccccccccc', '740d68c5-7446-4798-bd27-5923f03a896d', 'pending', 105.00, NOW()),
    ('bbbbbbbb-2222-cccc-3333-dddddddddddd', '740d68c5-7446-4798-bd27-5923f03a896d', 'processing', 42.00, NOW() - INTERVAL '1 day'),
    ('cccccccc-3333-dddd-4444-eeeeeeeeeeee', '740d68c5-7446-4798-bd27-5923f03a896d', 'completed', 78.50, NOW() - INTERVAL '2 days'),
    ('dddddddd-4444-eeee-5555-ffffffffffff', '740d68c5-7446-4798-bd27-5923f03a896d', 'pending', 140.00, NOW()),
    ('eeeeeeee-5555-ffff-6666-gggggggggggg', '740d68c5-7446-4798-bd27-5923f03a896d', 'processing', 35.00, NOW() - INTERVAL '12 hours');

-- Insert order items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
    ('11111111-aaaa-2222-bbbb-333333333333', 'aaaaaaaa-1111-bbbb-2222-cccccccccccc', '11111111-1111-1111-1111-111111111111', 3, 35.00),
    ('22222222-bbbb-3333-cccc-444444444444', 'bbbbbbbb-2222-cccc-3333-dddddddddddd', '22222222-2222-2222-2222-222222222222', 12, 3.50),
    ('33333333-cccc-4444-dddd-555555555555', 'cccccccc-3333-dddd-4444-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 2, 39.25),
    ('44444444-dddd-5555-eeee-666666666666', 'dddddddd-4444-eeee-5555-ffffffffffff', '11111111-1111-1111-1111-111111111111', 4, 35.00),
    ('55555555-eeee-6666-ffff-777777777777', 'eeeeeeee-5555-ffff-6666-gggggggggggg', '33333333-3333-3333-3333-333333333333', 1, 35.00);

COMMIT; 