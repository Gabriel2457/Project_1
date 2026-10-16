
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

  // The selector sends data to the physical dataset (state.movies.data)
  // If, let's say, we were to send an object, then we would of used state.movies
  // useSelector() is generaly used to access the stored data in the item

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

      //for the option bellow, we send objects (or chunks of data) to a JSON record list
      //actions are stored in a file named actions and one of them (addMovie) is used to modify the data
      //dispatch is used in order to send the said action to the store (could give the general idea of a deposit
      // but store can be used with the concept of "Order of operations" or "sync and async commands" (need to
      // to clarify this after a little bit of research) 
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
  //a modal is a separate window (not page) after an action was sent (like a form or pressing a signin button)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="container">
        <h3>All movies</h3>

        <Searchbar
        //this features are called props and the concept of inheriting the props is called prop drilling 
        // the following is a made prop while the className="" is a default prop
          openModal={openModal}
          getMovies={getMovies}
        />

        <div id="moviesContainer">
          {movies.map((movie) => (
            //this is called a custom component
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
