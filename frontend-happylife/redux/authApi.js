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
        console.log("res in loginUnser",res)
        dispatch(loginSuccess(res.data));
        if(res.data.userInfo.role ==='CUSTOMER'){
            console.log('role is ' + res.data.userInfo.role)
          router('/');
        } else if (res.data.userInfo.role ==='INSUARANCE_MANAGER'){
            router('/staff/insuarancemanagement/dashboard');
        } else if (res.data.userInfo.role ==='ACCOUNTANT'){
            router('/staff/accounting/dashboard');
        } 
        else {
            console.log('role is ' + res.data.userInfo.role)
        }

    } catch(err){
        dispatch(loginFail())    
        return err;
    }
}

export const registerUser = async(user, dispatch, router)=>{
    dispatch(registerStart());
    try{
        const res = await UserAPI.register(user);
        console.log('res in registerUser', res);
        dispatch(registerSuccess());
        router('/login');

    } catch(err){
        console.log('error in regisUser in reduc', err)
        dispatch(registerFail());
        return err;
    }
}