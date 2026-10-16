import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../reducers";

const store = configureStore({
    reducer:rootReducer
});

export default store;

//store.js retains all the configured actions as objects. The actions are more like processes in PL/SQL,
//meaning that they do not use some expensive logic to modify the data, there are existing features in use.
//This are also called pure functions (meaning that it changes the state after action is made, but the action
//is not an exception to any scenario in order to update the respective function)
//