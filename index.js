import express, { json } from 'express';
import dotenv from 'dotenv';
import dbConnection from './DbConnection/dbconnection.js';
import airdropRouter from './Routes/AirdropRoutes.js';
import galxeRouter from './Routes/GalxeRoutes.js';
import waitlistRouter from './Routes/WaitlistRoutes.js';
import projectRouter       from './Routes/ProjectRoutes.js';
import cors from 'cors';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Setup __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);


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
