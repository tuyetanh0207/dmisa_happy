import {apiV1, get, put} from './generic'
const InvoiceAPI = {
    updateInvoiceStatus: function(invoice, invoiceId, token){
        const url = `${apiV1}/invoices/${invoiceId}/cash`;
        return put(url, invoice, token)
    }
}

export default ContractAPI;