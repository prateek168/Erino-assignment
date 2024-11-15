// src/app.js
import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import connectDb from './connectDb.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/contacts', contactRoutes);

// Connect to database
connectDb();

export default app;
