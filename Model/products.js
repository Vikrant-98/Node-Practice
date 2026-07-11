const Sequelize = require('sequelize');

const sequelize = require('../DBServices/sequelizer');

const Product = sequelize.define('product', {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},  
title: {
    type: Sequelize.STRING,
    allowNull: false
},
imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
},  
description: {
    type: Sequelize.STRING,
    allowNull: true
},
price: {
    type: Sequelize.DOUBLE,
    allowNull: true
},
userId: {
    type: Sequelize.INTEGER,
    allowNull: false
},
createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
},
updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
}
});

module.exports = Product;

/*const products = [];
const db = require('../DBServices/database');

module.exports = class Product
{
    constructor(id, title, imageUrl, description, price)
    {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save()
    {
        products.push(this);
    }

    static async fetchAll()
    {
        return await  db.execute('CALL GetAllProducts()').then(([rows, fieldData]) => {     
            return rows[0];  
        }).catch(err => {
            console.log(err);
        });
    }

}*/