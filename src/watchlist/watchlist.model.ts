import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

@Table({ tableName: "watchlists" })
export class Watchlist extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
