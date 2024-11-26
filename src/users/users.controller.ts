import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch("/test")
  updateUser(@Body() dto: UpdateUserDto, @Req() req): Promise<UpdateUserDto> {
    const user = req.user;
    return this.usersService.updateUser(user.email, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/delete")
  deleteUser(@Req() req) {
    const user = req.user;
    const userDelete = this.usersService.deleteUser(user.email);
    return { message: `Пользователь ${user.email} удален` };
  }
}
