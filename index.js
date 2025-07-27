const express = require('express');
const { sequelize } = require('./database');
const bcrypt = require('bcrypt');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

/* ------------------------- Swagger Setup ------------------------- */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Auth API',
      version: '1.0.0',
      description: 'API documentation for authentication routes',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./index.js'], // ⬅ Make sure this matches the file where your JSDoc comments are
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* ------------------------- Routes ------------------------- */
 
/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Test auth route
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: Auth route working
 */
app.get('/auth', (req, res) => {
  res.send({ message: 'Auth route is working' });
});

 
sequelize.sync()
  .then(() => {
    console.log('All models synced successfully.');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📄 Swagger Docs available at http://localhost:${PORT}/docs`);
    });
  })
  .catch((error) => {
    console.error('Error syncing models or connecting to DB:', error);
  });
