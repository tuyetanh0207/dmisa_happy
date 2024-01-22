import {BsFillTrashFill,BsFillPencilFill} from 'react-icons/bs'
import { useState } from 'react'
import CreateClaimModal from './createclaimmodal.jsx'

export default function addinvoiceclaim ({rows,deleteRow})  {

    

  return (
    <div className="relative overflow-x-auto pt-10">
    <table  className="w-full text-sm text-left rtl:text-right border-gray-900 text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase border-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 w-1/2 border-gray-900">
                    Invoices Date
                </th>
                
                <th scope="col" className="px-6 py-3 w-1/2">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3 w-1/2">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                rows.map((item,index) => (
                    <tr key={index}>
                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.invoiceDate}</td>
                        <td className="px-6 py-3 border-t border-gray-300 ">{item.amount}</td>
                        <td>
                            <div className="flex justify-around">
                                <BsFillTrashFill onClick={() => deleteRow(index)} className="text-red-500"/>
                                {/* <BsFillPencilFill className="text-gray-900"/> */}
                            </div>
                        </td>
                    </tr>
                ))
            }
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        date
                </td>
                <td className="px-6 py-3 border-t border-gray-300 ">
                    Amount
                </td>

            </tr> */}
        </tbody>
    </table>

    
    
</div>
  )
}
