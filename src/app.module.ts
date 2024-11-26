import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.model";
import { AuthModule } from "./auth/auth.module";
import { TokenModule } from "./token/token.module";
import { WatchlistModule } from "./watchlist/watchlist.module";
import { Watchlist } from "./watchlist/watchlist.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Watchlist],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
  ],
})
export class AppModule {}
