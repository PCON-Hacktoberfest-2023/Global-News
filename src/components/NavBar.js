import React from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

const NavBar = () => {
  const { theme, handleClick } = React.useContext(ThemeContext);
  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-${theme} bg-${theme}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GlobalNews
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <img
          src={theme === "light" ? moon : sun}
          height={25}
          width={25}
          alt=""
          srcset=""
          onClick={handleClick}
          style={{ cursor: "pointer", margin: "0.5em" }}
        />
      </nav>
    </div>
  );
};

export default NavBar;
