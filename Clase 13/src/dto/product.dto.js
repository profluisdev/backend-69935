/* 
 "status": "success",
    "product": {
        "_id": "66bbec7f1192070454707e42",
        "title": "Producto 1",
        "description": "Este es un producto",
        "price": 300,
        "thumbnail": [
            "http://www.google.com/img"
        ],
        "code": "ABC123",
        "stock": 50,
        "category": "otros",
        "status": true,
        "__v": 0
    }

*/

export const respProductDto = (product) => {
    return {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
    };
};
