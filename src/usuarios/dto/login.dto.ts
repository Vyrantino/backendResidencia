import { IsEmail , MaxLength , MinLength } from "class-validator";

export class AuthDto{
    @IsEmail()
    Email: string ; 

    @MinLength( 4 )
    @MaxLength( 16)
    Password: string ; 
}