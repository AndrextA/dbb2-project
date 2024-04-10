import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import useTitle from "../../hooks/useTitle";

const NewUserForm = () => {
  useTitle("Notes: New User");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) =>
    setRoles(Array.from(e.target.selectedOptions, (option) => option.value));

  const canSave =
    [username, password, roles.length].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  return (
    <div className="container my-3">
      {isError && (
        <div className="alert alert-danger">{error?.data?.message}</div>
      )}
      <form onSubmit={onSaveUserClicked}>
        <h2>New User</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${isError ? "is-invalid" : ""}`}
            id="username"
            value={username}
            onChange={onUsernameChanged}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={onPasswordChanged}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roles" className="form-label">
            Assigned Roles
          </label>
          <select
            id="roles"
            className="form-select"
            multiple
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {Object.values(ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={!canSave}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
