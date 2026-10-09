import express from "express";
import * as movieController from "../controllers/movie.js";

export const router = express.Router();

router.get("/", movieController.getMovies);

router.put("/update", movieController.update);

router.delete("/remove/:id", movieController.remove);

router.get("/:id", movieController.getById);

router.post("/create", movieController.create);
