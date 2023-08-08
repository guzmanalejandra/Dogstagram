import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';
import '../styles/RemoveGame.css'

export default function RemoveGame() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const driver = neo4j.driver("neo4j+s://984cd420.databases.neo4j.io", neo4j.auth.basic("neo4j", "74aMIfo1S-GhgLr70tS-0s01Db9-h161WGAwdxQTkMU"));

  const fetchGames = () => {
    const session = driver.session();
    const cypher = "MATCH (n:Juego) RETURN n";
  
    session.run(cypher)
      .then(result => {
        session.close();
        
        const gamesData = result.records.map(record => record.get('n').properties);
        setGames(gamesData);
      })
      .catch(error => {
        session.close();
        console.error(error);
      });
  };

  const deleteGame = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${selectedGame}?`)) {
      const session = driver.session();
      const cypher = `MATCH (n:Juego {Nombre: $nombre}) DELETE n`;
    
      session.run(cypher, {nombre: selectedGame})
        .then(() => {
          session.close();
          fetchGames();
        })
        .catch(error => {
          session.close();
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (event) => {
    setSelectedGame(event.target.value);
  };

  return (
    <div className='__component-card-container'>
      <div className='__form-container'>
        <select className='__game-select' value={selectedGame} onChange={handleChange}>
          <option value="">--Selecciona un juego--</option>
          {games.map((game, index) => <option key={index} value={game.Nombre}>{game.Nombre}</option>)}
        </select>
        <button className='__delete-button' onClick={deleteGame} disabled={!selectedGame}>Eliminar juego</button>
      </div>
    </div>
  );
}
