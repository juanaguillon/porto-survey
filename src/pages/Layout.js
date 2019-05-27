import React from "react";
import { Link, withRouter } from "react-router-dom";

function Layout(props) {
  return (
    <React.Fragment>
      {props.location.pathname !== "/create" ? (
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
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    props.location.pathname === "/"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Encuesta
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/questions"
                  className={
                    props.location.pathname === "/questions"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Base de Datos
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        ""
      )}
      <div
        className={
          props.location.pathname === "/create"
            ? "bg_porto root_container"
            : "root_container"
        }
      >
        <div className="container">{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Layout);
