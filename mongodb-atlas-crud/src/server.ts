import app from "./app";
import { run } from "./database-connection";

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

app.listen(PORT, async () => {
    await run().catch(console.dir);

    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});