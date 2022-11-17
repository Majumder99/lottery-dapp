import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div>
      <button
        style={{
          border: "1px solid black",
          padding: "2rem",
          marginRight: "20px",
          cursor: "pointer",
        }}
      >
        <Link to="/manager">Manager</Link>
      </button>
      <button
        style={{
          border: "1px solid black",
          padding: "2rem",
          marginRight: "20px",
          cursor: "pointer",
        }}
      >
        <Link to="/players">Players</Link>
      </button>
    </div>
  );
};

export default Intro;
