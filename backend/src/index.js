const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const app = express();
app.use(express.json());
app.use(cors());

// 1.  (Sequelize)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'netflix_db',
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'netflix_mysql',
    dialect: 'mysql',
    logging: false, 
  }
);

// 2. (User Model)
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// 
async function connectWithRetry() {
  console.log('🔄 Attempting to connect to MySQL database...');
  try {
    await sequelize.sync();
    console.log('🐬 MySQL Database & Tables Synced Successfully!');
  } catch (err) {
    console.error('❌ Database connection failed. Retrying in 5 seconds...', err.message);
    setTimeout(connectWithRetry, 5000); 
  }
}

connectWithRetry();

// 3.  (Sign Up Route)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'user already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 4.  (Login Route)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ!' });

    // 🔑 Token 
    const token = jwt.sign({ id: user.id }, 'NETFLIX_SUPER_SECRET_KEY', { expiresIn: '1d' });

    res.status(200).json({ 
      success: true, 
      message: 'Login successful!', 
      email: user.email,
      token: token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend Server is running on port ${PORT}`);
});