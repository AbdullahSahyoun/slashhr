const express = require('express');
const { sequelize } = require('./database');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// ✅ Root
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    res.send('Database connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).send('Database connection failed');
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await sequelize.models.User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Invalid email' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Reset password (mock route)
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await sequelize.models.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// ✅ Sync and start
sequelize.sync()
  .then(() => {
    console.log('All models synced successfully.');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing models or connecting to DB:', error);
  });
