const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/auth');

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
// app.use(cors());
if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// Middleware
app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
