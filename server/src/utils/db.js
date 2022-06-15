const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool(JSON.parse(process.env.DB_CONF))

module.exports = pool