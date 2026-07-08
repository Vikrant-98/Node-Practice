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
        return await  db.execute('CALL GetAllProducts()').then(([rows, fieldData]) => {     
            return rows[0];  
        }).catch(err => {
            console.log(err);
        });
    }

}