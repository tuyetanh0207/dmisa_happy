import {apiV1, get, post, put, patch, delele} from './generic'

const UserAPI = {

    login: function(user){
        const url = `${apiV1}/users/auth/signin`;
        return post(url, user,"");
    },
    register: function(user){
        const url = `${apiV1}/users/auth/register`;
        return post(url, user,"");
    },
    getUser: function(token, userId) {
        const url = `${apiV1}/users/${userId}`;
        return get(url, token)
    },
    updateUser: function(newUser, userId, token){
        const url = `${apiV1}/users/${userId}/update`;
        return put(url,newUser,token);
    }
}

export default UserAPI;