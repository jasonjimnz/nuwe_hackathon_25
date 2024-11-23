from neo4j import GraphDatabase

# Detalles de la conexión
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