import UserAPI from '../api/userApi';

import {
    loginStart,
    loginSuccess,
    loginFail,
    registerStart,
    registerFail,
    registerSuccess,
    // logoutStart,
    // logoutFail,
    // logoutSuccess,
} from './authSlice';

export const loginUser = async(user, dispatch, router) => {
    dispatch(loginStart());
    try{
        const res = await UserAPI.login(user);
        dispatch(loginSuccess(res.data));
        if(res.data.user.role ==='CUSTOMER'){
            router.push('/');
        }
        return 1;

    } catch(err){
        dispatch(loginFail())
        console.log('error in loginUser', err);
        return err.error;
    }
}

export const registerUser = async(user, dispatch, router)=>{
    dispatch(registerStart());
    try{
        const res = await UserAPI.register(user);
        console.log('res in registerUser', res);
        dispatch(registerSuccess());
        router.push('/');

    } catch(err){
        dispatch(registerFail());
        console.log('error in registerUser', err);
        return err.error
        // if (!err.response) return (err.message);
        //     return (err.response.data.message);
    }
}