const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const debug =require('debug')('app: module-users-services');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: ObjectId(id) });
};

const getByName = async (nombre) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ usuario: nombre });
};

const getByRol = async (rol) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ rol: rol });
}

const addUser = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};

const updateUser = async (id, nom, user, correo, rol) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({_id: ObjectId(id)}, {$set:
        {
            nombre: nom,
            usuario: user,
            correo: correo,
            rol: rol
        }}, {upsert: false}); 
}

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({_id: ObjectId(id)});
};

module.exports.UsersService = {
    getAll,
    getById,
    getByName,
    getByRol,
    addUser,
    updateUser,
    deleteUser
};