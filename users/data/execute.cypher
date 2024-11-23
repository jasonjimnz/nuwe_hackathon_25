MATCH (p:Patient)
WHERE p.tiempo <= 730  // Dos años
WITH p, 
     CASE WHEN p.recovered = true THEN 10 ELSE 0 END AS recovery_score,
     CASE WHEN 'Insomnia' IN p.pathologies THEN 10 ELSE 0 END AS pathology_score,
     1.0 / (1 + 730 - p.tiempo) AS time_score
SET p.score = 0.4 * time_score + 0.4 * pathology_score + 0.2 * recovery_score
RETURN p.name AS name, p.score AS score
ORDER BY p.score DESC
LIMIT 5;