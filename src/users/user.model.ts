import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Watchlist } from "src/watchlist/watchlist.model";

interface UserCreationAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Table({tableName: "users"})
  export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string

    @Column({type: DataType.STRING, unique: true, allowNull: false })
    email: string 
  
    @Column({type: DataType.STRING, allowNull: false })
    password: string

    @HasMany(() => Watchlist, {
      onDelete: 'CASCADE',
      onUpdate: "CASCADE"
    })
    watchlist: Watchlist[]
  
  
  }

// prettier-ignore
