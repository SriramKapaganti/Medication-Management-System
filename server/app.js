const express = require('express');
const cors = require ('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://medication-management-system-nu.vercel.app/',  
  credentials: true                 
}));
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);

module.exports = app


