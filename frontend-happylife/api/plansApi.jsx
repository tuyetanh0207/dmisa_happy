import {apiV1, get, put} from './generic'

const PlanAPI = {
    getAllPlan: function( ) {
        const url = `${apiV1}/plans/`;
        return get(url,"")
    },
    updateOnePlanByStaff: function(planId, data,token){
        const url = `${apiV1}/plans/${planId}/update`;
        return put(url,data, token)
    },
    getPlanByRegisId: function(regisId, token){
        const url = `${apiV1}/plans/${regisId}/getPlanByRegisId`;
        return get(url, token)
    }

}

export default PlanAPI;
