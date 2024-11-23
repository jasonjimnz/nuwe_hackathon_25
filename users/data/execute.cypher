MATCH (p:Patient)
WITH p, 
     duration.between(p.startDate, date()) AS dur
SET p.tiempo = dur.days + dur.months * 30 
RETURN p.id, p.name, p.startDate, p.tiempo;
