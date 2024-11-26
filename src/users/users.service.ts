import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import passport from "passport";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Watchlist } from "src/watchlist/watchlist.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
        try {
            dto.password = await this.hashPassword(dto.password);
            const user = await this.userRepository.create(dto);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({
                where: { email: email },
                include: {
                    model: Watchlist,
                    required: false,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const userPassword = await bcrypt.hash(password, 10);
            return userPassword;
        } catch (error) {
            throw new Error(error);
        }
    }

    async publicUser(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({
                where: { email },
                attributes: { exclude: ["password"] },
                include: {
                    model: Watchlist,
                    required: false,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
        try {
            await this.userRepository.update(dto, { where: { email } });
            return dto;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(email: string) {
        try {
            const user = await this.userRepository.destroy({ where: { email } });
            if (user) {
                return { message: `Пользователь с таким email ${email} успешно удален` };
            } else {
                return "не существует пользователь с таким email";
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
