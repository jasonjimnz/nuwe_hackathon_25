from typing import Union

from neo4j import GraphDatabase, basic_auth, Driver, Session, Result
from django.conf import settings

class Neo4JHandler:
    driver: Driver

    def __init__(self, host: str, port: Union[str, int], user: str, password: str):
        self.driver = GraphDatabase.driver(
            f"bolt://{host}:{port}",
            auth=basic_auth(
                user=user,
                password=password
            )
        )

    def get_session(self, driver: Driver = None) -> Session:
        if driver:
            return driver.session()
        return self.driver.session()



def get_neo4j_handler() -> Neo4JHandler:
    handler = Neo4JHandler(
        settings.NEO4J_CONFIG['host'],
        settings.NEO4J_CONFIG['port'],
        settings.NEO4J_CONFIG['user'],
        settings.NEO4J_CONFIG['password']
    )
    return handler
