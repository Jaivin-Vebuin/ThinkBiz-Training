-- get the total salary paid for each department and include the department name.

WITH DepartmentSalaries AS (
    SELECT 
        d.dept_name,
        SUM(e.salary) AS total_salary
    FROM 
        employees e
    JOIN 
        departments d ON e.dept_no = d.dept_no
    GROUP BY 
        d.dept_name
)
SELECT 
    dept_name, 
    total_salary
FROM 
    DepartmentSalaries;
    
-- calculate average salary by Job title and department
WITH JobTitleSalaries AS (
    SELECT 
        e.job_title,
        d.dept_name,
        ROUND(AVG(e.salary),1) AS average_salary
    FROM 
        employees e
    JOIN 
        departments d ON e.dept_no = d.dept_no
    GROUP BY 
        e.job_title, d.dept_name
)
SELECT 
    job_title,
    dept_name,
    average_salary
FROM 
    JobTitleSalaries
ORDER BY
	dept_name;
