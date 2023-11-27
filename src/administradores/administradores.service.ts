import { Injectable } from '@nestjs/common';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { DataSource, Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectRepository( Administrador )
    private administradorRepository: Repository < Administrador >,
    @InjectRepository( Usuarios )
    private usuarioRepository: Repository < Usuarios >,
    private dataSource: DataSource , 
  ){}


  // create(administrador: CreateAdministradoreDto) {
  //   try{
  //     const newAdmin = this.administradorRepository.create( administrador ) ;
  //     return this.administradorRepository.save( newAdmin ) ;
  //   }
  //   catch( error ){
  //     console.error( 'No se pudo crear el nuevo administrador ' + error ) ;
  //   };
  // }

  async create( administrador: CreateAdministradoreDto , usuario: UpdateUsuarioDto ){
    const queryRunner =  this.dataSource.createQueryRunner() ;
    await queryRunner.connect() ;
    await queryRunner.startTransaction() ;
    try {
       await this.usuarioRepository.update( { idUsuario: administrador.idUsuario } , usuario  ) ;
       const newAdmin = this.administradorRepository.create( administrador ) ;
       await this.administradorRepository.save( newAdmin ) ; 
       await queryRunner.commitTransaction()
    } catch (err) {
        await queryRunner.rollbackTransaction()
    } finally {
        await queryRunner.release()
    }
  }

  findAll() {
    try{
      return this.administradorRepository.find( { relations: [ 'departamento' , 'usuario' ] } ) ;
    }
    catch( error ){
      console.error( 'No se pudo consultar la lista de administradores ' + error ) ;
    };
  }

  findBy( idUsuario: number ) {
    try{
      return this.administradorRepository.findBy( { idUsuario: idUsuario } ) ;
    }
    catch( error ){
      console.error( 'No se pudo consultar al siguiente administrador ' + error ) ;
    };
  }

  findUserDepartamentos( idUsuario: number ){
    try{
      return this.administradorRepository.find( { relations: [ 'departamento' ] , where: { idUsuario: idUsuario } } ) ;
    }
    catch( error ){
      console.error( 'No se pudo consultar los departamentos del administrador ' + error ) ;
    } ;
  }

  findDepartamentAdministrators( idDepartamento: number ){
    try{
      return this.administradorRepository.find( { relations: [ 'usuario' ] , where: { idDepartamento: idDepartamento } } ) ;
    }
    catch( error ){
      console.error( 'No se pudo consultar los departamentos del administrador ' + error ) ;
    } ;
  }


  update(id: number, updateAdministradoreDto: UpdateAdministradoreDto) {
    return  this.administradorRepository.update( { idAdministrador: id } , updateAdministradoreDto ) ;
  }

  remove(id: number) {
    return this.administradorRepository.delete( id ) ;
  }
}
