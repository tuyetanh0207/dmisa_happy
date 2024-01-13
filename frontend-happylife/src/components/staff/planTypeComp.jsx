import React from "react";

export default function PlanTypeComp(props) {
  const { data } = props;
  return (
    /*
            "planType": [
            {
                "typeName": "Standard",
                "totalBenefits": 5,
                "benefits": [
                    {
                        "benefitName": "Hỗ trợ y tế",
                        "dependencies": "age",
                        "feeType": [
                            {
                                "type": "ageBased",
                                "startAge": 1,
                                "endAge": 3,
                                "fee": 3370000
                            },
                            {
                                "type": "ageBased",
                                "startAge": 4,
                                "endAge": 6,
                                "fee": 1550000
                            }
                        ],
                        "unit": "VND",
                        "insuranceAmount": 500000
                    }
                ]
            }
        ],
     */
    <div>
       <div className="flex my-attribute mb-4">
        <p className="flex my-attribute mb-4 w-60">Type: </p> <p>{data.typeName}</p>
    
      </div>
      <div className="flex my-attribute mb-4">
        <p className="flex my-attribute mb-4 w-60">Total Benefit: </p> <p>{data.totalBenefits}</p>{" "}
        <p>{data.unitOfTotalBenefits}</p>
      </div>
      <p className="mb-3">Benefits: </p>
      <div className="flex my-attribute mb-4">
        {data.benefits.map((e, idx) => (
          <div key={e} className="ml-10">
            <p className="text-custom-blue-3">{idx +1}.</p>
            <div className="flex my-attribute mb-4">
              <p className="flex my-attribute mb-4 w-60">Benefit Name:</p>
              <p>{e.benefitName}</p>
            </div>
            <div className="flex my-attribute mb-4">
              <p className="flex my-attribute mb-4 w-60">Insurance Amount:</p>
              <p>{e.insuranceAmount + " " + e.unit}</p>
            </div>
            <div className="flex my-attribute mb-4">
              <p className="flex my-attribute mb-4 w-60">Dependency:</p>
              <p>{e.dependencies}</p>
            </div>
            <div className="flex my-attribute mb-4">
              <p className="flex my-attribute mb-4 w-60">Fee :</p>
              <table className="w-full">
                <thead>
                  <tr>
                  <th className="pl-8 pr-2 py-4 text-left" >No.</th>
                    <th className="pl-8 pr-2 py-4 text-left" >From</th>
                    <th className="pl-8 pr-2 py-4 text-left" >To</th>
                    <th className="pl-8 pr-2 py-4 text-left" >Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {e.feeType.map((fee, idxFee) =>
                    fee.type === "ageBased" ? (
                      <tr key={fee + idxFee}>
                         <td className="border-t border-gray-300 px-8 py-2 text-center">{idxFee+1}</td>
                        <td className="border-t border-gray-300 px-8 py-2 text-center">{fee.startAge}</td>
                        <td className="border-t border-gray-300 px-8 py-2 text-center">{fee.endAge}</td>
                        <td className="border-t border-gray-300 px-8 py-2 text-center">{fee.fee}</td>
                      </tr>
                    ) : (
                      <tr key={fee + idxFee}>
                        <td>{fee.startAge}</td>
                        <td>{fee.endAge}</td>
                        <td>{fee.fee}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
