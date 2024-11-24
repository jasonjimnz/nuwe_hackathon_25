// Crear nodos para los patógenos (asegurarse de que son únicos) quedarían mejor con merge
CREATE (:Pathogen {id: 1, name: 'Pathogen A'}),
       (:Pathogen {id: 2, name: 'Pathogen B'}),
       (:Pathogen {id: 3, name: 'Pathogen C'}),
       (:Pathogen {id: 4, name: 'Pathogen D'}),
       (:Pathogen {id: 5, name: 'Pathogen E'});

//Relación
MATCH (p:Patient {id: 101}), (pathogen:Pathogen {name: 'Anxiety'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 102}), (pathogen:Pathogen {name: 'Depression'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 102}), (pathogen:Pathogen {name: 'Insomnia'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 103}), (pathogen:Pathogen {name: 'Bipolar Disorder'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 104}), (pathogen:Pathogen {name: 'PTSD'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 104}), (pathogen:Pathogen {name: 'Depression'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 105}), (pathogen:Pathogen {name: 'Anxiety'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 105}), (pathogen:Pathogen {name: 'Insomnia'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 106}), (pathogen:Pathogen {name: 'Anxiety'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 107}), (pathogen:Pathogen {name: 'Depression'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);

MATCH (p:Patient {id: 108}), (pathogen:Pathogen {name: 'Insomnia'})
CREATE (p)-[:HAS_PATHOGEN]->(pathogen);
