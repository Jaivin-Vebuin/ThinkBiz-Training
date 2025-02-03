export const getAllUserQuery = 'Select * from users';

export const getUserByIDQuery = 'Select * from users where id = ?';

export const registerUserQuery = 'INSERT INTO users (name, email, password, role, age) VALUES (?, ?, ?, ?, ?)';

export const updateUserQuery = 'UPDATE users SET name = ?, email = ?, password = ?, age = ? WHERE id = ?';

export const deleteUserQuery = 'DELETE from users where id = ?';

export const getUserByEmailQuery = 'SELECT * FROM users WHERE email = ?'