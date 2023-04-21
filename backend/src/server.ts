import express from 'express'
import cors from 'cors'
import userRouter from './routes';
import path from 'path';

const app = express()
app.use(express.json());
app.use(cors())

app.use("/api", userRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

const port = 5000

app.listen(port, ()=> {
    console.log('Website served on http://localhost:' + port)
})