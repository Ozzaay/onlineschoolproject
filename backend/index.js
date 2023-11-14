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
    const authHead = req.body.headers.authorization
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
        )
        res.json(newProduct)
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/updateProduct/price", verifyToken, async (req, res) => {
    const { name, price} = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
        const updateProduct = await pool.query(
            `UPDATE products SET price = '${price}' WHERE name = '${name}' RETURNING *`
        )
        res.json(updateProduct)
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/updateProduct/description", verifyToken, async (req, res) => {
    const { name, description} = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
        const updateProduct = await pool.query(
            `UPDATE products SET description = '${description}' WHERE name = '${name}' RETURNING *`
        )
        res.json(updateProduct)
        }
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/updateProduct/image", verifyToken, async (req, res) => {
    const { name, image} = req.body
    try {
        if (!req.user.isAdmin) {
            return res.sendStatus(403)
        } else {
        const updateProduct = await pool.query(
            `UPDATE products SET image = '${image}' WHERE name = '${name}' RETURNING *`
        )
        res.json(updateProduct)
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
