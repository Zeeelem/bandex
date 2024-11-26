import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { TokenModule } from "src/token/token.module";
import { JwtStrategy } from "src/strategy";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UsersModule, TokenModule],
})
export class AuthModule {}
