const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');
const debug =require('debug')('app: module-products-services');

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ nombre: id });
};

const getByType = async (valor) => {
    const collection = await Database(COLLECTION);

    let product = await collection.find({ nombre: valor }).toArray(); //obtener nombre
    if(product)
        return await collection.find({ nombre: valor }).toArray();

    if(!product)
    {
        let getProduct = await collection.find({ tipo: valor }).toArray(); //obtener tipo
        if(getProduct)
        {
            product = getProduct;
            return await collection.find({ tipo: valor }).toArray();
        }
        else
            product=getProduct;
    }

    if(!product)
    {
        let getProduct = await collection.find({ clave_provedor: valor }).toArray(); //obtener clave proveedor
        if(getProduct)
        {
            product = getProduct;
            return await collection.find({ clave_provedor: valor }).toArray();
        }
        else
            product=getProduct;
    }
    
    if(!product)
    {
        let getProduct = await collection.find({ ubicacion: valor }).toArray(); //obtener ubicacion
        if(getProduct)
        {
            product=getProduct;
            return await collection.find({ ubicacion: valor }).toArray();
        }
        else
            product=getProduct;
    }
};

const getByUbication = async (ubicacion) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ ubicacion: ubicacion }).toArray();
}

const createProduct = async (producto) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(producto);
    return result.insertedId;
};

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)
}

const updateProduct = async (nom, pre, exis, vend, tipo, cp, ubi, desc) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({nombre: nom}, {$set:
        {
            precio: pre,
            existencia: exis,
            vendidos: vend,
            tipo: tipo,
            clave_provedor: cp,
            ubicacion: ubi,
            descripcion: desc
        }}, {upsert: false}); 
}

const deleteProduct = async (nom) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({nombre: nom});
}

module.exports.ProductsService = {
    getAll,
    getById,
    getByType,
    getByUbication,
    createProduct,
    generateReport,
    updateProduct,
    deleteProduct
};