import express, { json } from 'express';
import dotenv from "dotenv";
import dbConnection from './DbConnection/dbconnection.js';
import airdropRouter from './Routes/AirdropRoutes.js';
import galxeRouter from './Routes/GalxeRoutes.js';
import wailistRouter from './Routes/WaitlistRoutes.js';
import cors from 'cors'


dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

app.use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization" 
}));


app.get("/", (req, res) => {
  res.json({ "message": "hello world" });
});


app.use("/airdrop", airdropRouter); 
app.use("/galxeairdrop", galxeRouter);
app.use("/waitlistairdrop", wailistRouter);

dbConnection();

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

export default app;