import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = pathname !== "/dash" && (
    <button
      className="btn btn-secondary icon-button" // Adjusted to use Bootstrap button classes
      title="Home"
      onClick={onGoHomeClicked}
    >
      <FontAwesomeIcon icon={faHouse} />
    </button>
  );

  return (
    <footer className="text-center p-3"> {/* Adjusted for Bootstrap styling */}
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-auto">{goHomeButton}</div>
          <div className="col-auto">
            <p className="mb-0">Current User: {username} - Status: {status}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;
