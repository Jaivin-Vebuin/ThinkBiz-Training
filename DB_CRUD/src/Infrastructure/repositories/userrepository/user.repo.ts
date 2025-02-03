import { ResultSetHeader, RowDataPacket } from "mysql2";
import { userPort } from "../../../Application/port/users.port";
import dbConnection from "../../config/dbConnection";
import { userReg, userLogin, returnUserData, returnUpdateUserData, getUserData } from "../../../Domain/model/userModel";
import { deleteUserQuery, getAllUserQuery, getUserByEmailQuery, getUserByIDQuery, registerUserQuery, updateUserQuery } from "../SQL/users.queries";

export const UserRepository: userPort = {
    registerUserPort: async (user: userReg): Promise<userReg> => {

        const [existingUser] = await dbConnection.execute<RowDataPacket[]>(getUserByEmailQuery,[user.email]);
        if (existingUser.length > 0) {
            throw new Error("User with this email is already registered.");
        }
        const values = [user.name, user.email, user.password, user.role, user.age]
        const [result] = await dbConnection.query<RowDataPacket[]>(registerUserQuery, values);
        if (result.length === 0) {
            throw new Error("Unable to insert the data into the users.")
        }
        return { ...user };
    },
    loginUserPort: async (user: userLogin): Promise<returnUserData> => {
        const query = getAllUserQuery;
        const [users] = await dbConnection.execute<RowDataPacket[]>(query);
        const validUser = users.find((u: RowDataPacket) => u.email === user.email);
        if (!validUser || validUser.password !== user.password) {
            throw new Error('Invalid credentials');
        }
        return {
            id: validUser.id,
            name:validUser.name,
            email: validUser.email,
            role: validUser.role,
            age:validUser.age
        };
    },
    getAllUserPort: async (): Promise<returnUserData[]> => {
        const [rows] = await dbConnection.execute<RowDataPacket[]>(getAllUserQuery);
        if (rows.length === 0) {
            throw new Error("No users existed. !!");
        }
        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role,
            age: row.age
        }));
    },
    getSpecificUserPort: async (user: getUserData): Promise<returnUserData> => {
        const [rows] = await dbConnection.execute<RowDataPacket[]>(getUserByIDQuery, [user.id]);
        if (rows.length === 0) {
            throw new Error("User with provided id not found.");
        }
        return { id: rows[0].id, name: rows[0].name, email: rows[0].email, role: rows[0].role, age: rows[0].age }
    },
    updateUserPort: async (id: number, user: returnUpdateUserData): Promise<returnUpdateUserData> => {
        const [rows] = await dbConnection.execute<RowDataPacket[]>(getUserByIDQuery, [id]);
        const values = [user.name ?? rows[0].name, user.email ?? rows[0].email, user.password ?? rows[0].password, user.age ?? rows[0].age, id]
        const [data] = await dbConnection.execute<ResultSetHeader>(updateUserQuery, values)
        if (data.affectedRows !== 0) {
            return { ...user }
        }
        else {
            throw new Error("Error in updation.");
        }
    },
    deleteAnyUserPort: async (id: number): Promise<string> => {
        const [data] = await dbConnection.execute<ResultSetHeader>(deleteUserQuery, [id]);
        if (data.affectedRows === 1) {
            return "successfully deleted user !!";
        }
        else {
            return "error deleting user !!"
        }
    }
    // deleteSpecificUserPort: async(id:number, user:getUserData) =>{

    //     return "";
    // },
}