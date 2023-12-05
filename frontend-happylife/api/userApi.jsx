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
}

export default UserAPI;