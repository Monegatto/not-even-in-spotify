const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');
const logger = require('../utils/logger');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userQuery.rows[0];

    if (!user) {
      logger.warn(`Login failed: User ${username} not found`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      logger.warn(`Login failed: Invalid password for user ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User ${username} logged in successfully`);

    res.json({ token });
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    res.status(500).json({ error: 'Failed to login' });
  }
};

module.exports = { login };