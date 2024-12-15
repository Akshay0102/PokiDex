import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Id from './Id';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function fetchPokemon() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(res => res.json())
        .then(allpokemon => {
          const pokemonDetailsPromises = allpokemon.results.map(pokemon => 
            fetch(pokemon.url)
              .then(res => res.json())
          );

          return Promise.all(pokemonDetailsPromises);
        })
        .then(pokemonData => {
          setPokemonList(pokemonData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching Pokémon data:', error);
          setLoading(false);
        });
    }

    fetchPokemon();
  }, []);

  function handleClick(pokemonId) {
    navigate(`/pokemon/${pokemonId}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className='text-emerald-800'>Pokédex</h1>
      </header>
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <div 
            key={pokemon.id} 
            className="pokemon-card" 
            onClick={() => handleClick(pokemon.id)}
          >
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon/:id" element={<Id />} />
      </Routes>
    </Router>
  );
}
