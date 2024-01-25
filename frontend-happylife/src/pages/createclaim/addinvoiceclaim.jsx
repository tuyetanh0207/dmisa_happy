import {BsFillTrashFill,BsFillPencilFill} from 'react-icons/bs'
import { useState } from 'react'
import CreateClaimModal from './createclaimmodal.jsx'

export default function addinvoiceclaim ({rows,deleteRow})  {

    

  return (
    <div className="relative overflow-x-auto py-5">
    <table  className="w-full border-gray-900  ">
        <thead className="text-lg text-center  border-gray-900 bg-gray-200">
            <tr>
                <th scope="col" className="py-5 px-5 w-1/3 ">
                    DATE
                </th>
                
                <th scope="col" className="py-5 px-5 w-1/3">
                    AMOUNT
                </th>
                <th scope="col" className=" py-5 px-5 w-1/3">
                    ACTION
                </th>
            </tr>
        </thead>
        <tbody>
            {
                rows.map((item,index) => (
                    <tr key={index} className="text-lg  text-center">
                        <td className="w-1/3 py-5 px-5 ">{item.invoiceDate}</td>
                        <td className="w-1/3 py-5 px-5  ">{item.amount}</td>
                        <td>
                            <div className="flex justify-around py-5 px-5">
                                <BsFillTrashFill onClick={() => deleteRow(index)} className="text-red-500"/>
                                {/* <BsFillPencilFill className="text-gray-900"/> */}
                            </div>
                        </td>
                    </tr>
                ))
            }

        </tbody>
    </table>

    
    
</div>
  )
}
