import {apiV1, get, put} from './generic'
const InvoiceAPI = {
    updateInvoiceStatus: function(invoice, invoiceId, token){
        const url = `${apiV1}/invoices/${invoiceId}/Cash`;
        return put(url, invoice, token)
    },
    getInvoiceByRegisId: function(regisId, token){
        const url = `${apiV1}/invoices/${regisId}/getByRegisId`;
        return get(url, token)
    }
}

export default InvoiceAPI;