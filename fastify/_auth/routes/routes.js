 import {
  login,
  requestOtpLogin,
  verifyOtpCodeHandler  
} from '../controllers/authController.js';

import { resetPassword } from '../controllers/resetPasswordController.js';
import { getUserInfo } from '../controllers/userInfoController.js';
import { updateUserInfo } from '../controllers/updateUserInfoController.js';

export default async function authRoutes(fastify, options) {
  // 🔐 POST /auth/login
  fastify.post('/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Login using email and password',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                tenantId: { type: 'integer' },
                email: { type: 'string' }
              }
            }
          }
        },
        401: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, login);

  // ✉️ POST /auth/request-login-code
  fastify.post('/request-login-code', {
    schema: {
      tags: ['Auth'],
      summary: 'Request OTP code to email',
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' }
        }
      },
      response: {
        200: { type: 'object', properties: { message: { type: 'string' } } },
        404: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, requestOtpLogin);

  // ✅ POST /auth/verify-login-code
  fastify.post('/verify-login-code', {
    schema: {
      tags: ['Auth'],
      summary: 'Verify OTP and return login token',
      body: {
        type: 'object',
        required: ['email', 'code'],
        properties: {
          email: { type: 'string', format: 'email' },
          code: { type: 'string', minLength: 6, maxLength: 6 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                tenantId: { type: 'integer' }
              }
            }
          }
        },
        401: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, verifyOtpCodeHandler);

  // 🔁 POST /auth/reset-password
  fastify.post('/reset-password', {
    schema: {
      tags: ['Auth'],
      summary: 'Reset user password',
      body: {
        type: 'object',
        required: ['email', 'newPassword'],
        properties: {
          email: { type: 'string', format: 'email' },
          newPassword: { type: 'string', minLength: 6 }
        }
      },
      response: {
        200: { type: 'object', properties: { message: { type: 'string' } } },
        400: { type: 'object', properties: { error: { type: 'string' } } },
        404: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, resetPassword);

  // 📄 GET /auth/user
  fastify.get('/user', {
    schema: {
      tags: ['Auth'],
      summary: 'Get user info by email and tenantId',
      querystring: {
        type: 'object',
        required: ['email', 'tenantId'],
        properties: {
          email: { type: 'string', format: 'email' },
          tenantId: { type: 'integer' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            tenantId: { type: 'integer' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            role: { type: 'string' }
          }
        },
        404: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, getUserInfo);

  // 📝 PUT /auth/user
  fastify.put('/user', {
    schema: {
      tags: ['Auth'],
      summary: 'Update user data',
      body: {
        type: 'object',
        required: ['userId', 'tenantId'],
        properties: {
          userId: { type: 'integer' },
          tenantId: { type: 'integer' },
          name: { type: 'string' },
          roleId: { type: 'integer' },
          isActive: { type: 'boolean' }
        }
      },
      response: {
        200: { type: 'object', properties: { message: { type: 'string' } } },
        400: { type: 'object', properties: { error: { type: 'string' } } },
        404: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, updateUserInfo);
}
