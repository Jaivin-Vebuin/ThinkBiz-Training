import { ResultSetHeader, RowDataPacket } from "mysql2";
import { userPort } from "../../../Application/port/users.port";
import dbConnection from "../../config/dbConnection";
import { userReg, userLogin, returnUserData, returnUpdateUserData, getUserData } from "../../../Domain/model/userModel";
import { deleteUserQuery, getAllUserQuery, getUserByEmailQuery, getUserByIDQuery, registerUserQuery, updateUserQuery } from "../SQL/users.queries";

export const UserRepository: userPort = {
    registerUserPort: async (user: userReg): Promise<userReg> => {
        const values = [user.name, user.email, user.password, user.role, user.age]
        const [result] = await dbConnection.query<RowDataPacket[]>(registerUserQuery, values);
        if (result.length === 0) {
            throw new Error("Unable to insert the data into the users.")
        }
        return { ...user };
    },
    loginUserPort: async (user: userLogin): Promise<returnUserData> => {
        const [users] = await dbConnection.execute<RowDataPacket[]>(getAllUserQuery);
        return {
            id: users[0].id,
            name:users[0].name,
            email: users[0].email,
            role: users[0].role,
            age:users[0].age
        };
    },
    getAllUserPortIntermediate : async(user:userLogin): Promise<userReg[]> => {
        const query = getAllUserQuery;
        const [users] = await dbConnection.execute<RowDataPacket[]>(query);
        
        
        return users.map((user) => ({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            age: user.age,
        }));
    },
    getAllUserPort: async (email:string): Promise<returnUserData[]> => {
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
    updateUserPort: async ( user: returnUpdateUserData): Promise<returnUpdateUserData> => { 
        const [data]=await dbConnection.query(updateUserQuery, [user,user.id]);
        if (data) {
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