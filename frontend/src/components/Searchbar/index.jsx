
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import "./style.css";
import { setSearchTitle } from "../../actions/movies";

const Searchbar = ({ openModal, getMovies }) => {
  const queryTitle = useSelector(
    (state) => state.movies.searchTitle
  );

  const dispatch = useDispatch();
  const [temporaryQueryTitle, setTemporaryQueryTitle] =
    useState(queryTitle);

  const navigate = useNavigate();

  const searchMovie = (title) => {
    dispatch(setSearchTitle(title));
    getMovies(title);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchMovie(temporaryQueryTitle.trim());
  };

  return (
    <div className="toolbar">
      <form onSubmit={handleSearch}>
        <input
          value={temporaryQueryTitle}
          onChange={(event) =>
            setTemporaryQueryTitle(event.target.value)
          }
          id="search"
          className="searchbar custom-text-input"
          type="text"
          placeholder="Search for a movie"
        />

        <button className="custom-button" type="submit">
          Search
        </button>
      </form>

      <button
        className="custom-button"
        onClick={openModal}
      >
        Add a movie
      </button>

      <button
        className="custom-button"
        onClick={() => navigate("/series")}
      >
        Series Page
      </button>
    </div>
  );
};

export { Searchbar };
