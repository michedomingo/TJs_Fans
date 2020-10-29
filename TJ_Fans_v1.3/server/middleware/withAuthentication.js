import jwt from 'express-jwt';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

export default jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  credentialsRequired: false,
  getToken: (req) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1]; // token
    }
    return null;
  },
});
