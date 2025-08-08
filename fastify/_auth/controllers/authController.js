import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  findUserByEmail,
  insertOtpCode,
  verifyOtpCode as verifyOtpCodeDb
} from '../models/model.js';
import { sendEmail } from '../utils/sendEmail.js';

// 1️⃣ Login with email + password
export async function login(request, reply) {
  const { email, password } = request.body;
  const fastify = request.server;

  const user = await findUserByEmail(fastify, email);
  if (!user) {
    return reply.code(401).send({ error: 'User not found' });
  }

  const hash = user.PasswordHash;
  if (!hash || typeof hash !== 'string') {
    console.error('❌ Invalid hash value:', hash);
    return reply.code(500).send({ error: 'User password hash is missing or invalid' });
  }

  const match = await bcrypt.compare(password, hash);
  if (!match) {
    return reply.code(401).send({ error: 'Invalid password' });
  }

  const token = fastify.jwt.sign(
    {
      id: user.UserID,
      email: user.Email,
      tenantId: user.TenantID,
    },
    { expiresIn: '1h' }
  );

  return reply.send({
    token,
    user: {
      id: user.UserID,
      email: user.Email,
      tenantId: user.TenantID,
    },
  });
}

// 2️⃣ Request login code via email (OTP)
export async function requestOtpLogin(request, reply) {
  const { email } = request.body;
  const fastify = request.server;

  const user = await findUserByEmail(fastify, email);
  if (!user) {
    return reply.code(404).send({ error: 'User not found' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  await insertOtpCode(fastify, user.UserID, user.Email, otp);

  await sendEmail(email, 'Your OTP Code', `Your login code is: ${otp}`);
  return reply.send({ message: 'OTP code sent to your email.' });
}

// 3️⃣ Verify OTP and login
export async function verifyOtpCodeHandler(request, reply) {
  const { email, code } = request.body;
  const fastify = request.server;

  const user = await verifyOtpCodeDb(fastify, email, code);
  if (!user) {
    return reply.code(401).send({ error: 'Invalid or expired code' });
  }

  const token = fastify.jwt.sign(
    {
      id: user.UserID,
      email: user.Email,
      tenantId: user.TenantID,
    },
    { expiresIn: '1h' }
  );

  return reply.send({
    token,
    user: {
      id: user.UserID,
      email: user.Email,
      tenantId: user.TenantID,
    },
  });
}
