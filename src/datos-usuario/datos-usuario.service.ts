import { Injectable } from '@nestjs/common';
import { CreateDatosUsuarioDto } from './dto/create-datos-usuario.dto';
import { UpdateDatosUsuarioDto } from './dto/update-datos-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosUsuario } from './entities/datos-usuario.entity';
import { DataSource, Repository } from 'typeorm';
import { Datos } from 'src/datos/entities/dato.entity';



@Injectable()
export class DatosUsuarioService {
  constructor(
    @InjectRepository( DatosUsuario )
    private datosUsuarioRepository: Repository< DatosUsuario >,
    @InjectRepository( Datos )
    private datosRepository: Repository< Datos >,
    private dataSource: DataSource,
  ){}

  create(datoUsuario: CreateDatosUsuarioDto) {
    const newDatoUsuario = this.datosUsuarioRepository.create( datoUsuario ) ;
    return this.datosUsuarioRepository.save( newDatoUsuario ); //crear dato usuario
  }

  findAll(): Promise < DatosUsuario[] > {
    return this.datosUsuarioRepository.find(); //Buscar todos los dato usuario... probablemente no se use
  }

  findOne(id: number): Promise< DatosUsuario | null > {
    return this.datosUsuarioRepository.findOneBy( { idDatosUsuario: id } );//Presentar un dato en especifico... no creo que se use
  }

  update(id: number, updateDatosUsuarioDto: UpdateDatosUsuarioDto) {
    return this.datosUsuarioRepository.update( { idDatosUsuario: id } , updateDatosUsuarioDto ) ; //actualizar un dato usuario
  }

  async findDatosUsuario( idUsuario: number   ){ //Entregar todos los datos de un usuario
    const datosUsuarios = await this.datosUsuarioRepository
    .createQueryBuilder('datos_usuario')
    .innerJoin('datos_usuario.usuario', 'usuarios')
    .innerJoin('datos_usuario.dato', 'datos')
    .select(['usuarios.username', 'datos.Nombre', 'datos_usuario.contenido' , 'datos.idDato' , 'datos_usuario.idDatosUsuario'])
    .where('datos_usuario.idUsuario = :idUsuario', { idUsuario: idUsuario })
    .getRawMany();
    return datosUsuarios ; 
  }

  async findEmptyData( idUsuario: number ){//encontrar todos los datos faltantes del usuario
    const emptyData = await this.datosRepository
      .createQueryBuilder('datos')
      .leftJoin('datos.datoUsuario', 'datoUsuario', 'datoUsuario.idUsuario = :idUsuario', { idUsuario })
      .select(['datos.idDato', 'datos.Nombre', 'datoUsuario.contenido'])
      .where( 'datoUsuario.contenido IS NULL ' )
      .getRawMany();

      return emptyData ; 
  }

  remove(id: number) {
    return this.datosUsuarioRepository.delete( id ); //borrar un dato de un usuario
  }
}
