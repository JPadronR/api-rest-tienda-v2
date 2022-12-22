const express = require('express');

const { UsersController } = require('./controller');

const router = express.Router();    //Objeto Router para definir rutas especificas

module.exports.usersApi = (app) => {
    router
        .get('/', UsersController.getUsers)  //http://localhost:3000/api/users/
        .get('/getUser', UsersController.getUser)  //http://localhost:3000/api/users/getUser?usuario=JP420
        .get('/getByName', UsersController.getUserByName)
        .get('/getByRol', UsersController.getByRol)
        .put('/update', UsersController.updateUser)
        .delete('/delete', UsersController.deleteUser)  //http://localhost:3000/api/users/delete
        .post('/', UsersController.addUser)

    app.use('/api/users', router);

};