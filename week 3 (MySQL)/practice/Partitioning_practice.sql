CREATE TABLE playerData (
    playerName VARCHAR(10),
    stadiumName VARCHAR(15),
    year INT,
    runs INT,
    country VARCHAR(5)
);

INSERT INTO playerData (playerName, stadiumName, year, runs, country) VALUES
('P1', 'Eden Gardens', 2018, 421, 'India'),
('P1', 'Wankhede', 2018, 450, 'India'),
('P2', 'Eden Gardens', 2018, 360, 'India'),
('P3', 'Eden Gardens', 2018, 393, 'Eng'),
('P3', 'Wankhede', 2018, 324, 'Eng'),
('P5', 'Wankhede', 2018, 311, 'India'),
('P5', 'Eden Gardens', 2018, 349, 'NZ'),
('P9', 'Wankhede', 2018, 229, 'NZ'),
('P1', 'Eden Gardens', 2019, 469, 'India'),
('P4', 'Wankhede', 2019, 412, 'India'),
('P2', 'Eden Gardens', 2019, 89, 'India'),
('P3', 'Eden Gardens', 2019, 471, 'Eng'),
('P7', 'Wankhede', 2019, 128, 'Eng'),
('P5', 'Wankhede', 2019, 234, 'India'),
('P9', 'Eden Gardens', 2019, 471, 'NZ'),
('P9', 'Wankhede', 2019, 464, 'NZ'),
('P7', 'Eden Gardens', 2021, 356, 'India'),
('P2', 'Wankhede', 2021, 88, 'India'),
('P2', 'Eden Gardens', 2021, 463, 'India'),
('P3', 'Eden Gardens', 2021, 273, 'Eng'),
('P7', 'Wankhede', 2021, 112, 'Eng'),
('P5', 'Wankhede', 2021, 292, 'India'),
('P8', 'Eden Gardens', 2021, 154, 'NZ'),
('P8', 'Wankhede', 2021, 389, 'NZ');

-- filter indians
-- apply rank partiton by ground, year
-- apply rank partition by ground
-- using first value top run scorer in ground/year
-- get diff between top scorer and player
-- last run scorer partition by ground year

SELECT * FROM playerdata where country = 'India';

SELECT *, RANK() OVER (PARTITION BY stadiumName ORDER BY runs DESC) AS rank_by_ground
FROM playerData;

SELECT *, rank() over (PARTITION BY stadiumName, playerdata.year ORDER BY runs DESC) AS rank_by_ground_year
from playerData;

WITH RankedData AS (
    SELECT playerName, stadiumName, year, runs, country,
           FIRST_VALUE(runs) OVER (PARTITION BY stadiumName, year ORDER BY runs DESC) AS top_scorer_runs
    FROM playerData
)
SELECT *, 
       (top_scorer_runs - runs) AS run_difference
FROM RankedData
ORDER BY playerName, stadiumName DESC;


SELECT playerName, stadiumName, year, runs, country,
	FIRST_VALUE(runs) OVER (PARTITION BY stadiumName, year ORDER BY runs DESC) AS top_scorer_runs
FROM playerData;
-- gives the data of players and in the top_scorer col. it enters the first value of run in pratioined by condition.alter

WITH RankedData AS (
    SELECT playerName, stadiumName, year, runs, country,
           LAST_VALUE(runs) OVER (PARTITION BY stadiumName, year ORDER BY runs ASC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_scorer_runs
    FROM playerData
)
SELECT *
FROM RankedData 
WHERE runs = last_scorer_runs
ORDER BY playerName,stadiumName, year;

-- without range of unbounded preceding and following, it is returning all the player's last run in all year separately.
WITH RankedData AS (
    SELECT playerName, stadiumName, year, runs, country,
           LAST_VALUE(runs) OVER (PARTITION BY stadiumName, year ORDER BY runs ASC) AS last_scorer_runs
    FROM playerData
)
SELECT *
FROM RankedData 
WHERE runs = last_scorer_runs
ORDER BY playerName,stadiumName, year;






