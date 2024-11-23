//tenemos que añadir el tiempo en cada paciente
MATCH (p:Patient {id: 101})
SET p.startDate = date('2024-11-01')
RETURN p;
MATCH (p:Patient {id: 102})
SET p.startDate = date('2024-01-10')
RETURN p;
MATCH (p:Patient {id: 103})
SET p.startDate = date('2024-11-01')
RETURN p;
MATCH (p:Patient {id: 104})
SET p.startDate = date('2023-09-01')
RETURN p;
MATCH (p:Patient {id: 105})
SET p.startDate = date('2023-06-01')
RETURN p;
MATCH (p:Patient {id: 106})
SET p.startDate = date('2024-02-25')
RETURN p;
MATCH (p:Patient {id: 107})
SET p.startDate = date('2023-05-29')
RETURN p;
MATCH (p:Patient {id: 108})
SET p.startDate = date('2023-11-23')
RETURN p;

//Añadimos  time
MATCH (p:Patient)
WITH p, 
     duration.between(p.startDate, date()) AS dur
SET p.tiempo = dur.days + dur.months * 30 
RETURN p.id, p.name, p.startDate, p.tiempo;