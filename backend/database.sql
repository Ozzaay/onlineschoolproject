CREATE DATABASE online_shop;

\c online_shop

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT 'false',
    cart INTEGER[][2]
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

UPDATE accounts SET cart = ARRAY[ARRAY[1,2],ARRAY[2,2]] WHERE id = 1;


-- SELECT * FROM products WHERE id = SELECT SPLIT_PART(cart, '%', 1) FROM accounts WHERE id = 1;
SELECT * FROM products WHERE id = SELECT SPLIT_PART(cart[1], '%', 1) FROM accounts WHERE id = 1;
SELECT SPLIT_PART(cart[1], '%', 1) FROM accounts WHERE id = 1;

SELECT * 
FROM accounts
JOIN products ON (accounts.cart[1][1] = products.id)
WHERE accounts.id = 1;

SELECT string_to_array(cart[1], '%') AS parts FROM accounts WHERE id = 1;

SELECT * FROM products WHERE id = (SELECT cart[1][1] FROM accounts WHERE id = 1);

SELECT cart[1, 1] FROM accounts WHERE id = 1;

SELECT products.name, products.price, products.description, accounts.cart[1][2] as amount
FROM (accounts INNER JOIN products ON accounts.cart[1][1] = products.id::VARCHAR(255) AND accounts.id = 1);

-- SELECT * FROM accounts 
FOR i IN array_lower(cart, 1) LOOP
    SELECT * FROM products WHERE id = cart[i][1]
END LOOP;


DO $$
DECLARE
    i VARCHAR;
    a VARCHAR[][] :=  cart FROM accounts WHERE id = 1;

BEGIN
    FOR i IN 1..array_length(a, 1) LOOP
        RAISE NOTICE 'i: %', a[i][1];
    END LOOP;
END $$;



SELECT products.name, products.price, products.description, accounts.cart[1][2] as amount
FROM (accounts INNER JOIN products ON accounts.cart[1][1] = products.id::VARCHAR(255) OR accounts.cart[2][1] = products.id::VARCHAR(255) AND accounts.id = 1);


-- giving up on this for now, and just going to do the loop in a javascript function

SELECT array_length(cart, 1) FROM accounts WHERE id = 1;

SELECT name FROM products WHERE id=(SELECT cart[1][1] FROM accounts WHERE id = 1);
