import axios from "axios";
import { useEffect, useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
  const [groups, setGroups] = useState([]); // ✅ array
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

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

  if (loading) {
    return (
      <div className="container p-5 text-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

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
          onClick={() => setShow(true)}
        >
          Create Group
        </button>
      </div>

      {/* EMPTY STATE */}
      {groups.length === 0 && (
        <p className="text-center">
          No groups found, Start by creating one!
        </p>
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
        show={show}
        onHide={(refresh) => {
          setShow(false);
          if (refresh) {
            fetchGroups(); // ✅ refresh after create
          }
        }}
      />
    </div>
  );
}

export default Groups;
