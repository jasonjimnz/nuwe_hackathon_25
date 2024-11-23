import datetime

from .graph_utils import get_neo4j_handler


def add_user_word_token(user_id: str, word: str, lemma: str, text: str) -> None:
    handler = get_neo4j_handler()
    now = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    text = text.replace('"', '')
    queries = [
        f'MERGE (u:BackendUser {{ user_id: "{user_id}" }}) RETURN u',
        f'MERGE (w:Word {{ word:"{word}", lemma:"{lemma}" }}) RETURN w',
        f'MERGE (t:TextNode {{ text: "{text}"}}) RETURN t',
        f'MATCH (u:BackendUser), (w:Word) WHERE u.user_id = "{user_id}" AND w.word = "{word}" AND w.lemma = "{lemma}" WITH u,w MERGE (w)-[:TOKEN_CREATED_BY {{ created_at: datetime("{now}") }}]->(u)  RETURN u',
        f'MATCH (w:BackendUser), (t:TextNode) WHERE  w.word = "{word}" AND w.lemma = "{lemma}" AND t.text = "{text}"MERGE (w)-[:BELONGS_TO]->(t)  RETURN w'
    ]
    with handler.driver.session() as session:
        for query in queries:
            session.run(query)