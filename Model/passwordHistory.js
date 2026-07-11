// PasswordHistory.js

const { DataTypes } = require('sequelize');
const sequelize = require('../DBServices/sequelizer');

const PasswordHistory = sequelize.define('password_history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = PasswordHistory;