import axios from "axios";
import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";

function CreateGroupModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      isValid = false;
    }

    if (formData.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /* ================= INPUT CHANGE ================= */
  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post(
        `${serverEndpoint}/groups/create`,
        {
          name: formData.name,
          description: formData.description,
        },
        { withCredentials: true }
      );

      // reset form
      setFormData({ name: "", description: "" });
      setErrors({});

      // close modal
      onHide();
    } catch (error) {
      console.log(error);
      setErrors({
        message: "Unable to add group, please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  /* ================= UI ================= */
  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            {/* HEADER */}
            <div className="modal-header border-0">
              <h5 className="modal-title">Create Group</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              {/* GLOBAL ERROR */}
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}

              {/* NAME */}
              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className={
                    errors.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  className={
                    errors.description
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-light rounded-pill"
                onClick={onHide}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;
