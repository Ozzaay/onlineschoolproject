const Pool = require("pg").Pool
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    password: process.env.REACT_APP_USER_PASSWORD,
    host: "localhost",
    port: "5432",
    database: "online_shop"
})

module.exports = pool