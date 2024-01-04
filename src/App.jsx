import { useEffect, useState } from "react";
import "./App.css";
import axios, { Axios } from "axios";
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const favPoke = ()=>{
    setFav((oldState) => [...oldState, poke]);
  }

  console.log(fav);

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
        <div>
          <p style={{ color: "red" }}>Create by Book_cnk_ for practice -_-</p>
          <h2>{poke?.name}</h2>
          <button onClick={favPoke}>add to favourite</button>
          <img
            src={poke?.sprites?.other?.home.front_default}
            alt={poke?.name}
          />
          <ul>
            {poke?.abilities?.map((abil, index) => (
              <li key={index}>{abil.ability.name}</li>
            ))}
          </ul>
          <button onClick={prevPoke}>Previous</button>
          <button onClick={nextPoke}>Next</button>
        </div>
        <div>
          <h2>Favorite Poke</h2>
          <FavPoke fav={fav} />
        </div>
      </div>
    </div>
  );
}

export default App;
