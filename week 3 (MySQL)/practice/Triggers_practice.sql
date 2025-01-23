ALTER TABLE tab1 ADD COLUMN age INT;
DELIMITER //
CREATE TRIGGER age_verification
BEFORE INSERT ON tab1
FOR EACH ROW
BEGIN
    IF NEW.age < 0 THEN 
        SET NEW.age = 0; 
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE trigger message_trigger
after update on tab1
for each row
begin
	insert into message (id,message)
    values (new.id, concat('!! ',new.name,' updated something !!'));
end;
//
DELIMITER ;

create table message (
	id int auto_increment,
    message varchar(300) not null,
    primary key(id)
);

INSERT into tab1 (id,name,birthDate,phone,gender,age)
values (7,'harsh','2002-06-30','7436985210','M',-22);

update tab1 set name = 'soham' where id = 7;

select * from message;
desc tab1;