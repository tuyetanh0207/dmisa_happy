import { apiV1, get, post, delele, put, patch } from "./generic";

const ClaimAPI = {
    getAllClaim: function(token){
        const url = `${apiV1}/claims`;
        return get(url, token);
    },
    updateStatusOfClaim: function(token, claimId, data, message) {
        const url = `${apiV1}/claims/${claimId}/update-status`;
        return put(url, {
            claim: data,
            message
        } ,token);
    },
    ///staff/{claimId}/update
    updateClaimByStaff: function (token, claimId, claim){
        const url = `${apiV1}/claims/staff/${claimId}/update`;
        return put(url, claim ,token);
    }, 
    getAllClaimsOfUserByRegis: function (token, regisId){
        const url = `${apiV1}/claims/${regisId}/getAllClaimsOfUserByRegis`
        return get(url, token);
    }
}
export default ClaimAPI;