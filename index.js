import express from 'express';
import cors from 'cors';

import connection from './database/db.js';
import Routes from './routes/route.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors());


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use('/', Routes);

app.use('/users', userRouter);

const PORT = 8000;

connection()

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`)); 