
import * as movieService from "../services/movie.js";

const getMovies = async (req, res) => {
    try {
        const movies = await movieService.getMovies(req.query);
        res.send({ records: movies });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const identifiedMovie = await movieService.getById(req.params.id);

        if (identifiedMovie) {
            res.send({ movie: identifiedMovie });
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const create = async (req, res) => {
    if (!req.body.title || !req.body.director || !req.body.year) {
        return res.status(400).send({
            message: "Missing title, director or year"
        });
    }

    try {
        const movie = await movieService.create(req.body);
        res.status(201).send({ movie });
    } catch (err) {
        const status = err.message === "Movie already exists" ? 409 : 400;
        res.status(status).send({ message: err.message });
    }
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({
            message: "Movie id is mandatory"
        });
    }

    try {
        const movie = await movieService.getById(req.body.id);

        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        await movieService.update(req.body);
        res.status(204).send();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const movie = await movieService.getById(req.params.id);

        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        await movieService.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export { getMovies, getById, create, update, remove };