CREATE DATABASE online_shop;

\c online_shop

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR NOT NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

INSERT INTO products (name, price, description, image) VALUES ('T-Shirt', '10', 'A nice T-Shirt', 'test');
INSERT INTO accounts (username, password, email) VALUES ('Test User', '1234', 'idk@no');
