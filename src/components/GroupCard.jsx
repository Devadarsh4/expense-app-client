import { useState } from "react";

function GroupCard({ group }) {
  const [showMembers, setShowMembers] = useState(false);

  const handleShowMember = () => {
    setShowMembers(!showMembers);
  };

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 position-relative">
      <div className="card-body p-4">
        {/* GROUP NAME + TOGGLE */}
        <div className="mb-2">
          <h5 className="mb-1">{group.name}</h5>

          <button
            className="btn btn-sm btn-link p-0"
            onClick={handleShowMember}
          >
            {group.membersEmail.length} Members |{" "}
            {showMembers ? "Hide Members" : "Show Members"}
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-muted">{group.description}</p>

        {/* MEMBERS LIST */}
        {showMembers && (
          <div className="rounded-3 p-3 mt-3 border">
            <h6>Members in this Group</h6>

            {group.membersEmail.map((member, index) => (
              <div key={index}>
                {index + 1}. {member}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupCard;
