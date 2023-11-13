const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 5000

app.use(cors())
app.use(express.json())

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
        res.json(login)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log("server started on port:", port)
})
