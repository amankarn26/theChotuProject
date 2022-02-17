
// postgress config
const Pool = require('pg').Pool

// For my local
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'molecule',
    password: 'postgres',
    port: 5432,
})

module.exports = pool