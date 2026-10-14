# Project_1

## 9/10/2026 Backend
### Solved issues:
 - [x] **Not recognized import sequelize (issue with the file version)**
 - [x] **implementing random movies (not in use anymore because now i have a database and an ORM model)**
 - [x] **Database handling (i make the connection through the route ... model ... config.js and execute in main.js file by calling the bulk operation)**
### Important Notes:
- **learn http flags** (1.x.x, 2.x.x, 3.x.x, 4.x.x, 5.x.x)

## 14/10/2026 Frontend (first React + Vite code)
### Solved issues:
 - [x] **No connection to the database. In order to connect to the database you have to get the following steps:**
    ### BACKEND ###
        - use a unique port (for this you have to install cors because the default vs code port is in use, and this is port 3000)
        - match the url
    ### FRONTEND ###

        - match the DOM elements (in plain JS you have default methods from the browser such as getElementById, but React uses its default methods in order to send data)
        - install serve in order to check connection (see how to use it properly)
        - when you make a getter, you try to fetch the data so anything regarding the http connection with the respective page
        - when data isn t shown you have to watch for two things:
          1. If the data is sent correctly
          2. If the page or item contains any data
        * 3. If it s too much data to handle *
    #### Incentives ####
        - useEffect() -> for sending data ready to be used
        - useStatus() -> checks the state of an item/element is truthy or falsy
        
### Important Notes (no urgent matter):
- **try to make a simillar project at the end of the lectures (this was lecture 11)**
- **try to play more with React and see information system design, OOP and database structures**
- **learn Docker, Postman, PostgreeSQL and recap MongoDB**