import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'

import users from './data/user.js'
import products from './data/products.js'

import Order from './models/orderModel.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'

import connectDB from './config/db.js'


dotenv.config();

connectDB();

const importDataToDb = async() =>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUser = await User.insertMany(users)
        const admin = createdUser[0]._id;
        const sampleProducts = products.map(product =>{
            return{...product, user: admin}
        })
        await Product.insertMany(sampleProducts);

        console.log(`Data imported To db`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error is coming from Importing the data to the db ${error.message}`. red.inverse);
        process.exit(1)
    }
}

const destroyDataFromDb = async() =>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

  

        console.log('Data destroy from db'.blue.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error is coming from Destroying the data to the db ${error.message}`. red.inverse);
        process.exit(1)
    }
}

if (process.argv[2] === '-d'){
    destroyDataFromDb();
}else{
    importDataToDb();
} 