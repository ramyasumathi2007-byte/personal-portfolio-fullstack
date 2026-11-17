import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import projectRoutes from './src/routes/projectRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',').map(origin => origin.trim());

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  }
}));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8 }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Portfolio API is running' });
});
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: 'Something went wrong on the server' });
});

try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personal_portfolio');
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
}
