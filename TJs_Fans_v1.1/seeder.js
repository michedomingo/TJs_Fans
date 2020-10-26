const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
import { UserModel } from '.../models/User';
import { ProductModel } from '.../models/Product';

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await ProductModel.create(products);
    await UserModel.create(users);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.errmsg);
    process.exit();
  }
};

// Delete data
const deleteData = async () => {
  try {
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.errmsg);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
