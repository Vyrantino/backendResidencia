import { Departamentos } from "src/departamentos/entities/departamento.entity";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Index(["usuario", "departamento"] , { unique: true })
export class Moderador {

    @PrimaryGeneratedColumn()
    idModerador: number ; 

    @Column()
    idDepartamento: number ; 

    @Column()
    idUsuario: number ; 

    @ManyToOne( () => Departamentos , ( departamento ) => departamento.moderadores , { nullable: true } )
    @JoinColumn( { name: "idDepartamento" } )
    departamento: Departamentos ; 

    @ManyToOne( () => Usuarios , ( usuario ) => usuario.moderadores )
    @JoinColumn( { name: "idUsuario" } )
    usuario: Usuarios ; 

}
