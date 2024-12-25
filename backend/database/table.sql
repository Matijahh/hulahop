CREATE TABLE IF NOT EXISTS images(
	id varchar(36),
    name varchar(256),
    original_name varchar(256),
	created_at BIGINT,
    updated_at BIGINT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS colors(
    id int auto_increment,
    name varchar(50),
    code varchar(50),
    status boolean,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sizes(
    id int auto_increment,
    name varchar(50),
    code varchar(50),
    status boolean,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    image_id varchar(36),
    email VARCHAR(70) unique,
    mobile VARCHAR(50),
    password VARCHAR(256),
    resetPasswordToken VARCHAR(256),
    resetPasswordTokenExpiry BIGINT,
    type VARCHAR(20) CHECK (type IN ('USER', 'ASSOCIATE','ADMIN')),
    status BOOLEAN,
    wallet numeric(10,2) DEFAULT 0,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS associate_user_details (
    id INT AUTO_INCREMENT,
    user_id INT,
    image_id varchar(36),  
    heading VARCHAR(100),
    sub_heading VARCHAR(100),
    url VARCHAR(100),
    status BOOLEAN,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_session (
    id INT AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    refresh_token TEXT,
    created BIGINT,
    expire BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories(
	id INT AUTO_INCREMENT,
    name varchar(64),
    description text,
    image_id varchar(36),
    active boolean,
    is_top_selling boolean,
    category_order INT,
  	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sub_categories(
	id int auto_increment,
    category_id int,
    name varchar(64),
    image_id varchar(36),
    active boolean,
    sub_category_order INT,
	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS products(
	id int auto_increment,
    name varchar(100),
    description TEXT,
    image_id varchar(36),
    category_id INT NOT NULL,
    subcategory_id INT,
    price numeric(10,2),
    status boolean,
    x_position numeric(10,2),
    y_position numeric(10,2),
    frame_width numeric(10,2),
    frame_height numeric(10,2),
	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS associate_products(
	id int auto_increment,
    product_id int,
    user_id int,  
    name varchar(100),
    description TEXT,
    cover_image_color_id int,
    price numeric(10,2),
    image_json TEXT,
    image_id varchar(36),
    is_visible_on_site BOOLEAN DEFAULT FALSE,
    is_approve BOOLEAN DEFAULT FALSE,
    best_selling BOOLEAN DEFAULT FALSE,
	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cover_image_color_id) REFERENCES colors(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS associate_product_colors(
    id int auto_increment,
    associate_product_id int,
    color_id int,
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    FOREIGN KEY (color_id) REFERENCES colors(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS product_variants(
	id int auto_increment,
    product_id int,
    color_id int,
    image_id varchar(36),
	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (color_id) REFERENCES colors(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS product_sub_variants(
    id int auto_increment,
    product_variant_id int,
    value varchar(100),
    quantity int,
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS inquiries(
	id int auto_increment,
    name varchar(100),
    email varchar(70),
    mobile varchar(50),
    subject varchar(150),
    message text,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS blogs(
    id int auto_increment,
    image_id varchar(36),
    heading varchar(100),
    category_name varchar(100),
    content text,
    created_at BIGINT,
    updated_at BIGINT,
    created_by int,
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS associate_blogs(
    id int auto_increment,
    image_id varchar(36),
    heading varchar(100),
    category_name varchar(100),
    content text,
    created_at BIGINT,
    updated_at BIGINT,
    created_by int,
    store_id int,
    show_on_main boolean,
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (store_id) REFERENCES store_layout_details(id),
    PRIMARY KEY(id)
);




CREATE TABLE IF NOT EXISTS orders(
    id int auto_increment,
    user_id int,
    sku varchar(100),
    total_amount numeric(10,2),
    status VARCHAR(20) CHECK (status IN ('PENDING', 'DISPATCHED', 'DELIVERED', 'CANCELLED')),
    sub_total_amount numeric(10,2),
    tax numeric(10,2),
    instructions text,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS order_products(
    id int auto_increment,
    order_id int,
    associate_product_id int,
    quantity int,
    price numeric(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS carts(
    id int auto_increment,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS cart_products(
    id int auto_increment,
    cart_id int not null,
    associate_product_id int not null,
    product_variant_id int not null,
    product_sub_variant_id int,
    quantity int,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id),
    FOREIGN KEY (product_sub_variant_id) REFERENCES product_sub_variants(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS associate_withdrawn_request(
    id int auto_increment,
    user_id int,  
    amount numeric(10,2),
    status ENUM('PENDING', 'CANCELLED', 'COMPLETED') NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS announcements(
    id int auto_increment,
    title varchar(100),
    description text,
    status boolean,
    created_at BIGINT,
    updated_at BIGINT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS store_layout_details(
    id int auto_increment,
    user_id int,
    name varchar(100),
    logo_image varchar(36),
    description text,
    social_links text,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (logo_image) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS store_layout_sliders(
    id int auto_increment,
    store_id int,
    name varchar(100),
    description text,
    image_id varchar(36),
    FOREIGN KEY (store_id) REFERENCES store_layout_details(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS return_products(
    id int auto_increment,
    order_id int,
    associate_product_id int,
    reason text,
    quantity int,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS associate_images(
    id int auto_increment,
    user_id int,
    image_id varchar(36),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS shop_slider(
    id int auto_increment,
    image_id varchar(36),
    description text,
    status boolean,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS about_page_slider(
    id int auto_increment,
    image_id varchar(36),
    description text,
    status boolean,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS blog_page_slider(
    id int auto_increment,
    image_id varchar(36),
    description text,
    status boolean,
    FOREIGN KEY (image_id) REFERENCES images(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user_addresses(
    id int auto_increment,
    user_id int,
    house_flat_no text,
    street_locality text,
    city varchar(100),
    state varchar(100),
    country varchar(100),
    pincode varchar(100),
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS order_addresses(
    id int auto_increment,
    order_id int,
    house_flat_no text,
    street_locality text,
    city varchar(100),
    state varchar(100),
    country varchar(100),
    pincode varchar(100),
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS about_product_data(
    id int auto_increment,
    category_id INT NOT NULL,
    subcategory_id INT,
	product_description_1 TEXT,
	product_description_2 TEXT,
    product_description_1_ab TEXT,
    product_description_2_sb TEXT,
	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (subcategory_id) REFERENCES sub_categories(id),
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS about_product_top_bar_image(
    id int auto_increment,
    about_product_data_id int NOT NULL,
    top_bar_images_id varchar(36),
  	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (top_bar_images_id) REFERENCES images(id),
    FOREIGN KEY (about_product_data_id) REFERENCES about_product_data(id),
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS about_product_size_chart_image(
    id int auto_increment,
    about_product_data_id int NOT NULL,
	size_chart_image_id varchar(36),
  	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (size_chart_image_id) REFERENCES images(id),
    FOREIGN KEY (about_product_data_id) REFERENCES about_product_data(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS wishlist(
    id int auto_increment,
    user_id int,
    associate_product_id int,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS product_review(
    id int auto_increment,
    associate_product_id int,
    user_id int,
    review text,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (associate_product_id) REFERENCES associate_products(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS about_product_bottom_bar_image(
    id int auto_increment,
    about_product_data_id int NOT NULL,
    bottom_bar_images_id varchar(36),
  	created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (bottom_bar_images_id) REFERENCES images(id),
    FOREIGN KEY (about_product_data_id) REFERENCES about_product_data(id),
    PRIMARY KEY(id)
);



-- **********************************************************************************************************************

INSERT INTO users (id, first_name, last_name, image_id, email, mobile, password, type, status, created_at, updated_at)
VALUES ('1', 'super', 'admin', NULL, 'admin@gmail.com', '1234567890', '$2b$10$PhgcUe2vjrhw8nJ1mQJV8uyxdkga5JuS5MXtoaWyMzWgEHrNI2Egm', 'ADMIN', '1', NULL, NULL);

INSERT INTO users (first_name, last_name, image_id, email, mobile, password, type, status, created_at, updated_at)
VALUES ('super', 'admin', NULL, 'info@hulahop.shop', NULL, '$2b$10$iST7Qp16Kki1edFSjtB0Nu8lkUqGeUu9A3pwmOMyu5uRXCy.RNzeu', 'ADMIN', '1', NULL, NULL);

INSERT INTO users (first_name, last_name, image_id, email, mobile, password, type, status, created_at, updated_at)
VALUES ('popcorn', NULL, NULL, ' kokice@hulahop.shop', NULL, '$2b$10$e6NcxRPDZ1iQL2H1llKttewqqCXXVN/r32I3UY.if4utAEsZ4PXzi', 'ASSOCIATE', '1', NULL, NULL);
