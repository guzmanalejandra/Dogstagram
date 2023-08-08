import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';
import '../styles/GameCard.css'

export default function GameCards() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const driver = neo4j.driver("neo4j+s://984cd420.databases.neo4j.io", neo4j.auth.basic("neo4j", "74aMIfo1S-GhgLr70tS-0s01Db9-h161WGAwdxQTkMU"));

  const fetchGames = () => {
    const session = driver.session();
    const cypher = "MATCH (n:Juego) RETURN n";
  
    session.run(cypher)
      .then(result => {
        session.close();
        
        const gamesData = result.records.map(record => record.get('n').properties);
        setGames(gamesData);
        setFilteredGames(gamesData);  // initialize filteredGames with all games
      })
      .catch(error => {
        session.close();
        console.error(error);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const applyFilters = () => {
    let newFilteredGames = games;

    if (nameFilter) {
      newFilteredGames = newFilteredGames.filter(game => typeof game.Nombre === 'string' && game.Nombre.toLowerCase().includes(nameFilter.toLowerCase()));
    }
    setFilteredGames(newFilteredGames);
  };

  return (
    <div className='component-card-container'>
      <div className='filter-container'>
        <input type="text" placeholder="Filtrar por nombre" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
        <button onClick={applyFilters}>Aplicar filtros</button>
      </div>
      {filteredGames.map((game, index) => {
        const { Nombre, Genero, para_mayores, FechaLanzamiento, precio } = game;
        const launchDate = FechaLanzamiento ? `${FechaLanzamiento.year}-${FechaLanzamiento.month}-${FechaLanzamiento.day}` : "Fecha de lanzamiento no disponible";

        return (
          <div key={index} className='card-container'>
            <div className="game-title">
              {Nombre}
            </div>
            <table className="data-table">
              <tbody>
                <tr>
                  <td className='data-header'>Género</td>
                  <td>{Genero}</td>
                </tr>
                <tr>
                  <td className='data-header'>Restricción</td>
                  <td>{para_mayores ? "Adults" : "All ages"}</td>
                </tr>
                <tr>
                  <td className='data-header'>Lanzamiento</td>
                  <td>{launchDate}</td>
                </tr>
                <tr>
                  <td className='data-header'>Precio</td>
                  <td>$ {typeof precio === 'number' ? precio.toFixed(2) : "Precio no disponible" }</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  );
  
}
