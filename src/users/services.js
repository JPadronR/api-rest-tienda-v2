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
    return await collection.findOne({ usuario: id });
};

const addUser = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};

const updateUser = async (nom, user, correo, rol) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({usuario: user}, {$set:
        {
            nombre: nom,
            usuario: user,
            correo: correo,
            rol: rol
        }}, {upsert: false}); 
}

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({usuario: id});
};

module.exports.UsersService = {
    getAll,
    getById,
    addUser,
    updateUser,
    deleteUser
};