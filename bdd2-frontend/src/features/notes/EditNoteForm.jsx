import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  const onSaveNoteClicked = async () => {
    if (!isLoading) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => await deleteNote({ id: note.id });

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const errorMessage =
    isError || isDelError
      ? error?.data?.message || delError?.data?.message
      : "";

  return (
    <div className="container my-3">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="note-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${!title && "is-invalid"}`}
            id="note-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note-text" className="form-label">
            Text
          </label>
          <textarea
            className={`form-control ${!text && "is-invalid"}`}
            id="note-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="note-completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="note-completed">
            Completed
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="note-username" className="form-label">
            Assigned To
          </label>
          <select
            className="form-select"
            id="note-username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            {options}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={onSaveNoteClicked}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        {isManager ||
          (isAdmin && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Delete
            </button>
          ))}
      </form>
    </div>
  );
};

export default EditNoteForm;
