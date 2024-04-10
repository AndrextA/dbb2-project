import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DarkMode from "./DarkMode";

function Navbar() {
  const location = useLocation();

  return (
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">BD II Project</a>
        <div class="d-flex">
          <DarkMode />
          {location.pathname !== "/login" && (
            <Button className="" as={Link} to="/login" variant="primary">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
