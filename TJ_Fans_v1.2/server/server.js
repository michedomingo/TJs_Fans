const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const withAdminPermission = require('./middleware/withAdminPermission');
// const withAuthenticated = require('./middleware/withAuthentication');
// const getProductRoutes = require('./middleware/getProductRoutes');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const products = require('./routes/products');

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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

// Middleware
// app.use(withAuthenticated);
app.use(withAdminPermission);
app.use(logger);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', products);
// getProductRoutes(app);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized!' });
  }
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
