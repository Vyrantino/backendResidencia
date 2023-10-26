import { MinLength , MaxLength , IsEmail , IsAlphanumeric} from "class-validator";

export class CreateUsuarioDto {
    @MinLength( 4 )
    @MaxLength( 16 )
    @IsAlphanumeric()
    Username: string ; 

    @IsEmail()
    Email: string ; 

    @MinLength( 8 )
    @MaxLength( 16 )
    Password: string ; 
    
    Role: string ; 

}
