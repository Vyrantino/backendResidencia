import { Datos } from "src/datos/entities/dato.entity";
import { Plantilla } from "src/plantillas/entities/plantilla.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index( [ 'idDato' , 'idPlantilla' ] , { unique: true } )
export class DatosPlantilla {

    @PrimaryGeneratedColumn()
    idDatoPlantilla: number ; 

    @Column()
    idPlantilla: number ; 

    @Column()
    idDato: number ; 

    @ManyToOne( () => Plantilla , ( plantilla ) => plantilla.datosPlantilla )
    @JoinColumn( { name: "idPlantilla" } )
    plantilla: Plantilla ; 

    @ManyToOne( () => Datos , ( datos ) => datos.datoPlantilla  ) 
    @JoinColumn( { name: "idDato" } )
    datos: Datos[] ; 

}
