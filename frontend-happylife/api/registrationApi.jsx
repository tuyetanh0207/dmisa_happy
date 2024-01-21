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
    updateStatusOfRegistration: function(token, regisId, data, message) {
        const url = `${apiV1}/registrations/${regisId}/update-status`;
        return put(url, {
            regis: data,
            message
        } ,token);
    },
    getAllEnrollOfPlan: function(token, planId, status){
        var url = `${apiV1}/registrations/enroll?planId=${planId}`;
        if (status != null){
            status.forEach((e) =>{
                url= url + `&status=${e}`;
            })
        }
        return get(url, token);
    },
}
export default RegistrationAPI;