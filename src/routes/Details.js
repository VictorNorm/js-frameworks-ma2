import "../components/Details.css";
import Nav from "../components/Nav";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { url, key } from "../constants/api";
import { removeTags } from "../functions/stringReplacer";

function Details() {
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate("/");
  }
  const api = url + "/" + id + `?key=` + key;
  console.log(api);

  useEffect(
    function () {
      async function fetchGame() {
        try {
          const response = await fetch(api);
          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setGame(json);
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchGame();
    },
    [api]
  );

  return (
    <div>
      <Nav />
      <Container>
        <Heading title={game.name} />
        <div className="details-container">
          <div className="image-container">
            <img src={game.background_image} alt="game"></img>
          </div>
          <div className="details-container__text">
            <h2>{game.name}</h2>
            <p>{removeTags(game.description)}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Details;
