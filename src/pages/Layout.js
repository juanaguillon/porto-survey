import React from "react";
import {Link} from 'react-router-dom';

function Layout(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          Porto Survey
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/protected" className="nav-link">
                Protected
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">{props.children}</div>
    </React.Fragment>
  );
}

export default Layout;
