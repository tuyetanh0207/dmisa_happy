const EntityVerticalDisplay = (props) => {
    const {entityType, attributes, values} =props
    return (
        <div className="text-slight-back p-10">
              {/* avatar section */}
              <div className="mb-10 flex items-center ml-20">
                {values[0]!==""?
                <img src="" className="relative left-6" alt=""/>
                :
                <div className="relative right-6 w-20 h-20 bg-bgr-white border border-grey"/>}
                <div className=" ">
                  <span className="text-[0.8em]">{attributes[1]}: <span className="font-semibold">{values[1]}</span></span>
                  <p> <p className="font-bold text-md text-custom-blue-3">{values[2]}</p></p>
                </div>

              </div>
              {/* rows */}
              <div className="h">
                {attributes.map((a, index)=>( 
                  index>=3 &&
                  <div className="flex mb-7" key ={a}>
                  <p className="text-md w-40 font-[500]">{a}</p>
                  <p 
                  className={`text-md font-[700] ${values[index]==="Approved"?'text-custom-blue-2': values[index]==='Pending'? 'text-custom-blue-3':values[index]==='Rejected'||values[index]==='Revoked'?'text-custom-red-2':''}`}
                  >
                    {values[index]
                    ?
                    typeof(values[index])===typeof([])
                    ? 
                    a==="Plan Type"
                    ?
                    // plan type display
                    values[index].map((e, idx)=>
                    <div key={e.typeName}>
                      <di className="flex mb-7" ><p className="mr-1">{idx + 1} .Type Name:</p> <p>{e.typeName}</p></di>
                    </div>
                    )
                    : 
                    a==="Plan Optional Benefits"
                    ?
                    // plan benefit display
                    values[index].map((e, idx)=>
                    <div key={e.benefitName}>
                      <div className="flex mb-7" ><p className="mr-1"></p> </div>
                      <div className="flex mb-7" ><p className="mr-1">{idx+ 1}.</p> </div>
                      <div className="flex mb-7" ><p className="mr-1">{"Benefit Name: " + " "}</p> <p>{e.benefitName}</p></div>
                      <div className="flex mb-7" ><p className="mr-1">{"Insurance Amount: "}</p> <p>{e.insuranceAmount} {e.unit} </p></div>
                    </div>
                    )
                    :
                    values[index].map((e)=><p key={e}>-     {e}</p>)
                    : 
                    values[index]
                    :
                    "Empty"}
                  </p>
                </div>
                ))}
                
              </div>
            </div>
    )
}
export default EntityVerticalDisplay;