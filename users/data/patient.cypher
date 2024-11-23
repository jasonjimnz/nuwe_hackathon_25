CREATE (admin:Admin {
  id: 1001,
  name: 'Administrador General',
  role: 'Admin'
});

//Specialist
CREATE (s1:Specialist {id: 1, name: 'Dr. Juan Pérez', specialty: 'Psychologist'}),
       (s2:Specialist {id: 2, name: 'Dra. Ana Gómez', specialty: 'Psychiatrist'});

//Patient
CREATE 
  (p1:Patient {
    id: 101, 
    name: 'Carlos López', 
    gender: 'Male',
    age: 24,
    pathologies: ['Anxiety'], 
    notes: 'Primera sesión.', 
    lastVisit: date('2024-11-10')
  }),
  (p2:Patient {
    id: 102, 
    name: 'María Ruiz', 
    gender: 'Female', 
    age: 28, 
    pathologies: ['Depression', 'Insomnia'], 
    notes: 'Tratamiento ajustado.', 
    lastVisit: date('2024-11-15')
  }),
  (p3:Patient {
    id: 103, 
    name: 'Luis Fernández', 
    gender: 'Male', 
    age: 22,
    pathologies: ['Bipolar Disorder'], 
    notes: 'Consulta inicial.', 
    lastVisit: date('2024-11-20')
  }),
  (p4:Patient {
    id: 104, 
    name: 'Sofía Martínez', 
    gender: 'Female', 
    age: 30,
    pathologies: ['PTSD', 'Depression'], 
    notes: 'Progreso lento, necesita seguimiento.', 
    lastVisit: date('2024-11-18')
  }),
  (p5:Patient {
    id: 105, 
    name: 'Andrés Gómez', 
    gender: 'Male', 
    age: 36,
    pathologies: ['Anxiety', 'Insomnia'], 
    notes: 'Sesión exitosa.', 
    lastVisit: date('2024-11-22')
  }),
  (p6:Patient {
    id: 106, 
    name: 'Laura Gómez', 
    gender: 'Female',
    age: 30,
    pathologies: ['Anxiety'], 
    notes: 'Derivar a psiquiatra', 
    lastVisit: date('2024-11-23')
  }),
  (p7:Patient {
    id: 107, 
    name: 'Ricardo Gutiérrez', 
    gender: 'Male', 
    age: 30,
    pathologies: ['Depression'], 
    notes: 'Sesión exitosa.', 
    lastVisit: date('2024-11-17')
  }),
  (p8:Patient {
    id: 108, 
    name: 'Alejandra García', 
    gender: 'Female', 
    age: 26,
    pathologies: ['Insomnia'], 
    notes: 'Progreso lento, necesita seguimiento', 
    lastVisit: date('2024-11-20')
  });

//Permissions
MATCH (admin:Admin {id: 1}), (p:Patient)
CREATE (admin)-[:CAN_MODIFY]->(p);
MATCH (admin:Admin {id: 1}), (p:Specialist)
CREATE (admin)-[:CAN_MODIFY]->(p);

//Match with Psicology
MATCH (p1:Patient {id: 101}), (s1:Specialist {id: 1})
CREATE (p1)-[:TREATED_BY]->(s1);
MATCH (p5:Patient {id: 105}), (s1:Specialist {id: 1})
CREATE (p5)-[:TREATED_BY]->(s1);
MATCH (p6:Patient {id: 106}), (s1:Specialist {id: 1})
CREATE (p6)-[:TREATED_BY]->(s1);
MATCH (p8:Patient {id: 108}), (s1:Specialist {id: 1})
CREATE (p8)-[:TREATED_BY]->(s1);

//Match with Psichiartrist
MATCH (p4:Patient {id: 104}), (s2:Specialist {id: 2})
CREATE (p4)-[:TREATED_BY]->(s2);
MATCH (p2:Patient {id: 102}), (s2:Specialist {id: 2})
CREATE (p2)-[:TREATED_BY]->(s2);
MATCH (p3:Patient {id: 103}), (s2:Specialist {id: 2})
CREATE (p3)-[:TREATED_BY]->(s2);
MATCH (p7:Patient {id: 107}), (s2:Specialist {id: 2})
CREATE (p7)-[:TREATED_BY]->(s2);