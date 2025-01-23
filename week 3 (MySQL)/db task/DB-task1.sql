-- 1
select emp_name, street_address, city from employees where company_name = 'First Bank Corporation' AND salary > 10000;

-- 2 
select * from employees where dept_no = 30;

-- 3
select e.emp_name, e.dept_no, d.dept_name from employees e LEFT JOIN departments d ON e.dept_no = d.dept_no where e.job_title = 'Clerk';

-- 4
SELECT d.dept_no, d.dept_name, e.emp_name
FROM departments d
JOIN employees e ON d.dept_no = e.dept_no
WHERE d.dept_no > 20;

-- 5
select emp_id, emp_name, coalesce(commission, 6000), salary from employees where coalesce(commission,6000) > salary;

-- 6
SELECT 
    emp_id, 
    emp_name, 
    COALESCE(commission, 1000) AS commission, 
    ROUND(SUM((salary * 60) / 100), 2) AS salary_60 
FROM 
    employees 
GROUP BY 
    emp_id, emp_name, COALESCE(commission, 100)
HAVING 
    COALESCE(commission, 100) > ROUND(SUM((salary * 60) / 100), 2);
    
-- 7
SELECT emp_name, job_title, salary FROM employees WHERE dept_no = 20 AND salary>2000;

-- 8
SELECT emp_id,emp_name,job_title,dept_no,salary from employees where job_title = 'Salesman' AND dept_no = 30 AND salary>1500; 

-- 9
select * from employees where job_title IN ('Manager','President');

-- 10
select emp_id,emp_name,job_title,dept_no from employees where job_title = 'Manager' AND dept_no <> 30;

-- 11
select * from employees e join departments d on d.dept_no = e.dept_no where d.dept_no = 10 and e.job_title IN('Manager','Clerk');

select e.emp_id, e.emp_name, e.job_title, e.dept_no, d.dept_name
from employees e
join (SELECT dept_no, dept_name from departments where dept_no = 10) d
on e.dept_no = d.dept_no
where e.job_title IN ('Manager', 'Clerk');

-- 12
select e.emp_id, e.emp_name, e.job_title, e.dept_no, e.commission, e.company_name, e.salary, d.dept_name 
from employees e 
join departments d ON e.dept_no = d.dept_no
where (e.job_title = 'Manager') OR (e.job_title = 'Clerk' AND e.dept_no = 20);

-- 13
select e.emp_id, e.emp_name, e.job_title, e.dept_no, e.commission, e.company_name, e.salary, d.dept_name 
from employees e 
join departments d ON e.dept_no = d.dept_no
where (e.job_title = 'Manager' AND e.dept_no = 10) 
   OR (e.job_title = 'Clerk' AND e.dept_no = 20) 
   OR (e.job_title NOT IN ('Manager','Clerk') AND e.salary>2000);
   
-- 14
select e.emp_name from employees e where dept_no = 20 AND job_title NOT IN ('Manager','Clerk');

-- 15
select e.emp_name from employees e where e.salary BETWEEN 1200 AND 1400;

-- 16
select e.emp_id, e.emp_name from employees e where job_title IN ('Clerk','Analyst','Salesman');

-- 17
select e.emp_id, e.emp_name from employees e where job_title NOT IN ('Clerk','Analyst','Salesman');

-- 18
select e.emp_id,e.emp_name from employees e where e.commission<=0 or e.commission IS NULL;

-- 19
select distinct job_title from employees where commission>0 AND commission IS NOT NULL;

-- 20
select e.emp_id, e.emp_name from employees e where commission iS NULL OR commission<100;

-- 21
select e.emp_id, e.emp_name, salary, (salary+250) as net_salary from employees e where commission=0 OR commission IS NULL;

-- 22
select e.emp_id,e.emp_name,salary from employees e where salary > 2000;

-- 23
insert into employees (emp_id, emp_name, job_title, salary, commission, hire_date, dept_no, street_address, city, designation, company_name)
values (39, 'Mona Kareem', 'HR', 25000, 1200, '2023-05-09', 40, '120 Elm St', 'Miami','HR', 'Prime Inc.');

select e.emp_id, e.emp_name from employees e where e.emp_name like ("m%m" OR "M%M" OR "M%m" OR "m%M");
select e.emp_id, e.emp_name from employees e where e.emp_name regexp '^[m].*[m]$';

-- 24
select e.emp_id, e.emp_name from employees e where e.emp_name regexp '[m]'; 

-- 25
select e.emp_name from employees e where char_length(e.emp_name) <=15 and e.emp_name like '__r%';
select e.emp_name from employees e where char_length(e.emp_name) <=15 and e.emp_name regexp '^..r';

-- 26
select emp_id, emp_name from employees where MONTH(hire_date) = 2;

-- 27
SELECT emp_id, emp_name FROM employees WHERE DAY(hire_date) = DAY(LAST_DAY(hire_date));

-- 28
select emp_id, emp_name, (year(current_date()) - year(hire_date)) as working_year from employees  where year(current_date()) - year(hire_date)>2;

-- 29
-- select emp_id, emp_name from employees where year(hire_date) = 2003 and job_title = 'Manager';
select emp_id, emp_name from employees where year(hire_date) = 2023 and job_title = 'Manager';

-- 30
select emp_name,job_title, CONCAT(SUBSTRING_INDEX(emp_name, ' ', 1), ' ', job_title) as emp_job from employees;

-- 31 
select emp_name, LPAD(emp_name, 15, ' ') AS right_aligned_name from employees;

-- 32
select emp_name, lpad(emp_name,15,'*') as padded_name from employees;

-- 33
select emp_name, 
	(CASE 
		WHEN emp_name like 'A%' THEN TRIM(LEADING 'A' FROM emp_name) 
		ELSE emp_name 
	END)
    as modified_name from employees;

-- 34
select emp_name, 
	(CASE 
		WHEN emp_name like '%r' THEN TRIM(TRAILING 'r' FROM emp_name) 
		ELSE emp_name 
	END)
    as modified_name from employees;
    
-- 35
SELECT emp_name, 
       LEFT(emp_name, 3) AS first_3_chars, 
       RIGHT(emp_name, 3) AS last_3_chars
FROM employees;

-- 36
SELECT emp_name, REPLACE(emp_name, 'A', 'a') AS modified_name
FROM employees;

-- 37
SELECT emp_name, LOCATE('AR', emp_name) AS position_AR
FROM employees;

-- 38
select emp_name, salary, ROUND(salary, -3) as nearest_1000 from employees;

-- 39
select emp_name, job_title, salary from employees order by job_title, salary;

-- 40
select emp_name, job_title, salary from employees order by job_title desc, salary asc;

-- 41
select e.emp_name, d.dept_name, e.salary from employees e join departments d on e.dept_no = d.dept_no where year(current_date()) - year(e.hire_date)>1; 

-- 42
select e.emp_name, d.dept_name, e.salary,e.hire_date from employees e join departments d on e.dept_no = d.dept_no where year(e.hire_date) = 2023 order by e.hire_date; 




