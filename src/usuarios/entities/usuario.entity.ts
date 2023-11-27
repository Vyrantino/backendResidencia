import { IsAlphanumeric , IsEmail } from "class-validator";
import { Administrador } from "src/administradores/entities/administrador.entity";
import { DatosUsuario } from "src/datos-usuario/entities/datos-usuario.entity";
import { Documentos } from "src/documentos/entities/documento.entity";
import { Moderador } from "src/moderadores/entities/moderador.entity";
import { Entity , Column , PrimaryGeneratedColumn , OneToMany , ManyToMany, Unique } from "typeorm";

@Entity()
@Unique(['Email'] ) 
@Unique([ 'Username' ])
export class Usuarios {

    @PrimaryGeneratedColumn()
    idUsuario: number; 

    @Column('varchar', { length: 16 })
    @IsAlphanumeric()
    Username: string ; 

    @Column('varchar')
    @IsEmail()  
    Email: string ; 

    @Column('varchar')
    Password: string ;

    @Column('varchar' , { default: 'Usuario' })
    Role: string ; 

    @OneToMany( () => DatosUsuario , ( datoUsuario ) => datoUsuario.usuario , { cascade: true } )
    datoUsuario: DatosUsuario[] ; //Cada usuario tendra su propio repertorio de datos

    @OneToMany( () => Documentos , ( documentos ) => documentos.usuario , { cascade: true })
    documentos: Documentos[] ; //Cada usuario tendra varios documentos

    @ManyToMany( () => Moderador , ( moderadores ) => moderadores.usuario , { cascade: true } )
    moderadores: Moderador[] ;

    @ManyToMany( () => Administrador , ( administradores ) => administradores.usuario , { cascade: true } )
    administradores: Administrador[] ;

    
}
