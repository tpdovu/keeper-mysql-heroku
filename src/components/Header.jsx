import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const style = {
    textDecoration: "none",
  };
  return (
    <header>
      <nav>
        <Link to="/" style={style}>
          <h1>Keeper</h1>
        </Link>
        <ul className="nav-list">
          <Link to="/about" style={style}>
            <li>About</li>
          </Link>
          <Link to="/notes" style={style}>
            <li>Notes</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
