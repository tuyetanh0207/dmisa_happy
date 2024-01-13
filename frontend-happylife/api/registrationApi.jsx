import { apiV1, get, post, delele, put, patch } from "./generic";

const RegistrationAPI = {
    getAllRegistration: function(token){
        const url = `${apiV1}/registrations`;
        return get(url, token);
    },
    updateStatusOfRegistration: function(token, regisId, approvalStatus, message) {
        const url = `${apiV1}/registrations/${regisId}/update-status`;
        return put(url, {
            regis: {approvalStatus:approvalStatus},
            message
        } ,token);
    },
    getAllEnrollOfPlan: function(token, planId, status){
        var url = `${apiV1}/registrations/enroll?planId=${planId}`;
        if (status != null){
            status.forEach((e) =>{
                url= url + `&status=${e}`
            })
        }
      
        return get(url, token)
    }
}
export default RegistrationAPI;