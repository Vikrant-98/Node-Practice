const Sequlize = require('sequelize');

const sequelize = require('../DBServices/sequelizer');

const User = sequelize.define('user', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequlize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequlize.STRING,
        allowNull: true
    },
    email: {
        type: Sequlize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequlize.STRING,
        allowNull: true
    },
    password: {
        type: Sequlize.STRING,
        allowNull: false
    },
    roleId: {
        type: Sequlize.INTEGER,
        allowNull: false
    },
    isVerified: {
        type: Sequlize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBlocked: {
        type: Sequlize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDeleted: {
        type: Sequlize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    isActive: {
        type: Sequlize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: {
        type: Sequlize.DATE,
        allowNull: false,
        defaultValue: Sequlize.NOW
    },
    updatedAt: {
        type: Sequlize.DATE,
        allowNull: true,
    }
});

module.exports = User;