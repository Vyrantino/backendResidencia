import { IsAlphanumeric, IsEmail , IsOptional, MaxLength , MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @IsOptional()
    Email?: string ; 

    @IsAlphanumeric()
    @IsOptional()
    Username?: string ;

    @MinLength( 4 )
    @MaxLength( 16)
    Password: string ; 
}