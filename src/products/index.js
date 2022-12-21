const express = require('express');
const cors = require('cors');

const { ProductsController } = require('./controller');

const router = express.Router();    //Objeto Router para definir rutas especificas

module.exports.Products = (app) => {
    router
        .get('/', ProductsController.getProducts)  //http://localhost:3000/api/products/
        .get('/report', ProductsController.generateReport)  //http://localhost:3000/api/products/report
        .get('/getProduct', ProductsController.getProduct)
        .get('/getByName', ProductsController.getProductByName)  //http://localhost:3000/api/products/getByName?nombre=Arduino
        .get('/getByType', ProductsController.getProductByType) //http://localhost:3000/api/products/getByType?tipo=MCU
        .get('/getByUbication', ProductsController.getProductByUbication)   //http://localhost:3000/api/products/getByUbication?ubicacion=CAP-A
        .get('/getByClave', ProductsController.getProductByClave)   //http://localhost:3000/api/products/getByClave?clave=504-302
        .get('/getByExistencia', ProductsController.getByExistencia)
        .put('/update', ProductsController.updateProduct)   //http://localhost:3000/api/products/update
        .delete('/delete', ProductsController.deleteProduct)    //http://localhost:3000/api/products/delete
        .post('/', ProductsController.createProduct)

    app.use('/api/products', router);

};