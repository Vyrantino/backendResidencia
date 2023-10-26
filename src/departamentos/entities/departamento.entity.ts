import { Moderador } from "src/moderadores/entities/moderador.entity";
import { Plantilla } from "src/plantillas/entities/plantilla.entity";
import { Entity, Column, PrimaryGeneratedColumn , OneToMany, Unique, ManyToMany, JoinTable  } from 'typeorm';

@Entity()
@Unique(['Nombre'])
export class Departamentos {

    @PrimaryGeneratedColumn()
    idDepartamento: number; 

    @Column( 'varchar' )
    Nombre: string ; 

    @OneToMany( () => Plantilla , ( plantilla ) => plantilla.departamento , { cascade: true } )
    plantilla: Plantilla[] ; //Un departamento puede tener varias plantillas.

    @ManyToMany( () => Moderador , ( moderadores ) => moderadores.departamento , { cascade: true } )
    moderadores: Moderador[] ; 

}
