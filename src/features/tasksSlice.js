import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        showModel: false,
        task: {
            _id: '',
            name: '',
            expirationDate: new Date(),
            completed: false
        },
        tasks: [],
        statusData: false
    },
    reducers: {
        showOrHideModel: (state) => {
            state.showModel = !state.showModel;
        },
        setModel: (state, task) => {
            state.task = task.payload;
        },
        setTasks: (state, tasks) => {
            state.tasks = tasks.payload;
        },
        updateStatusData: (state) => {
            state.statusData = !state.statusData;
        }
    }
});

export const { showOrHideModel, setModel, setTasks, updateStatusData } = tasksSlice.actions;

export default tasksSlice.reducer;