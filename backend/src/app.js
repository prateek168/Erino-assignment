// src/app.js
import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/errorMiddleware.js'; // Import error middleware

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
// Change '/app/v1/contacts' to '/api/v1/contacts'
app.use('/api/v1/contacts', contactRoutes);

// Connect to the database
connectDb();

// Error handling middleware
app.use(errorMiddleware);

export default app;
