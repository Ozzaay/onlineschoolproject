CREATE DATABASE online_shop;

\c online_shop

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT 'false',
    cart JSONB
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    date VARCHAR(255) NOT NULL,
    account_id INTEGER NOT NULL,
    products INTEGER[][2] NOT NULL,
    total_cost INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id)
);


INSERT INTO products (name, price, description, image) VALUES ('T-Shirt', '10', 'A nice T-Shirt', 'test');
INSERT INTO accounts (username, password, email) VALUES ('Test User', '1234', 'idk@no');
INSERT INTO accounts (username, password, email, is_admin) VALUES ('Admin', 'a', 'a', 'true');
INSERT INTO accounts (username, password, email, is_admin) VALUES ('Test Admin', '1234', 'idk@no', 'true');

UPDATE accounts SET cart = cart || '[{
    "productId": 5,
    "amount": 2
}]'::jsonb WHERE id = 1;

UPDATE accounts SET cart = '[{
    "productId": 5,
    "amount": 2
}]'::jsonb WHERE id = 1;

SELECT * FROM accounts WHERE cart->>'productId' = '5';

SELECT arr.position,arr.item_object
FROM accounts, jsonb_array_elements(cart) WITH ORDINALITY arr(item_object, position)
WHERE arr.item_object->>'productId' = 5;
