import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  useTitle(`Notes: ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    hourCycle: "h23",
  }).format(date);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <main className="text-center p-4">
        <p className="fst-italic">{today}</p>
        <h2>Welcome, {username}!</h2>
        <div className="my-3">
          <Link className="btn btn-primary m-2" to="/dash/notes">
            View Notes
          </Link>
          <Link className="btn btn-primary m-2" to="/dash/notes/new">
            Add New Note
          </Link>
          {isManager ||
            (isAdmin && (
              <>
                <Link className="btn btn-secondary m-2" to="/dash/users">
                  View User Settings
                </Link>
                <Link className="btn btn-secondary m-2" to="/dash/users/new">
                  Add New User
                </Link>
              </>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Welcome;
