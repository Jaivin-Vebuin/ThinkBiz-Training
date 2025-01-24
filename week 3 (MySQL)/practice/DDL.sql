-- create database
create database tbztemp;

-- show the available dbs;
show databases;

-- use the database as default / select the database;
use tbztemp;

-- displays the tables
show tables;

-- create the table
CREATE TABLE t1(
	id int NOT NULL UNIQUE,
    name varchar(50) NOT NULL,
    age int CHECK(age>=15),
    gender varchar(1) NOT NULL,
    phone varchar(10) NOT NULL UNIQUE,
    dept varchar(10) NOT NULL,
    salary int
);

-- empty data
SELECT * FROM t1;

truncate table t1;

-- insert the data
INSERT INTO t1(id, name, age, gender, phone, dept, salary)
	VALUES(1, 'Jaivin Savaliya', 20, 'M', '7874322731','MERN',9700), 
		  (2, 'Man Mendapara', 21, 'M', '7896541230','MERN',10000),
          (3, 'Dishant Chauhan', 18, 'M', '9632587410','MERN',9600), -- missed to enter age // error
          (4, 'Anurag Dalsaniya', 21, 'M', '3698521470','MERN',10000),
          (5, 'Hetvi Godhani', 20, 'F', '9514786320','MERN',9700),
          (6, 'Keyur Parsuriys', 22, 'M', '7536984120','MERN',9800),
          (7, 'Tanvi Bhatt', 19, 'F', '4532147897','AIML',9500),
          (8, 'Khushi Goriya', 22, 'F', '7852365452','AIML',9800);

commit;

SELECT * from t1;

-- use of update
UPDATE t1 SET name = 'Keyur Pansuriya' where id = 6;

-- use of delete
DELETE from t1 where dept = 'AIML';

-- use of where with selected cols using condition
select id,name,phone from t1 where age>20;

-- alias using 'as' =>
select id as srNo, name, phone as mobile from t1;

-- distinct =>
select distinct dept from t1;

--  group by and having =>
select dept, COUNT(id) as employee_count from t1 group by dept;
select dept, AVG(salary) as average_salary from t1 group by dept;
select dept, SUM(salary) as total_salary from t1 group by dept having SUM(salary) > 50000;

-- switch case like structure =>
SELECT CASE
	   WHEN age BETWEEN 18 AND 20 THEN '18-20'
	   WHEN age BETWEEN 21 AND 23 THEN '21-23'
	   ELSE '24 and above'
       END as age_group, COUNT(id) as employee_count
FROM t1
GROUP BY age_group;

rollback;

set autocommit = 0;
-- 


