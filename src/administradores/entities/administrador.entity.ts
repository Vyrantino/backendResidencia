import { Departamentos } from "src/departamentos/entities/departamento.entity";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["usuario", "departamento"] , { unique: true })
export class Administrador {

    @PrimaryGeneratedColumn()
    idAdministrador: number ; 

    @Column()
    idUsuario: number ; 

    @Column()
    idDepartamento: number ; 

    @ManyToOne( () => Usuarios , ( usuarios ) => usuarios.administradores )
    @JoinColumn( { name: 'idUsuario' } )
    usuario: Usuarios ; 

    @ManyToOne( () => Departamentos , ( departamentos ) => departamentos.administradores )
    @JoinColumn( { name: 'idDepartamento' } )
    departamento: Departamentos ; 
}
