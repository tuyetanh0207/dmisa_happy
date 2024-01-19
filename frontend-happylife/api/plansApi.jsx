import {apiV1, get} from './generic'

const PlanAPI = {
    getAllPlan: function( ) {
        const url = `${apiV1}/plans/`;
        return get(url,"")
    },
    getPlanByRegisId: function(planId, token){
        const url = `${apiV1}/plans/${planId}`;
        return get(url, token)
    }

}

export default PlanAPI;
