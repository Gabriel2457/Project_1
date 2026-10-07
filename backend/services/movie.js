import {Op} from "sequelize";
import {Movie} from "../models/movie.js";

export const getMovies = async(query)=>{
    const entityKeys = Object.keys(Movie.getAttributes());
    delete query.id;
    delete query.poster;
    const whereConditions = Object.keys(query)
        .filter(key => entityKeys.includes(key))
        .map(key=>{
            if(key === "title" || key === "director"){
                return {[key]:{[Op.like]: `%${query[key]}%`}}
            }
            
            return {[key]:query[key]}
        })
        return await Movie.findAll({
            attributes: ['id', 'title', 'year', 'director', 'genre', 'poster'],
            where: whereConditions
        });

};

export const getById = async(id)=>{
    return await Movie.findOne({
        where:{
            id: id
        }
    });
};

export const create = async(movie) =>{
    const existingMovies = await getMovies({title: movie.title, director:movie.director, year:movie.year});
    if(existingMovies.length !== 0){
        throw new Error("Movie already exists");
    }
    return await Movie.create(movie);
};

export const update = async(movieUpdateDate) =>{
    const movie = await Movie.findOne({
        where: {
            id:movieUpdateDate.id
        }
    });
    if(!!movie){
        delete movieUpdateDate.id;
        movie.set({
            ...movieUpdateDate
        });
        await movie.save();
    }
}

export const remove = async (id)=>{
    await Movie.destroy({
        where:{
            id: id
        }
    });
}

