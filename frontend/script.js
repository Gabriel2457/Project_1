const SERVER_URL = "http://localhost:8080/movies";

function loadMovies() {
    fetch(SERVER_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            const movies = data.records;
            const movieList = document.getElementById("moviesContainer");

            movieList.innerHTML = "";

            if (!movies || movies.length === 0) {
                movieList.textContent = "No movies found.";
                return;
            }

            for (const movie of movies) {
                const item = document.createElement("div");
                item.classList.add("movie-container");

                item.addEventListener("click", () => onMovieClick(movie));

                const movieName = document.createElement("p");
                movieName.textContent = `${movie.title} (${movie.year})`;

                const moviePoster = document.createElement("img");
                moviePoster.src = movie.poster || "";
                moviePoster.alt = movie.title;
                moviePoster.classList.add("poster-container");

                item.appendChild(movieName);

                if (movie.poster) {
                    item.appendChild(moviePoster);
                }

                movieList.appendChild(item);
            }
        })
        .catch(error => {
            console.error("Error loading movies:", error);
        });
}

function onMovieClick(movie) {
    alert("Directed by " + movie.director);
}

const movieForm = document.getElementById("movieForm");

movieForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addMovie();
});

function addMovie() {
    const formData = {
        title: document.getElementById("title").value.trim(),
        year: Number(document.getElementById("year").value),
        director: document.getElementById("director").value.trim(),
        genre: document.getElementById("genre").value.trim(),
        synopsis: document.getElementById("synopsis").value.trim(),
        duration: Number(document.getElementById("duration").value),
        poster: document.getElementById("poster").value.trim()
    };

    fetch(`${SERVER_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error: ${response.status}`);
            }
            return data;
        })
        .then(() => {
            movieForm.reset();
            loadMovies();
        })
        .catch(error => {
            console.error("Error adding movie:", error);
            alert(error.message);
        });
}