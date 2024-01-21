import {apiV1, get, put} from './generic'
const NotiAPI = {
    getNoti: function(userId, token){
        const url = `${apiV1}/notifications/${userId}`;
        return get(url, token)
    },
    getNumberNotiStatusFalse: function(token){
        const url = `${apiV1}/notifications/getNotiStatusFalseOfUser `;
        return get(url, token)
    },
    updateNotiStatus: function(user, token){
        const url = `${apiV1}/notifications/updateAllStatusOfUser`;
        return put(url, user, token)
    },
}

export default NotiAPI;