import {db} from './config.js';
import {DataTypes} from 'sequelize';

export const movies = ["Synechdoche","New York", "i'm thinking of ending things", "mother!", "Aloners", "Blue Valentine"];
export const Movie = db.define("Movie", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:true,
        validate:{
            min:1900
        }
    },
    director:{
        type:DataTypes.STRING,
        allowNull:true
    },
    genre:{
        type:DataTypes.STRING,
    },
    synopsis:{
        type:DataTypes.TEXT
    },
    duration:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    poster:{
        type:DataTypes.STRING
    }
},{
    indexes:[
        {
            unique:true,
            fields:['title', 'year', 'director']
        }
    ]
});