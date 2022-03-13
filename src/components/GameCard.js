import React from "react";
import "./GameCard.css";
import { PropTypes } from "prop-types";

function GameCard(props) {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={props.image} alt="Corresponding game"></img>
      </div>
      <h3>{props.title}</h3>
    </div>
  );
}

GameCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};
export default GameCard;
