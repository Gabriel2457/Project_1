# Project_1

## 9/10/2026 Backend
### Solved issues:
 - [x] **Not recognized import sequelize (issue with the file version)**
 - [x] **implementing random movies (not in use anymore because now i have a database and an ORM model)**
 - [x] **Database handling (i make the connection through the route ... model ... config.js and execute in main.js file by calling the bulk operation)**
### **Important Notes:**
- **learn http flags** (1.x.x, 2.x.x, 3.x.x, 4.x.x, 5.x.x)

## 14/10/2026 Frontend (first React + Vite code)
### Solved issues:
 - [x] **No connection to the database. In order to connect to the database you have to get the following steps:**
    ### BACKEND ###
    - use a unique port (for this you have to install cors because the default vs code port is in use, and this is port 3000)
    
    - match the url
    ### FRONTEND ###
    - When fetching the data, the interface port doesn't have to match the url port
    - match the DOM elements (in plain JS you have default methods from the browser such as getElementById, but React uses its default methods in order to send data)

    - install serve in order to check connection (see how to use it properly)

    - when you make a getter, you try to fetch the data so anything regarding the http connection with the respective page

    - when data isn t shown you have to watch for three things:
          1. If the data is sent correctly
          2. If the page or item contains any data
          3. If it s too much data to handle 
    ### Incentives ###
    #### useEffect() #### 
    ##### -> sends the data in three different forms: #####
    ##### 1st Form #####
    ```js
        //Used after mounting once

          useEffect(() => {
            fetchData();
            return () => {
            console.log("clean up the component");
            };
        }, []);
    ```
    ##### 2nd Form #####
    ```js
        //Used after first mounting and each render
        useEffect(() => {
            fetchData();
        }, [data]);
    ```
    ##### 3rd Form #####

    ```js
        // method that executes after rendering, every time the data variable changes
        useEffect(() => {
            fetchData();
        }, [data]);

        const fetchData = async () => {
        const result = await fetchDataFromAPI();
        setData(result);
        };

        return (
            <div>
            // conditional rendering based on whether a value is assigned to the
            //data variable
        {data ? <p>Data loaded : {data}</p> : <p>Loading...</p>}
        </div>
        );
    ```
    #### useStatus() ####
    ##### -> helps functional components to store and manage local state #####
    ##### -> it's always defined through the tuple [variableName, setVariableName] #####

    ```js
    import { useState } from "react";

    function ExampleComponent() {
    // the count variable from the component's state
    // the variable's value is changed using the setCount method
        const [count, setCount] = useState(0);

        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        );
    }
    ```
### FRONTEND SETUP (React + Vite ) ###
```cmd
    npm create vite@latest front-end-react -- --template react
```
#### COMPONENTS ####

- ####  the public directory ####
    * contains static files that won't be processed but will be copied to the final directory when building the project

- #### the index.html file ####
    * basic template for the main page of your React application
    * here you can modify the title, add meta information, or include other static resources

- #### the src directory ####
    * contains the source code of the React application

- #### the src/assets directory ####
    * contains static files that will be processed along with the source code

- #### the src/main.jsx file ####
    * entry point into the React application
    * here the main component (<App />) is imported and rendered in the element with the id "root" from the index.html file

- #### the src/index.css file ####
    * contains global styles, used throughout the entire application

- #### the src/App.jsx file ####
    * the main component of the application

- #### the src/App.css file ####
    * styling associated with the main component of the application

- #### the package.json file ####
    * contains information about the project, its dependencies, build and run scripts, as well as other configurations

### Model (without Router + Redux) ###
```cmd
    src/
    ├── pages/
    |   └── Movies
    │       └── index.jsx
    │       └── style.css
    ├── components/
    │   └── MovieCard
    │       └── index.jsx
    │       └── style.css
    │   └── CreateMovieModal
    │       └── index.jsx
    │       └── style.css
    |   └── Searchbar
    │       └── index.jsx
    │       └── style.css
    └── ... // can contain services, util functions etc.
```

## React using path shortcuts for a better dynamic approach ##
### Model (Router + Redux) ###

```cmd
    src/
    ├── pages/
    |   └── Movies
    │       └── index.jsx
    │       └── style.css
    ├── actions/ **
    |   └── movies.js *
    ├── reducers/ **
    |   └── index.js *
    |   └── movies.js *
    ├── stores/ **
    |   └── store.js *
    ├── components/
    │   └── MovieCard
    │       └── index.jsx
    │       └── style.css
    │   └── CreateMovieModal
    │       └── index.jsx
    │       └── style.css
    |   └── Searchbar
    │       └── index.jsx
    │       └── style.css
    └── ... // can contain services, util functions etc.
```
### Concepts: ###

- **STORE** (the global "database")

    * an object that contains the entire application state
    * the state is modified only through special functions called reducers

- **REDUCERS**

    * a pure function (for the same input, always returns the same output) that modifies the current state as a result of an action
    * receives the current state and an action and returns a new state

- **ACTION**

    * objects that describe the intention to modify the state
    * are sent to reducers

- **ACTION CREATORS**

* functions used to create action objects
usually called right before dispatch

- **DISPATCH**

    * the process of sending an action to the store

- **MIDDLEWARE**

    * additional functionality that can be introduced between sending an action and its processing by the reducer
    * e.g., logging

### FRONTEND SETUP (using Material UI - the last category) ###

```cmd
    src/
    ├── pages/
    |   └── Movies
    │       └── index.jsx
    │       └── style.css
    ├── actions/
    |   └── movies.js
    ├── reducers/
    |   └── index.js
    |   └── movies.js
    ├── stores/
    |   └── store.js
    ├── components/
    │   └── MovieCard
    │       └── index.jsx
    │       └── style.css
    │   └── MovieList/ **
    │       └── index.jsx *
    │       └── style.css *
    │   └── MovieTable/ **
    │       └── index.jsx *
    │       └── style.css *
    │   └── CreateMovieModal
    │       └── index.jsx
    │       └── style.css
    |   └── Searchbar
    │       └── index.jsx
    │       └── style.css
    └── ... // can contain services, util functions etc.
```
- It is inspired by Google concept of Material UI (basically it's more of pastel-like and geometrical wise setup that makes the overall interface more user friendly)
- It's not a matter of configuration or setup, but more of a convention for design structure and color palete

## MODIFIED FILES ##

- ### *MovieCard (we are now using a MovieTable and MovieList component to process, update and show the entire database. MovieCard is used just for the design of all movie cards which is understandable considering what backend must show)* ###
- ### *Searchbar (we add a switch button to the searchbar)* ###

### In order to use MUI you shall install: ###

* @mui/material @emotion/react
* @emotion/styled
* @mui/x-data-grid
* @mui/icons-material


### **Important Notes (no urgent matter):**
- **try to make a simillar project at the end of the lectures (this was lecture 11)**
- **try to play more with React and see information system design, OOP and database structures**
- **learn Docker, Postman, PostgreSQL and recap MongoDB**
