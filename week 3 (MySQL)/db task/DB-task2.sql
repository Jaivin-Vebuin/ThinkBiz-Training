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



-- 1
select first_name, left(first_name,3) as fName_3 from worker;

-- 2
with countOdd as (
	select *,ROW_NUMBER() over () as row_num
    from worker
)
select * from countOdd where row_num % 2 = 1;

-- 3
select * from worker where char_length(first_name) = 6 AND first_name like '%h';

-- 4
select department,count(worker_id) as total_emp_ADMIN from worker group by department having department = 'Admin';

-- 5
select * from worker where salary BETWEEN 100000 AND 500000;

-- 6
select * from worker where year(joining_date) = 2014 AND MONTH(joining_date) = 2;

-- 7
select first_name, UCASE(first_name) as ucase_fName from worker;

-- 8
select concat(first_name, ' ', last_name) as worker_name, salary from worker where salary>=50000 AND salary<=100000;

-- 9
select * from worker w join title t on w.worker_id = t.worker_ref_id where t.worker_title = 'Manager';

-- 10
select distinct department from worker;

-- 11
with workData as (
	select *, ROW_NUMBER() over () as row_num from worker
) select * from workData where row_num <= (select count(*) from worker) / 2;

-- 12
select first_name, rtrim(first_name) as r_trimmed_fName from worker;

-- 13
select first_name, REPLACE(first_name, 'a','A') as modified_fName from worker;

-- 14
select first_name,last_name,concat(first_name, ' ', last_name) as complete_name from worker;

-- 15
select * from worker order by first_name asc, department desc;
-- select * from worker order by first_name desc, department asc;

-- 16
select * from worker where first_name NOT IN ('Vipul','Satish');

-- 17
select current_date() as CurrentDate, current_time() as CurrentTime;

-- 18
with maxSalaryRemovedData AS (
    select first_name, salary from worker where salary < (select MAX(salary) from worker)
)
select MAX(salary) AS secondHighest from maxSalaryRemovedData;

-- 19
select * from worker UNION ALL select * from worker order by WORKER_ID;
select * from worker where worker_id = 1 UNION ALL select * from worker order by WORKER_ID;

-- 20 
select worker_id, first_name, last_name, salary, joining_date, department, worker_title 
from worker join title on worker_id = worker_ref_id;

select t.worker_ref_id, t.worker_title, b.bonus_date, b.bonus_amount from title t join bonus b on t.worker_ref_id = b.worker_ref_id;

select worker_id, first_name, last_name, salary, joining_date, department, bonus_amount, bonus_date 
from worker join bonus on worker_id = worker_ref_id;
