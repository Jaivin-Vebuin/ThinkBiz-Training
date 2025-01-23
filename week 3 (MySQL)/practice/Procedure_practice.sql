delimiter //
	create procedure CreateUserTable()
    begin
    create table if not exists users(
		user_id int auto_increment primary key,
        first_name varchar(255),
        last_name varchar(255),
        city varchar(255)
    );
    
    insert into users(first_name, last_name,city)
    values ('Jaivin','Savaliya','Surat'),
		   ('Anurag','Dalsaniya','Rajkot'),
           ('Man','Mendapara','Junagadh'),
           ('Dishant', 'Chauhan', 'Ahmedabad');
	
    select * from users;
    end;

// delimiter ;

delimiter //
	create procedure CountUsers()
    begin
		declare counter int default 0;
        select COUNT(user_id) into counter from users;
        select counter as Number_of_count;
    end;
// delimiter ;

call CreateUserTable();
call CountUsers();

-- insert into users(first_name,last_name,city)
-- values('Hardik','Savaliya','Surat');

delimiter //
	create procedure SelectByLastName(IN l_name varchar(255))
    begin
		select * from users where last_name = l_name;
    end;
// delimiter ;

delimiter //
	create procedure CountByLastName(IN l_name varchar(255), OUT counter int)
    begin
		select count(user_id) into counter from users where last_name = l_name;
    end;
// delimiter ;

call SelectByLastName('Savaliya');
call CountByLastName('Savaliya', @count_by_last);

select @count_by_last;

drop procedure CountByLastName;