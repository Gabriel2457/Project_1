import express from "express";
import { router as movieRouter } from "./routes/movie.js";
import * as movieController from "./controllers/movie.js";
import { sychronizeDatabase } from "./models/config.js";
import { Movie, movies } from "./models/movie.js";

const PORT = 8080;
const app = express();

app.use(express.json());

app.get("/", movieController.getMovies);
app.use("/movie", movieRouter);

const server = app.listen(PORT, async () => {
    try {
        await sychronizeDatabase();

        for (const title of movies) {
            await Movie.findOrCreate({
                where: { title },
                defaults: { title }
            });
        }

        console.log(`Server started on http://localhost:${PORT}`);
    } catch (err) {
        console.log("There was an error with the database connection");
        console.error(err);
        server.close();
    }
});

