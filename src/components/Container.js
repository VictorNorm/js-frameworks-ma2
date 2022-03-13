import React from "react";
import "./GameContainer.css";

function Container(props) {
  return <div className="game-container">{props.children}</div>;
}

export default Container;
