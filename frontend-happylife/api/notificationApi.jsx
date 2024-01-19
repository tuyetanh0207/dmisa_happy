import {apiV1, get, put} from './generic'
const InvoiceAPI = {
    getNoti: function(userId, token){
        const url = `${apiV1}/notifications/${userId}`;
        return get(url, token)
    }
}

export default InvoiceAPI;