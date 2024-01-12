import {apiV1, get} from './generic'

const PlanAPI = {

    getAllPlan: function( ) {
        const url = `${apiV1}/plans`;
        return get(url,"")
    },
    getAllPlanByStaff: function(token) {
        const url = `${apiV1}/plans`;
        return get(url,token)
    },


}

export default PlanAPI;
