import { useState } from "react";

function GroupCard({ group}) {
    const [showMenbers,setShowMembers]=useState(false);
const handleShowMember = ()=>{
    setShowMembers(!showMenbers);
}

 return (   
<div className="card h-100 border-0 shadow-sm rounded-4 position-relative">
    <div className="card-body p-4">
        <div>
            <h5 className="">{group.name}</h5>
            <button className="btn-sm btn-link p-0 text-primary">

                {group.membersEmail.length} Member | Show Members
            </button>
        </div>
        <p>{group.description}</p>
        {showMembers && (
            <div className="rounded-3 p-3 mb-3 border">
<h6>Members in the Group    </h6>
{group.membersEmail.map((email,index)=>(
    <div key={index+1}.{member}</div>
        )}
    </div>
</div>
}
export default GroupCard;