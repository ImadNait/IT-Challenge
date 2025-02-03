import { Elysia } from "elysia";
import { connectDB } from "./lib/db";
import { taskRoutes } from "./route/tasks";
import { config } from 'dotenv'
config()
const app = new Elysia();
await connectDB()
const port = `${process.env.PORT}`
app.use(taskRoutes);

connectDB().then(() => {
    app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
});
