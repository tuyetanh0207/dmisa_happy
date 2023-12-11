import { apiV1, get, post, delele, put, patch } from "./generic";

const RegistrationAPI = {
    getAllRegistration: function(token){
        const url = `${apiV1}/registrations`;
        return get(url, token);
    }
}
export default RegistrationAPI;