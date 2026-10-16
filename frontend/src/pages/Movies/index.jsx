
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMovie,
  deleteMovie,
  setMovies
} from "../../actions/movies";

import { MovieCard } from "../../components/MovieCard";
import { CreateMovieModal } from "../../components/CreateMovieModal";
import { Searchbar } from "../../components/Searchbar";

import "./style.css";

const SERVER_URL = "http://localhost:8080/api/v1";

const Movies = () => {
  const dispatch = useDispatch();

  // The reducer stores the array in state.movies.data
  const movies = useSelector((state) => state.movies.data);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMovies = (queryTitle) => {
    const queryParams = new URLSearchParams();

    if (queryTitle) {
      queryParams.append("title", queryTitle);
    }

    fetch(`${SERVER_URL}/movies?${queryParams}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setMovies(data.records));
      })
      .catch((err) => console.error("Error fetching movies:", err));
  };

  const addMovieHandler = (movie) => {
    fetch(`${SERVER_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add movie");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(addMovie(data.movie));
      })
      .catch((err) => console.error("Error adding movie:", err));
  };

  const deleteMovieHandler = (movie) => {
    fetch(`${SERVER_URL}/movies/${movie.id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete movie");
        }

        dispatch(deleteMovie(movie.id));
      })
      .catch((err) => console.error("Error deleting movie:", err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="container">
        <h3>All movies</h3>

        <Searchbar
          openModal={openModal}
          getMovies={getMovies}
        />

        <div id="moviesContainer">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              onDelete={deleteMovieHandler}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateMovieModal
          onAddMovie={addMovieHandler}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export { Movies };
