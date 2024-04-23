import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;

    @IsOptional()
    @IsNumber()
    dateOfRegistration?: number;
}