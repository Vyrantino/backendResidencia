import { DatosPlantilla } from 'src/datos-plantilla/entities/datos-plantilla.entity';
import { Datos } from 'src/datos/entities/dato.entity';
import { Departamentos } from 'src/departamentos/entities/departamento.entity' ; 
import { Documentos } from 'src/documentos/entities/documento.entity';
import { Entity, Column, PrimaryGeneratedColumn , ManyToMany , ManyToOne  , JoinTable, OneToMany, Unique, Index, JoinColumn } from 'typeorm';

@Entity()
@Index( [ 'Nombre' , 'departamento' ], { unique: true })
export class Plantilla {
    @PrimaryGeneratedColumn()
    idPlantilla: number; 

    @Column('varchar')
    Nombre: string; 

    @Column({ type: 'datetime' })
    FechaModificacion: string; 

    @Column( 'varchar' , { nullable: true  } )
    Route: string ; 

    @Column( { nullable: false  } )
    idDepartamento: number ; 

    @ManyToOne( () => Departamentos, ( departamento ) => departamento.plantilla )
    @JoinColumn( { name: "idDepartamento" } )
    departamento: Departamentos; //Muchas plantillas pueden pertenecer a un solo departamento

    @OneToMany( () => Documentos, ( documentos ) => documentos.plantilla , { cascade: true })
    documentos: Documentos[] ; //Una plantilla puede corresponder a muchos documentos. 

    @ManyToMany( () => DatosPlantilla , ( datosPlantilla ) => datosPlantilla.plantilla , { cascade: true } )
    datosPlantilla: DatosPlantilla [] ; 
}
