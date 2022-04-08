import React from "react";
import "bootstrap/js/dist/collapse";

import { Link, NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Library
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/books"
              >
                Books
              </NavLink>

              <NavLink className="nav-link" to="/books/registries">
                Registries
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;
