from neo4j import GraphDatabase

class Connection:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def run_query(self, query, parameters=None):
        with self.driver.session() as session:
            return session.run(query, parameters)


uri = "bolt://164.132.56.231:7687"
username = "neo4j"
password = "p3o7oSMXmJNJLt9XqCurAviX"
dv = Connection(uri, username, password)

#add_pathology(patient_id, pathology_name, recovered)
def get_recommendations(pathology_name):
    query = """
    MATCH (p:Patient)
    WHERE p.tiempo <= 730  // Dos años
    WITH p, 
         CASE WHEN p.recovered = true THEN 10 ELSE 0 END AS recovery_score,
         CASE WHEN $pathology_name IN p.pathologies THEN 10 ELSE 0 END AS pathology_score,
         1.0 / (1 + 730 - p.tiempo) AS time_score
    SET p.score = 0.4 * time_score + 0.4 * pathology_score + 0.2 * recovery_score
    RETURN p.name AS name, p.score AS score
    ORDER BY p.score DESC
    LIMIT 5
    """
    try:
        result = dv.run_query(query, {"pathology_name": pathology_name})
        pk = list(result)
        if pk:
            print("\nRecomendaciones basadas en la patología:")
            for record in pk:
                print(f"Paciente: {record['name']}, Puntaje: {record['score']}")
        else:
            print("No se encontraron pacientes con esa patología.")
    except Exception as e:
        print(f"Error al ejecutar la consulta: {e}")
get_recommendations('Insomnia') #no me sale la recomendación
#pathology_name = input("¿Cómo te sientes?\n") #Esto necesita ser optimizado, nos lo da el chatbot
#get_recommendations(pathology_name)
dv.close()