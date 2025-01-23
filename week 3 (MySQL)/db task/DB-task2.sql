CREATE TABLE worker (
    WORKER_ID INT PRIMARY KEY,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    SALARY INT,
    JOINING_DATE DATETIME,
    DEPARTMENT VARCHAR(50)
);

CREATE TABLE title (
    WORKER_REF_ID INT,
    WORKER_TITLE VARCHAR(50),
    AFFECTED_FROM DATETIME,
    PRIMARY KEY (WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM)
);

CREATE TABLE bonus (
    WORKER_REF_ID INT,
    BONUS_DATE DATETIME,
    BONUS_AMOUNT INT,
    PRIMARY KEY (WORKER_REF_ID, BONUS_DATE, BONUS_AMOUNT)
);

INSERT INTO worker (WORKER_ID, FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT) VALUES
(1, 'Monika', 'Patel', 100000, '2014-02-20 09:00:00', 'HR'),
(2, 'Niharika', 'Verma', 80000, '2014-06-11 09:00:00', 'Admin'),
(3, 'Vishal', 'Singhal', 300000, '2014-02-20 09:00:00', 'HR'),
(4, 'Amitabh', 'Singh', 500000, '2014-02-20 09:00:00', 'Admin'),
(5, 'Vivek', 'Bhatti', 500000, '2014-06-11 09:00:00', 'Admin'),
(6, 'Vipul', 'Diwan', 200000, '2014-06-11 09:00:00', 'Account'),
(7, 'Satish', 'Kumar', 75000, '2014-01-20 09:00:00', 'Account'),
(8, 'Geetika', 'Chauhan', 90000, '2014-04-11 09:00:00', 'Admin');

INSERT INTO title (WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM) VALUES
(1, 'Manager', '2016-02-20 00:00:00'),
(2, 'Executive', '2016-06-11 00:00:00'),
(8, 'Executive', '2016-06-11 00:00:00'),
(5, 'Manager', '2016-06-11 00:00:00'),
(4, 'Asst. Manager', '2016-06-11 00:00:00'),
(7, 'Executive', '2016-06-11 00:00:00'),
(6, 'Lead', '2016-06-11 00:00:00'),
(3, 'Lead', '2016-06-11 00:00:00');

INSERT INTO bonus (WORKER_REF_ID, BONUS_DATE, BONUS_AMOUNT) VALUES
(1, '2016-02-20 00:00:00', 5000),
(2, '2016-06-11 00:00:00', 3000),
(3, '2016-02-20 00:00:00', 4000),
(1, '2016-02-20 00:00:00', 4500),
(2, '2016-06-11 00:00:00', 3500);



-- 1 Q-1. Write an SQL query to print the first three characters of  FIRST_NAME from Worker table.
select first_name, left(first_name,3) as fName_3 from worker;

-- 2 Q-2. Write an SQL query to show only odd rows from a table.

with countOdd as (
	select *,ROW_NUMBER() over () as row_num
    from worker
)
select * from countOdd where row_num % 2 = 1;

-- 3 Q-3. Write an SQL query to print details of the Workers whose FIRST_NAME ends with ‘h’ and contains six alphabets.

select * from worker where char_length(first_name) = 6 AND first_name like '%h';

-- 4 Q-4. Write an SQL query to fetch the count of employees working in the department ‘Admin’.

select department,count(worker_id) as total_emp_ADMIN from worker group by department having department = 'Admin';

-- 5 Q-5. Write an SQL query to print details of the Workers whose SALARY lies between 100000 and 500000.

select * from worker where salary BETWEEN 100000 AND 500000;

-- 6 Q-6. Write an SQL query to print details of the Workers who have joined in Feb’2014.

select * from worker where year(joining_date) = 2014 AND MONTH(joining_date) = 2;

-- 7 Q-7. Write an SQL query to fetch “FIRST_NAME” from Worker table in upper case.

select first_name, UCASE(first_name) as ucase_fName from worker;

-- 8 Q-8. Write an SQL query to fetch worker names with salaries >= 50000 and <= 100000.

select concat(first_name, ' ', last_name) as worker_name, salary from worker where salary>=50000 AND salary<=100000;

-- 9 Q-9. Write an SQL query to print details of the Workers who are also Managers.

select * from worker w join title t on w.worker_id = t.worker_ref_id where t.worker_title = 'Manager';

-- 10 Q-10. Write an SQL query to fetch unique values of DEPARTMENT from Worker table.

select distinct department from worker;

-- 11 Q-11. Write an SQL query to fetch the first 50% records from a table.

with workData as (
	select *, ROW_NUMBER() over () as row_num from worker
) select * from workData where row_num <= (select count(*) from worker) / 2;

-- 12 Q-12. Write an SQL query to print the FIRST_NAME from Worker table after removing white spaces from the right side.

select first_name, rtrim(first_name) as r_trimmed_fName from worker;

-- 13 Q-13. Write an SQL query to print the FIRST_NAME from Worker table after replacing ‘a’ with ‘A’.

select first_name, REPLACE(first_name, 'a','A') as modified_fName from worker;

-- 14 Q-14. Write an SQL query to print the FIRST_NAME and LAST_NAME from Worker table into a single column COMPLETE_NAME. A space char should separate them.

select first_name,last_name,concat(first_name, ' ', last_name) as complete_name from worker;

-- 15 Q-15. Write an SQL query to print all Worker details from the Worker table order by FIRST_NAME Ascending and DEPARTMENT Descending.

select * from worker order by first_name asc, department desc;
-- select * from worker order by first_name desc, department asc;

-- 16 Q-16. Write an SQL query to print details of workers excluding first names, “Vipul” and “Satish” from Worker table.

select * from worker where first_name NOT IN ('Vipul','Satish');

-- 17 Q-17. Write an SQL query to show the current date and time.

select current_date() as CurrentDate, current_time() as CurrentTime;

-- 18 Q-18. Write an SQL query to show the second highest salary from a table.

with maxSalaryRemovedData AS (
    select first_name, salary from worker where salary < (select MAX(salary) from worker)
)
select MAX(salary) AS secondHighest from maxSalaryRemovedData;

-- 19 Q-19. Write an SQL query to show one row twice in results from a table.

select * from worker UNION ALL select * from worker order by WORKER_ID;
select * from worker where worker_id = 1 UNION ALL select * from worker order by WORKER_ID;

-- 20 Q-20. Write an SQL query to fetch intersecting records of two tables.

select worker_id, first_name, last_name, salary, joining_date, department, worker_title 
from worker join title on worker_id = worker_ref_id;

select t.worker_ref_id, t.worker_title, b.bonus_date, b.bonus_amount from title t join bonus b on t.worker_ref_id = b.worker_ref_id;

select worker_id, first_name, last_name, salary, joining_date, department, bonus_amount, bonus_date 
from worker join bonus on worker_id = worker_ref_id;
