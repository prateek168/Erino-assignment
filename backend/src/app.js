import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import errorMiddleware from './middleware/errorMiddleware.js';  

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:5173'];  
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  
    } else {
      callback(new Error('Not allowed by CORS'));  
    }
  },
};
app.use(cors(corsOptions)); // Apply CORS with options

// Routes
app.use('/api/v1/contacts', contactRoutes);

// Connect to the database
connectDb();

app.use(errorMiddleware);

export default app;
