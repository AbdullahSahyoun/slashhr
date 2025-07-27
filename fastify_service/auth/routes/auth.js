import { login } from '../controllers/authController.js';
import { resetPassword } from '../controllers/resetPasswordController.js';
import { getUserInfo } from '../controllers/userInfoController.js';
import { updateUserInfo } from '../controllers/updateUserInfoController.js';

export default async function authRoutes(fastify, options) {

  // ✅ POST /auth/login
  fastify.post('/login', {
    schema: {
      tags: ['Auth'],
      summary: 'User login',
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
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, login);

  // ✅ POST /auth/reset-password
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
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, resetPassword);

  // ✅ GET /auth/user
  fastify.get('/user', {
    schema: {
      tags: ['Auth'],
      summary: 'Get full user info by email and tenantId',
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
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, getUserInfo);

  // ✅ PUT /auth/user
  fastify.put('/user', {
    schema: {
      tags: ['Auth'],
      summary: 'Update user info by userId and tenantId',
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
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, updateUserInfo);
}
