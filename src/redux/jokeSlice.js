import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// action
export const fetchJoke = createAsyncThunk("fetchJoke", async () => {
    const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
    );
    return await response.json();
});

const jokeSlice = createSlice({
    name: "joke",
    initialState: {
        joke: "",
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJoke.fulfilled, (state, action) => {
            state.joke = action.payload;
        });
    },
});

export default jokeSlice.reducer;
