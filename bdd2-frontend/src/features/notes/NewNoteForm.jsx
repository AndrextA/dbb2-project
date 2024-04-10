import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if ([title, text, userId].every(Boolean) && !isLoading) {
      await addNewNote({ user: userId, title, text });
    }
  };

  return (
    <div className="container my-3">
      {isError && (
        <div className="alert alert-danger">{error?.data?.message}</div>
      )}
      <form>
        <h2 className="mb-4">New Note</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <textarea
            className="form-control"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Assigned To
          </label>
          <select
            className="form-select"
            id="username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSaveNoteClicked}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </form>
    </div>
  );
};

export default NewNoteForm;
