import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// action
export const fetchJoke = createAsyncThunk("fetchJoke", async () => {
    const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
    );
    return await response.json();
});

// reducer
const jokeSlice = createSlice({
    name: "joke",
    initialState: {
        joke: "",
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJoke.pending, (state, action) => {
            state.joke = {
                setup: "Loading",
                punchline: "Loading",
            };
        });

        builder.addCase(fetchJoke.fulfilled, (state, action) => {
            state.joke = action.payload;
            console.log(action.payload);
        });

        builder.addCase(fetchJoke.rejected, (state, action) => {
            state.joke = {
                setup: "Error",
                punchline: "Error",
            };
        });
    },
});

export default jokeSlice.reducer;
