-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ingredients table
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    cost_per_unit DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory table
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id),
    current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    low_stock_threshold DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table with status enum
CREATE TYPE product_status AS ENUM ('in_stock', 'low_stock', 'out_of_stock');

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category_id UUID,
    stock INTEGER NOT NULL DEFAULT 0,
    status product_status NOT NULL DEFAULT 'out_of_stock',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create recipes table
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id),
    quantity_required DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, ingredient_id)
);

-- Create function to calculate maximum producible items
CREATE OR REPLACE FUNCTION calculate_producible_items(product_id UUID)
RETURNS INTEGER AS $$
DECLARE
    min_producible INTEGER := NULL;
    current_producible INTEGER;
BEGIN
    -- For each ingredient in the recipe
    FOR current_producible IN
        SELECT FLOOR(i.current_stock / r.quantity_required)::INTEGER
        FROM recipes r
        JOIN inventory i ON i.ingredient_id = r.ingredient_id
        WHERE r.product_id = $1
    LOOP
        -- Update min_producible if it's NULL or if current_producible is smaller
        IF min_producible IS NULL OR current_producible < min_producible THEN
            min_producible := current_producible;
        END IF;
    END LOOP;
    
    RETURN COALESCE(min_producible, 0);
END;
$$ LANGUAGE plpgsql;

-- Create function to update product status based on inventory
CREATE OR REPLACE FUNCTION update_product_status()
RETURNS TRIGGER AS $$
DECLARE
    producible_items INTEGER;
BEGIN
    -- Calculate how many items can be produced
    producible_items := calculate_producible_items(NEW.product_id);
    
    -- Update the product's stock and status
    UPDATE products
    SET 
        stock = producible_items,
        status = CASE 
            WHEN producible_items = 0 THEN 'out_of_stock'::product_status
            WHEN producible_items <= 10 THEN 'low_stock'::product_status
            ELSE 'in_stock'::product_status
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product status
CREATE TRIGGER update_product_status_on_inventory_change
AFTER INSERT OR UPDATE OF current_stock
ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_product_status();

CREATE TRIGGER update_product_status_on_recipe_change
AFTER INSERT OR UPDATE OF quantity_required
ON recipes
FOR EACH ROW
EXECUTE FUNCTION update_product_status();

-- Create indexes for better performance
CREATE INDEX idx_recipes_product_id ON recipes(product_id);
CREATE INDEX idx_recipes_ingredient_id ON recipes(ingredient_id);
CREATE INDEX idx_inventory_ingredient_id ON inventory(ingredient_id); 