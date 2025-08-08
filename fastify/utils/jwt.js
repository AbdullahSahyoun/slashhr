import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

export default {
  sign(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },
  verify(token) {
    return jwt.verify(token, secret);
  }
};
