require('dotenv').config(); // 👈 1. መጀመሪያ የ .env ፋይሉን እንዲያነብ ማድረግ
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const app = express();
app.use(express.json());
app.use(cors());

// 2. በብልሃት መረጃዎችን ከ .env መሳብ
const sequelize = new Sequelize(
  process.env.DB_NAME || 'netflix_db',
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || 'password',
  {
    // 💡 እዚህ ጋር ከዶከር ሰርቪስ ስም ጋር እንዲገጥም netflix_mysql_db ተደርጓል
    host: process.env.DB_HOST || 'netflix_mysql_db', 
    dialect: 'mysql',
    logging: false, 
  }
);

// User Model
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

// Database Sync with Retry Logic
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

// Sign Up Route
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

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ!' });

    // 🔑 ቶከን መፍጠሪያ ሚስጥሩን ከ .env ውስጥ መሳብ (Fallback ቁልፍ ተጨምሯል)
    const secretKey = process.env.JWT_SECRET || 'DEFAULT_BACKUP_SECRET_KEY';
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend Server is running on port ${PORT}`);
});