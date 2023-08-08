import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';
import GameCard from './GameCard';

const Neo4jComponent = ({ query }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const uri = 'neo4j+s://984cd420.databases.neo4j.io';
    const user = 'neo4j'; 
    const password = '74aMIfo1S-GhgLr70tS-0s01Db9-h161WGAwdxQTkMU';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();

    session
      .run(query)
      .then(result => {
        const resultsArray = result.records.map(record => record.get('n').properties);
        setResults(resultsArray);
        session.close();
        driver.close();
      })
      .catch(error => {
        console.error('Error executing Cypher query', error);
        session.close();
        driver.close();
      });

    // Cleanup: cerrar la sesión y el driver al desmontar el componente
    return () => {
      session.close();
      driver.close();
    };
  }, [query]);

  return (
    <div>
      {results.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </div>
  );
};

export default Neo4jComponent;
