import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function Id() {
  const { id } = useParams(); // Get the ID from the URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchPokemon() {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
          setPokemon(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching Pokémon data:', error);
          setLoading(false);
        });
    }

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className='text-emerald-800'>Pokémon Details</h1>
      </header>
      <div className="pokemon-card">
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      </div>
    </div>
  );
}

export default Id;
