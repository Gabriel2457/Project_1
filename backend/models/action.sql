CREATE TABLE Movie (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER CHECK (year >= 1900),
    director TEXT,
    genre TEXT,
    synopsis TEXT,
    duration INTEGER,
    poster TEXT,

    UNIQUE (title, year, director)
);