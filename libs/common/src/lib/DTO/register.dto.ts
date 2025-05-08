import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"
export class RegisterDto {
    @ApiProperty({ example: 'yourname' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'youremail@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'yourpassword' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'yourrole' })
    role?: string;
}