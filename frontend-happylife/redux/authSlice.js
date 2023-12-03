import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login:{
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        logout: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart:(state) => {
            state.login.isFetching = true;
        },
        loginFail: (state) => {
            state.login.error = true;
            state.login.isFetching = false;

        },
        loginSuccess: (state) => {
            state.login.isFetching = false;
            state.login.success = true;
            state.login.error = false;
        },
        registerStart: (state) => {
            state.login.isFetching = true;
        },
        registerFail: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutFail: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.success = true;
            state.logout.error = false;
        }
    }
})


export const {
    loginStart,
    loginSuccess,
    loginFail,
    registerStart,
    registerFail,
    registerSuccess,
    logoutStart,
    logoutFail,
    logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;