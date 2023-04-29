import express from 'express'
import cors from 'cors'
import userRouter from './routes';
import path from 'path';
import dotenv from 'dotenv'
import fileupload from 'express-fileupload'
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors())
app.use(fileupload())

app.use("/api", userRouter);

app.use(express.static(__dirname+'public'));


const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log('Website served on http://localhost:' + port)
})