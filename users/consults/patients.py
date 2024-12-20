from neo4j import GraphDatabase
import pandas as pd

# Conexión a Neo4j
<<<<<<< HEAD
uri = "
username = 
password = 
=======
uri = "bolt://localhost:7687"
username = "neo4j"
password = "Neo4JPassword"
>>>>>>> f2379552ceb3fbeb7384fa4847eabca0e6a9f355
driver = GraphDatabase.driver(uri, auth=(username, password))
def fetch_patients():
    query = """
    MATCH (p:Patient)
    RETURN p.id AS ID, 
           p.name AS Name, 
           p.gender AS Gender, 
           p.age AS Age, 
           p.pathologies AS Pathologies, 
           p.notes AS Notes, 
           p.startDate AS StartDate, 
           p.tiempo AS DaysSinceStart,
           p.recovered
    """
    with driver.session() as session:
        result = session.run(query)
        rows = [record.data() for record in result]
        return pd.DataFrame(rows)
    
patients_df = fetch_patients()
print(patients_df)
patients_df.to_csv("patients_table.csv", index=False)
driver.close()
