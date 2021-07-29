import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        activeRoute: 'index',
        collapsedMenu: false
    },
    reducers: {
        changeRoute: (state, route) => {
            state.activeRoute = route;
        },
        toggle: (state) => {
            state.collapsedMenu = !state.collapsedMenu;
        }
    }
});

export const { changeRoute, toggle } = layoutSlice.actions;

export default layoutSlice.reducer;
