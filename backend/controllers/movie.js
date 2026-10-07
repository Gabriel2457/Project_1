import * as movieService from "../services/movie.js";

const getMovies = async (req, res) => {
    res.send({ records: await movieService.getMovies(req.query) });
};

const getById = async (req, res) => {
    const identifiedMovie = await movieService.getById(req.params.id);

    if (!!identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        res.status(404).send();
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
        res.status(201).send({ movie: movie });
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({
            message: "Movie id is mandatory"
        });
    }

    await movieService.update(req.body);
    res.status(204).send();
};

const remove = async (req, res) => {
    await movieService.remove(req.params.id);
    res.send();
};

export { getMovies, getById, create, update, remove };