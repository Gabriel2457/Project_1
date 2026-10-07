CREATE TABLE Movie (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1900),
    director TEXT NOT NULL,
    genre TEXT,
    synopsis TEXT,
    duration INTEGER,
    poster TEXT,

    UNIQUE (title, year, director)
);
