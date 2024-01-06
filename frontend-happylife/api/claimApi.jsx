import { apiV1, get, post, delele, put, patch } from "./generic";

const ClaimAPI = {
    getAllClaim: function(token){
        const url = `${apiV1}/claims`;
        return get(url, token);
    },
    updateStatusOfClaim: function(token, claimId, approvalStatus, message) {
        const url = `${apiV1}/claims/${claimId}/update-status`;
        return put(url, {
            regis: {approvalStatus:approvalStatus},
            message
        } ,token);
    }
}
export default ClaimAPI;