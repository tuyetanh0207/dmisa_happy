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
        if(res && res.data)
        // Kiểm tra xem res có != undefied và res.data tồn tại
        {
            dispatch(loginSuccess(res.data));
            if(res.data.userInfo.role ==='CUSTOMER'){
                console.log('role is ' + res.data.userInfo.role)
              router('/home');
            } else if (res.data.userInfo.role ==='INSUARANCE_MANAGER'){
                router('/staff/insuarancemanagement/registration');
            } else {
                console.log('role is ' + res.data.userInfo.role)
            }
    
            return res.data;    
        }
        else{
            // Xử lý trường hợp res hoặc res.data là undefined
            console.log('Invalid response:', res);
            dispatch(loginFail());
            return { error: 'Invalid response' };
        }

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
        router('/login');

    } catch(err){
        dispatch(registerFail());
        console.log('error in registerUser', err);
        return err.error
        // if (!err.response) return (err.message);
        //     return (err.response.data.message);
    }
}