const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { ProductsService, UsersService } = require('./services');
const { Response } = require('../common/response');
const Modelo = require('./models');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    getUser: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const usuario = params.usuario;

            let user = await UsersService.getById(usuario);

            if(!user)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Usuario ${usuario}`, user);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUserByName: async (req, res) => {
        try {
            
            const params = req.query;
            const user = params.usuario;

            let getUser = await UsersService.getByName(user);

            if(getUser[0]!=undefined)
            {
                Response.success(res, 200, `Usuario ${user}`, getUser);
            } else
            {
                Response.error(res, new createError.NotFound());
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getByRol: async (req, res) => {
        try {
            
            const params = req.query;
            const rol = params.rol;

            let getUser = await UsersService.getByRol(rol);

            if(getUser[0]!=undefined)
            {
                Response.success(res, 200, `Usuarios con rol ${rol}`, getUser);
            } else
            {
                Response.error(res, new createError.NotFound());
            }

        } catch (error) {
            debug(error);
            Response.error(error);
        }
    },
    addUser: async (req, res) => {
        
        try {
            const { body } = req;

            if(!body || Object.keys(body).length === 0)
            {
                Response.error(res, new createError.BadRequest()); // Request erroneo o sin contenido
            } else{

                const usuario = new Modelo();
                const params = req.body;

                usuario.nombre = params.nombre;
                usuario.usuario = params.usuario;
                usuario.pass = params.pass;
                usuario.correo = params.correo;
                usuario.rol = params.rol;

                const insertedId = await UsersService.addUser(usuario);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }

        } catch(error){
            debug(error);
            Response.error(res);
        }

    },
    updateUser: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const id = params.id;
            const nom = params.nombre;
            const user = params.usuario;
            const correo = params.correo;
            const rol = params.rol;

            let updateUser = await UsersService.updateUser(id, nom, user, correo, rol);

            if(!updateUser)
            {
                Response.error(res, new createError[409]);
            } else
            {
                Response.success(res, 200, `Se actualiz?? el usuario ${user}`, updateUser);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const usuario = params.usuario;

            let userToDelete = await UsersService.deleteUser(usuario);

            if(!userToDelete)
            {
                Response.error(res, new createError[409]);
            } else
            {
                if(userToDelete.deletedCount === 1)
                    Response.success(res, 200, `El usuario ${usuario} ha sido eliminado`, userToDelete);
                else
                    Response.error(res, new createError[409]);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};