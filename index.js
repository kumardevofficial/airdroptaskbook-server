import express, { json } from 'express';
import dotenv from 'dotenv';
import dbConnection from './DbConnection/dbconnection.js';
import airdropRouter from './Routes/AirdropRoutes.js';
import galxeRouter from './Routes/GalxeRoutes.js';
import waitlistRouter from './Routes/WaitlistRoutes.js';
import projectRouter       from './Routes/ProjectRoutes.js';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

// Serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.use('/airdrop', airdropRouter);
app.use('/galxeairdrop', galxeRouter);
app.use('/waitlistairdrop', waitlistRouter);
app.use('/project', projectRouter);

// Database Connection
dbConnection();

// Start Server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

export default app;
