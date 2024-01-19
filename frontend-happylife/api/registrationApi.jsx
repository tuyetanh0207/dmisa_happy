import { apiV1, get, post, delele, put, patch } from "./generic";

const RegistrationAPI = {
    getAllRegistration: function(token){
        const url = `${apiV1}/registrations`;
        return get(url, token);
    },
    getUserRegistration: function(token, userId){
        const url = `${apiV1}/registrations/${userId}`;
        return get(url, token);
    },
    updateStatusOfRegistration: function(token, regisId, approvalStatus, message) {
        const url = `${apiV1}/registrations/${regisId}/update-status`;
        return put(url, {
            approvalStatus,
            message
        } ,token);
    }
}
export default RegistrationAPI;