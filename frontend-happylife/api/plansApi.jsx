import {apiV1, get} from './generic'

const PlanAPI = {

    getAllPlan: function( ) {
        const url = `${apiV1}/plans/`;
        return get(url,"")
    },

}

export default PlanAPI;
