import { DatosUsuario } from "src/datos-usuario/entities/datos-usuario.entity";
import { Plantilla } from "src/plantillas/entities/plantilla.entity";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Documentos {
    @PrimaryGeneratedColumn()
    idDocumento: number ; 

    @Column('varchar')
    Nombre: string ; 

    @Column({type: 'datetime'} )
    FechaModificacion: string ; 

    @Column()
    idPlantilla: number ;

    @Column()
    idUsuario: number ;

    @ManyToOne( () => Plantilla , ( plantilla ) => plantilla.documentos )
    @JoinColumn( { name: "idPlantilla" } )
    plantilla: Plantilla[] ; //Varios documentos deben hacerse apartir de una plantilla. 
    //IE: No se pretende que haya una plantilla por cada documento 

    @ManyToOne( () => Usuarios , ( usuario ) => usuario.documentos )
    @JoinColumn( { name: "idUsuario" } )
    usuario: Usuarios ; //Puede haber muchos documentos por usuario. 

    // @ManyToMany( () => DatosUsuario , ( datosUsuario ) => datosUsuario.documento )
    // datosUsuario: DatosUsuario[] ; //Puede haber muchos datos de usuario presentes en muchos documentos distintos. 

}
