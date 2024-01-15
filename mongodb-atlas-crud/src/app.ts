import express, { Application } from 'express';
import dotenv from 'dotenv';
import { roleRoute } from './routes/role.route';
import { userRoute } from './routes/user.route';
import { listingRoute } from './routes/listing.route';

dotenv.config();

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', roleRoute());
app.use('/', userRoute());
app.use('/', listingRoute());

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

export default app;