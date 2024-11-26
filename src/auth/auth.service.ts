import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { UserLoginDto } from "./dto/user-login.dto";
import * as bcrypt from "bcrypt";
import { AuthUserResponse } from "./response/auth.response";
import { TokenService } from "src/token/token.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if(existUser) throw new HttpException('Данный пользователь уже в системе',HttpStatus.BAD_REQUEST);

    return this.userService.createUser(dto)
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse>{
    const existUser = await this.userService.findUserByEmail(dto.email)
    if(!existUser) throw new HttpException('Неверный пароль или логин',HttpStatus.BAD_REQUEST);
    
    const validatePassword = await bcrypt.compare(dto.password, existUser.password)
    if(!validatePassword) throw new HttpException('Неверный пароль или логин',HttpStatus.BAD_REQUEST);
    const user = await this.userService.publicUser(dto.email)
    const token = await this.tokenService.generateJwtToken(user)
    return {user, token}
  }

  
}

// prettier-ignore
