import axios from "axios";
import { useEffect, useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  /* ================= FETCH GROUPS ================= */
  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${serverEndpoint}/groups/my-groups`,
        { withCredentials: true }
      );
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="container p-5 text-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="container p-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Your Groups</h2>
          <p className="text-muted">
            Manage your shared expenses and split expenses
          </p>
        </div>

        <button
          className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
          onClick={() => setShowCreateModal(true)}
        >
          Create Group
        </button>
      </div>

      {/* EMPTY STATE */}
      {groups.length === 0 && (
        <div className="text-center">
          <p>No groups found, Start by creating one!</p>
        </div>
      )}

      {/* GROUP LIST */}
      {groups.length > 0 && (
        <div className="row g-4">
          {groups.map((group) => (
            <div className="col-md-6 col-lg-4" key={group._id}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      )}

      {/* CREATE GROUP MODAL */}
      <CreateGroupModal
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
          fetchGroups(); // 🔥 refresh groups after create
        }}
      />
    </div>
  );
}

export default Groups;
