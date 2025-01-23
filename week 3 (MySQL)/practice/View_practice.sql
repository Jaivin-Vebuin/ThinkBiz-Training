CREATE VIEW EmployeeView AS SELECT emp_name,salary,city,company_name from employees;

select * from EmployeeView;

update EmployeeView set salary = 10000 where emp_name = 'Jane Smith';

select emp_name, salary from employees; -- original table changed.

CREATE VIEW CommissionView AS SELECT emp_name,commission from employees where commission>1000 WITH check option;

update CommissionView set commission = 800 where emp_name = 'John Doe'; -- this will not work as it is violating the condition of original view.

select commission from employees;

 drop view CommissionView;