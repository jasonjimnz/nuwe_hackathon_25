from neo4j import GraphDatabase

# Detalles de la conexión
uri = "bolt://164.132.56.231:7687"
username = "neo4j"
password = "p3o7oSMXmJNJLt9XqCurAviX"
driver = GraphDatabase.driver(uri, auth=(username, password))

def execute_query_from_file(file_path):
    with driver.session() as session:
        with open(file_path, 'r') as file:
            query = file.read()
        result = session.run(query)
        for record in result:
            print(record)


# Ejecutar la consulta
execute_query_from_file('execute.cypher')