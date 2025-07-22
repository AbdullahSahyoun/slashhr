// database.js
const { Sequelize } = require('sequelize');

// Create the Sequelize instance
const sequelize = new Sequelize('slashhr', 'slashhr_bteam', 'bteamX@ssw0rd', {
  host: '31.97.192.204',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Set to true or console.log for SQL logging
});

// Test the connection immediately (optional)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export the instance so other files can use it
module.exports = {
  sequelize,
};
