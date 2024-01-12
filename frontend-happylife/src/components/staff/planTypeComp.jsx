import React from 'react'

export default function PlanTypeComp(props) {
    const {data} = props
  return (
    <div>
        <div>
            <p>Type Name:</p> 
            <p>{data.typeName}</p>
        </div>
        <div>
            <p>Total benefit:</p> 
            <p>{data.totalBenefits + " " + data.unitOfTotalBenefit}</p>
        </div>
       
        <div>
            <p>Plan Duration:</p> 
            <p>{data.planDuration }</p>
        </div>
        <div>
            <p>Plan Duration Unit:</p> 
            <p>{data.planDurationUnit }</p>
        </div>
        <div>
            <p>Claim Scenarios:</p> 
            <div>{data.claimScenarios.map((e, idx)=>
            <p key={e}>
                {e}
            </p>)}</div>
        </div>
        <div>
            <p>Document Types:</p> 
            <div>{data.documentName.map((e, idx)=>
            <p key={e}>
                {e}
            </p>)}</div>
        </div>
        <div>
            <p>Plan Benefits:</p> 
            <div>{data.planBenefits.map((e, idx)=>
            <p key={e}>
                {e}
            </p>)}</div>
        </div>
        <div>
            <p>Plan Service Coverage:</p> 
            <p>{data.planDuration }</p>
        </div>
    </div>
  )
}
