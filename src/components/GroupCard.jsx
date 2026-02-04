import { useState } from "react";

function GroupCard({ group}) {
    const [showMenbers,setShowMembers]=useState(false);
<div className="card h-100 border-0 shadow-sm rounded-4 position-relative">
    <div className="card-body p-4">
        <div>
            <h5 className="">{group.name}</h5>
            <button className="btn-sm btn-link p-0 text-primary">

                {group.membersEmail.length} Member | Show Members
            </button>
        </div>
    </div>
</div>
}
export default GroupCard;