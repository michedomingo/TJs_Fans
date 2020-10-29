import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import withAdminPermission from './middleware/withAdminPermission.js';
import withAuthenticated from './middleware/withAuthentication.js';
import getUserRoutes from './routes/users.js';
import getProductRoutes from './routes/products.js';
import getAuthRoutes from './routes/auth.js';
import getListRoutes from './routes/lists.js';
import mongoose from 'mongoose';

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const yourData = require("./your.json");

import { createRequire } from 'module';
let require = createRequire(import.meta.url);
const colors = require('colors');

// Load env vars
require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

// Connect to database
const connectDB = require('./config/db.cjs');
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
// app.use(cors()); // allows all origins
// const corsOptions = {
//     origin: 'http://example.com', //or, e.g. process.env.CORS_ORIGIN
//     optionsSuccessStatus: 200
// }
// app.use(cors(process.env === 'production' ? corsOptions: undefined))
if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

app.use(withAuthenticated);
app.use(withAdminPermission);
app.use(logger);
getUserRoutes(app);
getProductRoutes(app);
getAuthRoutes(app);
getListRoutes(app);

// Dev logging middleware
const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
