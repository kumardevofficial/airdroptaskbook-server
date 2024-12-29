import express, { json } from 'express';
import dotenv from "dotenv";
import dbConnection from './DbConnection/dbconnection.js';
import airdropRouter from './Routes/AirdropRoutes.js';


dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ "message": "hello world" });
});


app.use("/galxe", airdropRouter); 

dbConnection();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
