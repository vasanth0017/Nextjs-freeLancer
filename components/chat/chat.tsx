
export default function Chat({serviceData}:any){
    const contractId = serviceData?.contracts?.[0]?.id
    const clientId = serviceData?.contracts?.[0]?.clientId
    const freelaunncerId = serviceData?.contracts?.[0]?.userId
    const freelancerSerciveId = serviceData?.id
    console.log("freelancerSerciveId",freelancerSerciveId)
    console.log("freelaunncerId",freelaunncerId)
    console.log("clientId",clientId)
    console.log("contractId",contractId)
    return(
        <h1>{serviceData.projectDescription}</h1>
    )
}