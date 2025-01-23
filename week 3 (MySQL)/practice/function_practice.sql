
DELIMITER //
create function sum_of_two (n1 int, n2 int)
RETURNS INT
deterministic
	BEGIN
		DECLARE v1,v2,sum int;
        set v1 = n1;
        set v2 = n2;
        set sum = v1 + v2;
        RETURN sum;
    END;
// DELIMITER ;

select  sum_of_two(5000,salary) from employees;