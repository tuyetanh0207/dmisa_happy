import {apiV1, get, put} from './generic'

const PlanAPI = {
    getAllPlan: function( ) {
        const url = `${apiV1}/plans`;
        return get(url,"")
    },
    getPlanByRegisId: function(planId, token){
        const url = `${apiV1}/plans/${planId}`;
        return get(url, token)
    },
    updateOnePlanByStaff: function(planId, data,token){
        const url = `${apiV1}/plans/${planId}/update`;
        return put(url,data, token)
    },

}

export default PlanAPI;
