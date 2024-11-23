const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://neo4j:7687', neo4j.auth.basic('neo4j', 'password'));
const session = driver.session();

// Realizar una consulta a Neo4j
const result = await session.run('MATCH (p:Patient) RETURN p');
