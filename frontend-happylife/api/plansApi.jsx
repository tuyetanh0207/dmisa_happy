import {apiV1, get, put} from './generic'

const PlanAPI = {

    getAllPlan: function( ) {
        const url = `${apiV1}/plans`;
        return get(url,"")
    },
    getAllPlanByStaff: function(token) {
        const url = `${apiV1}/plans`;
        return get(url,token)
    },
    updateOnePlanByStaff: function(planId, data,token){
        const url = `${apiV1}/plans/${planId}/update`;
        return put(url,data, token)
    },
    


}

export default PlanAPI;
