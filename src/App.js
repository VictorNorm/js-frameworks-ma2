import "./App.css";
// import { Link, Outlet } from "react-router-dom";
import Heading from "./components/Heading.js";
import Nav from "./components/Nav";
import { useState } from "react";
import { useEffect } from "react";
import { url, key } from "./constants/api";
import GameCard from "./components/GameCard";
import Container from "./components/Container";
import { Link } from "react-router-dom";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchGames() {
      try {
        const response = await fetch(
          url + `?key=` + key + `&dates=2022-01-01,2022-03-12&page_size=10`
        );
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setGames(json.results);
        } else {
          setError("Gad danged errors...");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <div>Error...</div>;
      }
    }
    fetchGames();
  }, []);
  return (
    <div className="App">
      <Nav />
      <Container>
        <Heading title="Wow so many games" />
      </Container>
      <Container>
        {games.map(function (game) {
          return (
            <Link to={`/details/${game.id}`} key={game.id}>
              <GameCard image={game.background_image} title={game.name} />
            </Link>
          );
        })}
      </Container>
    </div>
  );
}

export default App;
