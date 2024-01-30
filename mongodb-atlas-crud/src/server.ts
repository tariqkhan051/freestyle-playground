import app from "./app";
import { run } from "./database-connection";

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000');

app.listen(PORT, HOST, async () => {
    await run().catch(console.dir);

    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});