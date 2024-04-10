import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isDelSuccess) {
      navigate("/dash/users");
    }
  }, [isDelSuccess, navigate]);

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    const userData = { id: user.id, username, roles, active };
    if (password) userData.password = password;
    await updateUser(userData);
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const canSave = [username, roles.length].every(Boolean) && !isLoading;

  return (
    <div className="container mt-3">
      <h2>Edit User</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password (leave blank to keep unchanged)
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="active">
              Active
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roles" className="form-label">
            Roles
          </label>
          <select
            className="form-select"
            id="roles"
            multiple
            value={roles}
            onChange={(e) =>
              setRoles(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {Object.values(ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary me-2"
          onClick={onSaveUserClicked}
          disabled={!canSave}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        <button className="btn btn-danger" onClick={onDeleteUserClicked}>
          <FontAwesomeIcon icon={faTrashCan} /> Delete
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
