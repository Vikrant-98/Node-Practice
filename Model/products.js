const products = [];
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
        return await  db.execute('SELECT * FROM product').then(([rows, fieldData]) => {     
            return rows;  
        }).catch(err => {
            console.log(err);
        });
    }

}