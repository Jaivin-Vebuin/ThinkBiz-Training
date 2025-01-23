-- CREATE TABLE employee (
--     emp_id INT NOT NULL PRIMARY KEY,
--     emp_name VARCHAR(100),
--     job_title VARCHAR(50),
--     salary DECIMAL(10, 2),
--     commission DECIMAL(10, 2),
--     hire_date DATE,
--     dept_no INT FOREIGN KEY REFRENCES departments,
--     street_address VARCHAR(200),
--     city VARCHAR(100),
--     designation VARCHAR(50),
--     company_name VARCHAR(100)
-- );

-- INSERT INTO employee (emp_id, emp_name, job_title, salary, commission, hire_date, dept_no, street_address, city, designation, company_name) VALUES
-- (1, 'John Doe', 'Manager', 12000.00, 900.00, '2023-01-20', 30, '123 Elm St', 'New York', 'Manager', 'First Bank Corporation'),
-- (2, 'Jane Smith', 'Clerk', 10000.00, 500.00, '2022-10-14', 20, '456 Oak St', 'Los Angeles', 'Clerk', 'Tech Corp'),
-- (3, 'Mike Johnson', 'Salesman', 1500.00, NULL, '2023-02-15', 30, '789 Pine St', 'Chicago', 'Salesman', 'First Bank Corporation'),
-- (4, 'Emily Davis', 'Analyst', 1300.00, 200.00, '2022-12-01', 10, '321 Maple St', 'Houston', 'Analyst', 'Tech Corp'),
-- (5, 'Robert Brown', 'President', 20000.00, NULL, '2025-01-21', 10, '654 Spruce St', 'Phoenix', 'President', 'First Bank Corporation'),
-- (6, 'Nancy Wilson', 'Manager', 18000.00, 2000.00, '2021-03-10', 20, '987 Willow St', 'Miami', 'Manager', 'Finance World'),
-- (7, 'Kevin Martin', 'Analyst', 8000.00, NULL, '2022-09-23', 20, '876 Cedar St', 'San Francisco', 'Analyst', 'Prime Inc.'),
-- (8, 'Sara Lee', 'Clerk', 7000.00, 300.00, '2022-05-17', 10, '654 Palm St', 'Philadelphia', 'Clerk', 'Tech Corp'),
-- (9, 'David Wong', 'Engineer', 6000.00, 800.00, '2023-01-30', 60, '321 Fir St', 'Seattle', 'Engineer', 'AutoTech'),
-- (10, 'Amy Green', 'Director', 15000.00, NULL, '2021-08-14', 30, '789 Oak St', 'Atlanta', 'Director', 'First Bank Corporation'),
-- (11, 'Jack White', 'Salesman', 2500.00, 100.00, '2023-09-13', 30, '123 Maple St', 'Denver', 'Salesman', 'First Bank Corporation'),
-- (12, 'Linda Scott', 'HR', 5500.00, NULL, '2022-02-22', 40, '456 Birch St', 'San Jose', 'HR', 'Tech Corp'),
-- (13, 'Chris Kim', 'Consultant', 6500.00, 500.00, '2021-12-07', 70, '567 Spruce St', 'Dallas', 'Consultant', 'Prime Inc.'),
-- (14, 'Patricia Brown', 'Analyst', 14000.00, NULL, '2021-06-30', 10, '432 Cypress St', 'Austin', 'Analyst', 'Tech Corp'),
-- (15, 'Stephen Young', 'Actor', 9000.00, 0.00, '2024-03-20', 30, '123 Elmwood Ave', 'New York', 'Actor', 'Prime Inc.'),
-- (16, 'Barbara Clark', 'Manager', 18000.00, 2000.00, '2021-03-10', 20, '987 Willow St', 'Miami', 'Manager', 'Finance World'),
-- (17, 'Justin Foster', 'Admin', 6000.00, NULL, '2022-08-01', 100, '421 Cedar St', 'Indianapolis', 'Administrator', 'Govt. Org'),
-- (18, 'Nancy Sanders', 'Teacher', 10000.00, 600.00, '2023-05-12', 20, '125 Willow St', 'Newark', 'Teacher', 'Public School'),
-- (19, 'Alice Peterson', 'Accountant', 11000.00, 0.00, '2022-10-20', 50, '215 Birch Ave', 'Salt Lake City', 'Accountant', 'Agri Tech'),
-- (20, 'Mark Bell', 'Consultant', 13000.00, NULL, '2022-07-14', 70, '341 Pine St', 'San Francisco', 'Consultant', 'Agri Tech'),
-- (21, 'Rachel Ramirez', 'Analyst', 12500.00, NULL, '2021-10-13', 20, '654 Oak Lane', 'Savannah', 'Analyst', 'AutoTech'),
-- (22, 'Jeff Allen', 'Technician', 10500.00, 900.00, '2025-01-20', 80, '876 Cedar Rd', 'Tulsa', 'Technician', 'Innovation Group'),
-- (23, 'Anna Gonzales', 'Coordinator', 9500.00, 700.00, '2024-08-25', 50, '111 Maple Court', 'Tampa', 'Coordinator', 'Finance World'),
-- (24, 'Nina Hernandez', 'Designer', 7000.00, 0.00, '2023-06-05', 10, '231 Ash Blvd', 'Orlando', 'Designer', 'Media Corp'),
-- (25, 'Carlos Scott', 'Teacher', 7300.00, NULL, '2024-02-28', 20, '654 Birch Ave', 'Austin', 'Teacher', 'University Inc.'),
-- (26, 'Chloe King', 'Artist', 11500.00, 300.00, '2023-11-19', 40, '321 Elm St', 'Nashville', 'Artist', 'Entertainment Ltd.')
-- (27, 'Hannah Ross', 'Scientist', 14000.00, 0.00, '2022-01-21', 60, '654 Birch Lane', 'Fresno', 'Scientist', 'BioTech'),
-- (28, 'James Collins', 'Architect', 12000.00, 1000.00, '2023-06-23', 90, '321 Pine Rd', 'Raleigh', 'Architect', 'Design Tech'),
-- (29, 'Anthony Price', 'Technician', 17000.00, 1200.00, '2023-03-15', 80, '123 Fir Blvd', 'St. Louis', 'Technician', 'AutoTech'),
-- (30, 'Eugene Murphy', 'Photographer', 9000.00, 400.00, '2024-09-04', 10, '543 Chestnut St', 'Indianapolis', 'Photographer', 'Media Corp'),
-- (31, 'Rebecca Henderson', 'Director', 14500.00, 0.00, '2022-02-13', 30, '654 Elm Ave', 'Detroit', 'Director', 'Entertainment Ltd.'),
-- (32, 'Olivia Wood', 'Technologist', 9900.00, 300.00, '2021-11-10', 20, '987 Cedar Rd', 'Cincinnati', 'Technologist', 'Innovation Group'),
-- (33, 'Roger Wright', 'Manager', 20000.00, 0.00, '2024-10-07', 70, '789 Pine St', 'Omaha', 'Manager', 'Prime Inc.'),
-- (34, 'Jackie Lewis', 'Professor', 20000.00, 0.00, '2022-04-28', 20, '654 Maple St', 'Columbus', 'Professor', 'University Inc.'),
-- (35, 'Emma Carter', 'Engineer', 5000.00, 0.00, '2023-06-25', 20, '987 Willow Street', 'Indianapolis', 'Engineer', 'AutoTech'),
-- (36, 'Keith Garcia', 'CEO', 25000.00, 2000.00, '2022-01-05', 10, '789 Oak Avenue', 'Minneapolis', 'CEO', 'Finance World'),
-- (37, 'Alex Reed', 'Designer', 14000.00, 0.00, '2024-05-17', 10, '345 Cedar Blvd', 'Denver', 'Designer', 'Media Corp'),
-- (38, 'Johnny Evans', 'Consultant', 8000.00, 0.00, '2022-07-05', 70, '654 Birch Road', 'Columbus', 'Consultant', 'Prime Inc.'),
-- (39, 'Mona Kareem', 'HR', 25000.00, 1200.00, '2023-05-09', 40, '120 Elm St', 'Miami', 'HR', 'Prime Inc.');

