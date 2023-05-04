import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    userId: "63701cc1f03239b7f700000e",
    activePage: "",
    searchQuery: "",
    isAuthenticated: false
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setIsAuthenticated: (state) => {
            state.isAuthenticated = state.isAuthenticated == false ? true : false
        }
    },
});

export const { setMode, setActivePage, setSearchQuery, setIsAuthenticated } = globalSlice.actions;

export default globalSlice.reducer;
