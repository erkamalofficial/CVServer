import dotenv from 'dotenv';
dotenv.config();
import './db/Connection.js';
import express from "express";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import ContactRoute from './routes/ContactRoute.js';
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', userRoute)
app.use('/api', ContactRoute)

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center" >Server Running Succesfully</h1>')
})

const listner = app.listen(process.env.PORT, () => {
    console.log(`Server Listen at Port ${listner.address().port}`)
})





