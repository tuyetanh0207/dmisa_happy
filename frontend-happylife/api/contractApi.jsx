import {apiV1, get, put} from './generic'
const ContractAPI = {
    updateContractStatus: function(contract, contractId, token){
        const url = `${apiV1}/contracts/update/${contractId}/status`;
        return put(url, contract, token)
    },
    getContractByRegisId: function(regisId, token){
        const url = `${apiV1}/contracts/${regisId}/getById`;
        return get(url, token)
    }
}

export default ContractAPI;