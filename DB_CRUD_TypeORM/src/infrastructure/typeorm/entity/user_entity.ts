import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { userInfoType } from "../../../domain/model/users_model";

@Entity()
export default class t_user {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({
    type:"enum",
    enum:["admin","user"],
    default:"user"
  })
  role!: userInfoType["role"];

  @Column()
  age!:number;
}
