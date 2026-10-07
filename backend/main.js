import express from "express";
import { router as movieRouter } from "./routes/movie.js";
import { synchronizeDatabase } from "./models/config.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use("/movie", movieRouter);

const server = app.listen(PORT, async () => {
    try {
        await synchronizeDatabase();
        console.log(`Server started on http://localhost:${PORT}`);
    } catch (err) {
        console.log("There was an error with the database connection");
        console.error(err);
        server.close();
    }
});

//# !!!! MUST DO !!!! # Lesson 7///