import { useEffect, useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Select",
  });

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${serverEndpoint}/users/`, {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      setErrors({ message: "Unable to fetch users" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.role === "Select") {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ---------------- ADD / EDIT SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;

    try {
      setActionLoading(true);

      if (editingUserId) {
        // -------- EDIT USER --------
        const res = await axios.put(
          `${serverEndpoint}/users/${editingUserId}`,
          formData,
          { withCredentials: true }
        );

        setUsers(
          users.map((u) =>
            u._id === editingUserId ? res.data.user : u
          )
        );

        setMessage("User updated successfully!");
      } else {
        // -------- ADD USER --------
        const res = await axios.post(
          `${serverEndpoint}/users/`,
          formData,
          { withCredentials: true }
        );

        setUsers([...users, res.data.user]);
        setMessage("User added successfully!");
      }

      resetForm();
    } catch (err) {
      setErrors({ message: "Action failed. Please try again." });
    } finally {
      setActionLoading(false);
    }
  };

  //  EDIT USER 
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  //  DELETE USER 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${serverEndpoint}/users/${id}`, {
        withCredentials: true,
      });

      setUsers(users.filter((u) => u._id !== id));
      setMessage("User deleted successfully!");
    } catch (err) {
      setErrors({ message: "Unable to delete user" });
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "Select" });
    setEditingUserId(null);
    setErrors({});
  };

  // LOADING 
  if (loading) {
    return (
      <div className="container p-5 text-center">
        <div className="spinner-border"></div>
      </div>
    );
  }

  // ---------------- UI 
  return (
    <div className="container py-5">
      {errors.message && (
        <div className="alert alert-danger">{errors.message}</div>
      )}
      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      <div className="row">
        {/* -------- FORM -------- */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h5>{editingUserId ? "Edit User" : "Add User"}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-2"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <select
                  className="form-select mb-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Select">Select Role</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>

                <button
                  className="btn btn-primary w-100"
                  disabled={actionLoading}
                >
                  {editingUserId ? "Update" : "Add"}
                </button>

                {editingUserId && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* -------- TABLE -------- */}
        <div className="col-md-9">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No users found
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
