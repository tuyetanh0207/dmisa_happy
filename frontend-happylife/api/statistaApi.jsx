import { apiV1, get } from "./generic";

const StatistaApi = {
    getStatista: function(token){
        const url = `${apiV1}/statista/dashboard`;
        return get(url, token);
    },
    getStatistaOfYear: function(token, year) {
        const url = `${apiV1}/statista/dashboard/${year}`;
        return get(url, token);
    },  
}
export default StatistaApi;