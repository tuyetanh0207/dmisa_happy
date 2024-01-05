import { apiV1, get, post, delele, put, patch } from "./generic";

const RegistrationAPI = {
    getAllRegistration: function(token){
        const url = `${apiV1}/registrations`;
        return get(url, token);
    },
    updateStatusOfRegistration: function(token, regisId, approvalStatus, message) {
        const url = `${apiV1}/registrations/${regisId}/update-status`;
        return put(url, {
            approvalStatus,
            message
        } ,token);
    },
    createRegistration: function(regis,token){
        const url = `http://localhost:8090/api/v1/registrations/create`;
        console.log(regis);
        return post(url,regis,token)
    }
}
export default RegistrationAPI;