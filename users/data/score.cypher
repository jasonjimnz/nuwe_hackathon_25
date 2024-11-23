//Primero necesitamos que todos los pacientes tengas un check de recuperado
MATCH (p:Patient)
SET p.recovered = false
RETURN p.id, p.name, p.recovered;
//De entrada todos los pacientes estan en tratamiento
MATCH (p:Patient)
WHERE p.id IN [105, 107]
SET p.recovered = true
RETURN p.id, p.name, p.recovered;

//Algoritmo en base a si se han recuperado(modelo)
MATCH (p:Patient)
WHERE p.tiempo <= 730 //Dos años
WITH p, 
     CASE WHEN p.recovered = true THEN 10 ELSE 0 END AS recovery_score,
     CASE WHEN 'Anxiety' IN p.pathologies THEN 5 ELSE 0 END AS pathology_score, //modificar patology
     1.0 / (1 + 730 - p.tiempo) AS time_score
SET p.score = 0.5 * time_score + 0.3 * pathology_score + 0.2 * recovery_score
RETURN p.name, p.score
ORDER BY p.score DESC
LIMIT 10;

/*Nos quedaremos con los más idoneos, cuántos más datos mejor*/