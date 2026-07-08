const db = require('mysql2');

const pool = db.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodepractice',
    password: 'India@1234'
});

module.exports = pool.promise();