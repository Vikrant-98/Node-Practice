const Sequilizer = require('sequelize');

const sequelize = new Sequilizer('nodepractice', 'root', 'India@1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;