import { DatosPlantilla } from 'src/datos-plantilla/entities/datos-plantilla.entity';
import { DatosUsuario } from 'src/datos-usuario/entities/datos-usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn , ManyToMany , Unique, OneToMany } from 'typeorm';

@Entity()
@Unique(['Nombre'])
export class Datos {
    @PrimaryGeneratedColumn()
    idDato: number; 

    @Column('varchar')
    Nombre: string; 

    @ManyToMany( () => DatosPlantilla, ( datoPlantilla ) => datoPlantilla.datos , { cascade: true } )
    datoPlantilla: DatosPlantilla[]; //Muchas plantillas pueden tener muchos datos

    @OneToMany( () => DatosUsuario, ( datoUsuario ) => datoUsuario.dato , { cascade: true } )
    datoUsuario: DatosUsuario[] ; //Un tipo de dato para varios datoUsuario
}
