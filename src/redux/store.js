import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./jokeSlice";

const store = configureStore({
    reducer: {
        joke: jokeReducer,
    },
});

export default store;
