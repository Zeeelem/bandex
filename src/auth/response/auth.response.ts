import { IsString } from "class-validator";

class userResponse {
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}

export class AuthUserResponse {
    user: userResponse;

    @IsString()
    readonly token: string;
}
