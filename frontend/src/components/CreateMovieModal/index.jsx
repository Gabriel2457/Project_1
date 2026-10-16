
import { useState } from "react";
import "./style.css";

const CreateMovieModal = ({ onAddMovie, closeModal }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [duration, setDuration] = useState("");
  const [poster, setPoster] = useState("");

  const saveMovie = (event) => {
    event.preventDefault();

    const movie = {
      title: title.trim(),
      year: year === "" ? null : Number(year),
      director: director.trim(),
      genre: genre.trim(),
      synopsis: synopsis.trim(),
      duration: duration === "" ? null : Number(duration),
      poster: poster.trim()
    };

    onAddMovie(movie);
    closeModal();
  };

  return (
    <dialog id="CreateMovieModal" className="modal" open>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add movie</h2>

          <button
            type="button"
            className="modal-close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form
          id="addMovieForm"
          className="create-form"
          onSubmit={saveMovie}
        >
          <label htmlFor="title">Title:</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="custom-text-input"
            type="text"
            id="title"
            name="title"
            required
          />

          <label htmlFor="year">Year:</label>
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="custom-text-input"
            type="number"
            id="year"
            name="year"
          />

          <label htmlFor="director">Director:</label>
          <input
            value={director}
            onChange={(event) => setDirector(event.target.value)}
            className="custom-text-input"
            type="text"
            id="director"
            name="director"
          />

          <label htmlFor="genre">Genre:</label>
          <input
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="custom-text-input"
            type="text"
            id="genre"
            name="genre"
          />

          <label htmlFor="synopsis">Synopsis:</label>
          <textarea
            value={synopsis}
            onChange={(event) => setSynopsis(event.target.value)}
            className="custom-text-input"
            id="synopsis"
            name="synopsis"
          />

          <label htmlFor="duration">Duration (minutes):</label>
          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="custom-text-input"
            type="number"
            id="duration"
            name="duration"
          />

          <label htmlFor="poster">Poster URL:</label>
          <input
            value={poster}
            onChange={(event) => setPoster(event.target.value)}
            className="custom-text-input"
            type="url"
            id="poster"
            name="poster"
          />

          <button className="custom-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </dialog>
  );
};

export { CreateMovieModal };