-- departments table
-- from dbeaver
-- CREATE TABLE `departments` (
--   `dept_no` int NOT NULL,
--   `dept_name` varchar(100) DEFAULT NULL,
--   PRIMARY KEY (`dept_no`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 1 Find the names, street address, and cities of residence for all employees who work for'First Bank Corporation' and earn more than $10,000.
select emp_name, street_address, city from employees where company_name = 'First Bank Corporation' AND salary > 10000;

-- 2 Select the employees in department 30
select * from employees where dept_no = 30;

-- 3 List the names, numbers and departments of all clerks.
select e.emp_name, e.dept_no, d.dept_name from employees e LEFT JOIN departments d ON e.dept_no = d.dept_no where e.job_title = 'Clerk';

-- 4 Find the department numbers and names of employees of all departments with deptno greater than 20.
SELECT d.dept_no, d.dept_name, e.emp_name
FROM departments d
JOIN employees e ON d.dept_no = e.dept_no
WHERE d.dept_no > 20;

-- 5 Find employees whose commission is greater than their salaries.
select emp_id, emp_name, salary from employees where commission,6000 > salary;

-- 6  Find employees whose commission is greater than 60 % of their salaries.
SELECT 
    emp_id, 
    emp_name, 
FROM 
    employees 
WHERE 
    commission > salary*0.6;
    
-- 7 List name, job and salary of all employees in department 20 who earn more than 2000/-.
SELECT emp_name, job_title, salary FROM employees WHERE dept_no = 20 AND salary>2000;

-- 8 Find all salesmen in department 30 whose salary is greater than 1500/-.
SELECT emp_id,emp_name,job_title,dept_no,salary from employees where job_title = 'Salesman' AND dept_no = 30 AND salary>1500; 

-- 9 Find all employees whose designation is either manager or president.
select * from employees where job_title IN ('Manager','President');

-- 10 Find all managers who are not in department 30.
select emp_id,emp_name,job_title,dept_no from employees where job_title = 'Manager' AND dept_no <> 30;


-- 11 Find all the details of managers and clerks in dept 10.
select * from employees e join departments d on d.dept_no = e.dept_no where d.dept_no = 10 and e.job_title IN('Manager','Clerk');

-- 12 Find the details of all the managers (in any dept) and clerks in dept 20.
select e.emp_id, e.emp_name, e.job_title, e.dept_no, e.commission, e.company_name, e.salary, d.dept_name 
from employees e 
join departments d ON e.dept_no = d.dept_no
where (e.job_title = 'Manager') OR (e.job_title = 'Clerk' AND e.dept_no = 20);

-- 13 Find the details of all the managers in dept. 10 and all clerks in dept 20 and all employees who are neither managers nor clerks but whose salary is more than or equal to 2000/-.
select e.emp_id, e.emp_name, e.job_title, e.dept_no, e.commission, e.company_name, e.salary, d.dept_name 
from employees e 
join departments d ON e.dept_no = d.dept_no
where (e.job_title = 'Manager' AND e.dept_no = 10) 
   OR (e.job_title = 'Clerk' AND e.dept_no = 20) 
   OR (e.job_title NOT IN ('Manager','Clerk') AND e.salary>2000);
   
-- 14 Find the names of anyone in dept. 20 who is neither manager nor clerk.
select e.emp_name from employees e where dept_no = 20 AND job_title NOT IN ('Manager','Clerk');

-- 15 Find the names of employees who earn between 1200/- and 1400/-.
select e.emp_name from employees e where e.salary BETWEEN 1200 AND 1400;

-- 16 Find the employees who are clerks, analysts or salesmen.
select e.emp_id, e.emp_name from employees e where job_title IN ('Clerk','Analyst','Salesman');

-- 17 Find the employees who are not clerks, analysts or salesmen.
select e.emp_id, e.emp_name from employees e where job_title NOT IN ('Clerk','Analyst','Salesman');

-- 18 Find the employees who do not receive commission.
select e.emp_id,e.emp_name from employees e where e.commission<=0 or e.commission IS NULL;

-- 19 Find the different jobs of employees receiving commission.
select distinct job_title from employees where commission>0 AND commission IS NOT NULL;

-- 20 Find the employees who do not receive commission or whose commission is less than 100/-.
select e.emp_id, e.emp_name from employees e where commission iS NULL OR commission<100;

-- 21 If all the employees not receiving commission is entitles to a bonus of Rs. 250/- show the net earnings of all the employees.
select e.emp_id, e.emp_name, salary, (salary+250) as net_salary from employees e where commission=0 OR commission IS NULL;

-- 22 Find all the employees whose total earning is greater than 2000/- .
select e.emp_id,e.emp_name,salary from employees e where salary > 2000;

-- 23 Find all the employees whose name begins or ends with ‘M’
select e.emp_id, e.emp_name from employees e where e.emp_name like ("m%m");

-- 24 
-- Find all the employees whose names contain the letter ‘M’ in any case.
select e.emp_id, e.emp_name from employees e where e.emp_name regexp '[m]'; 

-- 25
-- Find all the employees whose names are up to 15 character long and have letter ‘R’ as 3rd character of their names.
select e.emp_name from employees e where char_length(e.emp_name) <=15 and e.emp_name like '__r%';

-- 26
-- Find all the employees who were hired in the month of February (of any year).
select emp_id, emp_name from employees where MONTH(hire_date) = 2;

-- 27
-- Find all the employees who were hired on last day of the month.
SELECT emp_id, emp_name FROM employees WHERE DAY(hire_date) = DAY(LAST_DAY(hire_date));

-- 28
-- Find all the employees who were hired more than 2 years ago.
select emp_id, emp_name, (year(current_date()) - year(hire_date)) as working_year from employees  where year(current_date()) - year(hire_date)>2;

-- 29
-- Find the managers hired in the year 2003.
select emp_id, emp_name from employees where year(hire_date) = 2003 and job_title = 'Manager';

-- 30
-- Display the names and jobs of all the employees separated by a space.
select emp_name,job_title, CONCAT(emp_name, ' ', job_title) as emp_job from employees;

-- 31 
-- Display the names of all the employees right aligning them to 15 characters.
select emp_name, LPAD(emp_name, 15, ' ') AS right_aligned_name from employees;

-- 32
-- Display the names of all the employees padding them to the right up to 15 characters with ‘*’.
select emp_name, lpad(emp_name,15,'*') as padded_name from employees;

-- 33
-- Display the names of all the employees without any leading ‘A’.
select emp_name, 
    as modified_name 
    from employees
    where emp_name NOT LIKE ('A%');

-- 34
-- Display the names of all the employees without any trailing ‘R’.
select emp_name, 
    as modified_name 
    from employees
    where emp_name NOT LIKE ('%r');
    
-- 35
-- Show the first 3 and last 3 characters of the names of all the employees.
SELECT emp_name, 
       LEFT(emp_name, 3) AS first_3_chars, 
       RIGHT(emp_name, 3) AS last_3_chars
FROM employees;

-- 36
-- Display the names of all the employees replacing ‘A’ with ‘a’.
SELECT emp_name, REPLACE(emp_name, 'A', 'a') AS modified_name
FROM employees;

-- 37
-- Display the names of all the employees and position where the string ‘AR’ occurs in the name.
SELECT emp_name, LOCATE('AR', emp_name) AS position_AR FROM employees;

-- 38
-- Show the salary of all the employees , rounding it to the nearest Rs. 1000/-.
select emp_name, salary, ROUND(salary, -3) as nearest_1000 from employees;

-- 39
-- Display the names, jobs and salaries of employees, sorting on job and salary.
select emp_name, job_title, salary from employees order by job_title, salary;

-- 40
-- Display the names, jobs and salaries of employees, sorting on descending order of job and within job sorted on salary.
select emp_name, job_title, salary from employees order by job_title desc, salary asc;

-- 41
-- List the employee names, department names and salary for those employees who have completed 1 year of service.
select e.emp_name, d.dept_name, e.salary from employees e join departments d on e.dept_no = d.dept_no where year(current_date()) - year(e.hire_date)>1; 

-- 42
-- List the employee names, department names and hiredate for those employees who have joined in 2003 . Sort your output in the order of joining date.
select e.emp_name, d.dept_name, e.salary,e.hire_date from employees e join departments d on e.dept_no = d.dept_no where year(e.hire_date) = 2003 order by e.hire_date; 




