-- ADD COLUMNS ORDER TABLE

DELIMITER //
CREATE PROCEDURE add_columns_orders()
BEGIN
	IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'orders' AND column_name = 'sub_total_amount'
    ) THEN
        ALTER TABLE orders
        ADD COLUMN sub_total_amount numeric(10,2);
    END IF;
    
    IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'orders' AND column_name = 'tax'
    ) THEN
        ALTER TABLE orders
        ADD COLUMN tax numeric(10,2);
    END IF;
END //
DELIMITER ;

CALL add_columns_orders();

-- Add new column in product table

DELIMITER //
CREATE PROCEDURE add_column_products()
BEGIN
    IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'products' AND column_name = 'x_position'
    ) THEN
        ALTER TABLE products
        ADD COLUMN x_position numeric(5,2);
    END IF;
    
    IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'products' AND column_name = 'y_position'
    ) THEN
        ALTER TABLE products
        ADD COLUMN y_position numeric(5,2);
    END IF;
    
    IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'products' AND column_name = 'frame_width'
    ) THEN
        ALTER TABLE products
        ADD COLUMN frame_width numeric(5,2);
    END IF;
    
    IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'products' AND column_name = 'frame_height'
    ) THEN
        ALTER TABLE products
        ADD COLUMN frame_height numeric(5,2);
    END IF;
END //
DELIMITER ;

CALL add_column_products();

ALTER TABLE associate_products
ADD COLUMN image_id varchar(36),
ADD FOREIGN KEY (image_id) REFERENCES images(id);

DELIMITER //
CREATE PROCEDURE add_cloumns_order_product()
BEGIN
	IF NOT EXISTS (
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'order_products' AND column_name = 'price'
    ) THEN
        ALTER TABLE order_products
        ADD COLUMN price numeric(10,2);
    END IF;
END //
DELIMITER ;

CALL add_cloumns_order_product();


ALTER TABLE order_products
ADD COLUMN product_variant_id int,
ADD FOREIGN KEY (product_variant_id) REFERENCES product_variants(id);


ALTER TABLE order_products
ADD COLUMN product_sub_variant_id int,
ADD FOREIGN KEY (product_sub_variant_id) REFERENCES product_sub_variants(id);

ALTER TABLE associate_products
ADD COLUMN best_selling BOOLEAN DEFAULT FALSE;

ALTER TABLE orders
ADD COLUMN instructions text;

ALTER TABLE orders
ADD COLUMN user_id INT NOT NULL,
ADD FOREIGN KEY (user_id) REFERENCES users(id);


-- ADD COLUMNS wallet in USER TABLE
ALTER TABLE users
ADD COLUMN wallet numeric(10,2) DEFAULT 0;

ALTER TABLE associate_withdrawn_request
MODIFY COLUMN status ENUM('PENDING', 'CANCELLED', 'COMPLETED') NOT NULL;

ALTER TABLE cart_products
ADD COLUMN product_variant_id int,
ADD COLUMN product_sub_variant_id int,
ADD COLUMN created_at BIGINT,
ADD COLUMN updated_at BIGINT;


ALTER TABLE cart_products
DROP FOREIGN KEY cart_products_ibfk_1;

ALTER TABLE cart_products
ADD CONSTRAINT cart_products_ibfk_1
FOREIGN KEY (cart_id) REFERENCES carts(id)
ON DELETE CASCADE;

ALTER TABLE cart_products MODIFY product_sub_variant_id INT NULL;

ALTER TABLE about_product_data
ADD COLUMN product_description_1_ab text,
ADD COLUMN product_description_2_sb text;