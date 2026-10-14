import React, {useState, useEffect} from "react";
import {MovieCard} from "../../components/MovieCard";
import {CreateMovieModal} from "../../components/CreateMovieModal";
import {Searchbar} from "../../components/Searchbar";
import "./style.css";
const SERVER_URL = "http://localhost:8080/api/v1";
const Movies = ()=>{
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getMovies = async (queryTitle)=>{
        const queryParams = new URLSearchParams();
        if(queryTitle){
            queryParams.append("title", queryTitle);

        }

        try{
            const url = `${SERVER_URL}/movies?` + queryParams;
            console.log("Fetching:", url);

            const res = await fetch(url);
            console.log("Status:", res.status);

            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`);
            }

            const data = await res.json();
            console.log("API response:", data);

            setMovies(data.records);
        }catch(err){
            console.error("Failed to fetch movies", err);
        }
    };
    
    const addMovie = (movie)=>{
        fetch(`${SERVER_URL}/movies`,{
            method:"POST",
            headers:{
                "ContentType":"application/json",
            },
            body: JSON.stringify(movie)
        })
        .then((res)=>getMovies())
        .catch((err)=>console.log(err));
    };

    const deleteMovie = (movie)=>{
        fetch(`${SERVER_URL}/movies/${movie.id}`,{method:"DELETE"})
            .then((res)=>getMovies())
            .catch((err)=>console.log(err))
    };

    //useEffect sends the data and helps with data fetching
    useEffect(()=>{
        getMovies();
    },[]);

    const openModal = ()=>{
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
    };
    return (
        <div>
            <div className="container">
                <h3>All movies</h3>
                <Searchbar openModal={openModal} getMovies={getMovies}/>
                <div id="moviesContainer">
                    {/*JSX syntax, for each movie in the list a MovieCard component is displayed*/}
                    {movies.map((movie, index)=>(
                        <MovieCard movie={movie} key={index} onDelete={deleteMovie}/>
                    ))}
                </div>
            </div>
            {/* conditional rendering and short-circuit evaluation (or &&)*/}
            {isModalOpen &&(
                <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal}/>
            )}
        </div>
    );
}

export {Movies}