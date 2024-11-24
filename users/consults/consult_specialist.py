from neo4j import GraphDatabase

# Configuración de conexión

def get_specialists():
    query = "MATCH (s:Specialist) RETURN s.id AS id, s.name AS name, s.specialty AS specialty"
    with driver.session() as session:
        result = session.run(query)
        for record in result:
            print(f"ID: {record['id']}, Name: {record['name']}, Specialty: {record['specialty']}")

get_specialists()
driver.close()
