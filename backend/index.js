const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const app = express();
const port = 5000

app.use(cors())
app.use(express.json())

const generateAccessToken = (user) => {
    return jwt.sign({id: user.id, isAdmin: user.is_admin}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "30m"})
}

const verifyToken = (req, res, next) => {
    const authHead = req.headers.authorization
    if (authHead){
        const token = authHead.split(" ")[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403).json("Token in not valid!")
            }
            req.user = user
            next()
        })

    } else {
        res.sendStatus(401).json("Unauthorized")
    }
}

app.get("/GetAllProducts", (req, res) => {
    try {
    pool.query("SELECT * FROM products", (err, result) => {
        res.json(result.rows)
    })
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/GetProduct", (req, res) => {
    try {
    const { name } = req.body
    pool.query(`SELECT * FROM products WHERE name = '${name}'`, (err, result) => {
        res.json(result.rows)
    })
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/create", async (req, res) => {
    const { username, email, password } = req.body
    
    try {
        const newAccount = await pool.query(
            `INSERT INTO accounts (username, password, email) VALUES('${username}', '${password}', '${email}') RETURNING *`
        )
        res.json(newAccount)
    } catch (err) {
        console.error(err.message)
    }
  })

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const login = await pool.query(
            `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`
        )
        if (login.rows.length === 0) {
            return res.status(400).json("Login Failed")
        } else {
        const accessToken = generateAccessToken(login.rows[0])
        res.json({
            username: login.rows[0].username,
            isAdmin: login.rows[0].is_admin,
            accessToken: accessToken
        })
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/add_to_cart", verifyToken, async (req, res) => {
    const { productId, amount } = req.body
    try{
        const checkIfAlreadyInCart = await pool.query(
            `SELECT cart FROM accounts WHERE id = ${req.user.id}`
        )

        if (checkIfAlreadyInCart.rows[0].cart.some(item => item.productId === productId)) {
            res.json("Already in cart")
        } else {
            if (checkIfAlreadyInCart.rows[0].cart === null) {
                const addItem = await pool.query(
                    `UPDATE accounts SET cart = 
                    '[{
                        "productId": ${productId},
                        "amount": ${amount}
                    }]'::jsonb
                    WHERE id = ${req.user.id};`
                )
                res.json("Added to cart")
            } else {
            const addItem = await pool.query(
                `UPDATE accounts SET cart = cart || 
                '[{
                    "productId": ${productId},
                    "amount": ${amount}
                }]'::jsonb
                WHERE id = ${req.user.id};`
            )
            res.json("Added to cart")
            }
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/cart/change_cart", verifyToken, async (req, res) => {
    const products = JSON.stringify(req.body.newCart)
    try {
        const updateCart = await pool.query(
            `UPDATE accounts SET cart ='${products}'::jsonb WHERE id = ${req.user.id} RETURNING cart;`
        ).then((response) => {
            res.json("Cart Updated")
        })
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/cart/get_cart", verifyToken, async (req, res) => {
    try {
        const getCart = await pool.query(
            `SELECT cart FROM accounts WHERE id = ${req.user.id};`
        )
        for (let i = 0; i < getCart.rows[0].cart.length; i++) {
            var product = await pool.query(
                `SELECT * FROM products WHERE id = ${getCart.rows[0].cart[i].productId}`
            )
            getCart.rows[0].cart[i].name = product.rows[0].name
            getCart.rows[0].cart[i].price = product.rows[0].price
            getCart.rows[0].cart[i].description = product.rows[0].description
            getCart.rows[0].cart[i].image = product.rows[0].image
        }
        res.json(getCart.rows[0].cart)
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/makeOrder", verifyToken, async (req, res) => {
    const { products } = req.body
    try{
        var order = []
        for (let i = 0; i < products.length; i++) {
            await pool.query(`Select id, price FROM products WHERE id = '${products[i].id}'`).then((response) => {
                let amount = products[i].amount
                response.rows[0].amount = amount
                order.push(response.rows[0])
            })
        }
        var total = 0
        for (let i = 0; i < order.length; i++) {
            total += order[i].price * products[i].amount
        }
        await pool.query(
            `INSERT INTO orders (date, account_id, products, total_cost) VALUES ('today', ${req.user.id}, ARRAY[ARRAY[${order[0].id},${order[0].amount}], ARRAY[${order[1].id},${order[1].amount}]], ${total})`
        )

        await pool.query(
            `UPDATE accounts SET cart = null WHERE id = ${req.user.id}`
        )

        res.json("Order Successful")
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/authorization", verifyToken, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            res.sendStatus(403).json("unauthorized")
        } else {
            res.json("authorized")
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/createProduct", verifyToken, async (req, res) => {
    const { name, price, description, image } = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
            const newProduct = await pool.query(
                `INSERT INTO products (name, price, description, image) VALUES('${name}', '${price}', '${description}', '${image}') RETURNING *`
            ).then(
            res.json("Product Created")
            )
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/updateProduct", verifyToken, async (req, res) => {
    const { name, price, description, image } = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
        const updateProduct = await pool.query(
            `UPDATE products SET price = '${price}', description = '${description}', image = '${image}' WHERE name = '${name}' RETURNING *`
        )
        res.json(updateProduct)
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/deleteProduct", verifyToken, async (req, res) => {
    const { name } = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
        const deleteProduct = await pool.query(
            `DELETE FROM products WHERE name = '${name}' RETURNING *`
        )
        res.json(deleteProduct)
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log("server started on port:", port)
})
