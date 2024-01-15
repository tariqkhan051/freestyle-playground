import express from 'express';
import dotenv from 'dotenv';

import { run } from './database-connection';
import { roleRoute } from './routes/role.route';
import { userRoute } from './routes/user.route';
import { listingRoute } from './routes/listing.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', roleRoute());
app.use('/', userRoute());
app.use('/', listingRoute());

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
    await run().catch(console.dir);

    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});