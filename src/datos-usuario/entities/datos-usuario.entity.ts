import { Usuarios } from 'src/usuarios/entities/usuario.entity' ; 
import { Datos } from 'src/datos/entities/dato.entity' ; 
import { ManyToOne , Entity , PrimaryGeneratedColumn , Column, OneToOne, ManyToMany, Index, JoinColumn } from 'typeorm' ;
import { Documentos } from 'src/documentos/entities/documento.entity';

@Entity()
@Index(["usuario", "dato"], { unique: true })
export class DatosUsuario {

     @PrimaryGeneratedColumn()
     idDatosUsuario: number ; 

     @Column( 'varchar' ) 
     contenido: string ;

     @Column()
     idUsuario: number ; 

     @Column()
     idDato: number ; 

     @ManyToOne( () => Usuarios , ( usuario ) => usuario.datoUsuario )
     @JoinColumn( { name: "idUsuario" } )
     usuario: Usuarios ; // Muchos datos de usuario por usuario

     @ManyToOne( () => Datos, ( dato ) => dato.datoUsuario )
     @JoinColumn( { name: "idDato" } )
     dato: Datos ; //Varios DatosUsuario que correspondan solo a un tipo de dato

     // @ManyToMany( () => Documentos , ( documento ) => documento.datosUsuario )
     // documento: Documentos[] ; //Un documento puede tener muchos datos del usuario, asi mismo, muchos documentos pueden tener el mismo dato del usuario. 


}
