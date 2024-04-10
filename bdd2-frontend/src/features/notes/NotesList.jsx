import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const NotesList = () => {
  useTitle("Notes: Notes List");

  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <div className="d-flex justify-content-center">
        <PulseLoader color={"#FFF"} />
      </div>
    );

  if (isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error?.data?.message}
      </div>
    );
  }

  if (isSuccess) {
    const filteredIds =
      isManager || isAdmin
        ? notes.ids
        : notes.ids.filter(
            (noteId) => notes.entities[noteId].username === username
          );

    const tableContent = filteredIds.map((noteId) => (
      <Note key={noteId} noteId={noteId} />
    ));

    content = (
      <div className="table-responsive flex-grow-1">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
              <th scope="col">Title</th>
              <th scope="col">Owner</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default NotesList;
