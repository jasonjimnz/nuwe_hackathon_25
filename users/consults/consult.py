import matplotlib.pyplot as plt
import networkx as nx
from neo4j import GraphDatabase

# Conexión a la base de datos
def create_graph():
    G = nx.Graph()

    with driver.session() as session:
        query = "MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 1000"
        result = session.run(query)
        
        for record in result:
            node1 = record["n"]
            relationship = record["r"]
            node2 = record["m"]
            G.add_node(str(node1.id), label=node1.labels, name=node1["name"])
            G.add_node(str(node2.id), label=node2.labels, name=node2["name"])
            G.add_edge(str(node1.id), str(node2.id), label=relationship.type)
    return G

def plot_graph(G):
    pos = nx.spring_layout(G, seed=42) 
    labels = nx.get_edge_attributes(G, 'label')

    plt.figure(figsize=(10, 10))
    nx.draw_networkx_nodes(G, pos, node_size=500, node_color='skyblue')
    nx.draw_networkx_labels(G, pos, font_size=12, font_weight='bold')
    nx.draw_networkx_edges(G, pos, width=2, alpha=0.7, edge_color='gray')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)

    plt.title("Red de Nodos y Relaciones")
    plt.axis('off')
    plt.show()

# Crear el grafo y mostrarlo
G = create_graph()
plot_graph(G)
