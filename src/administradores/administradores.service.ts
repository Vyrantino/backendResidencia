import { Injectable } from '@nestjs/common';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectRepository( Administrador )
    private administradorRepository: Repository < Administrador > 
  ){}


  create(administrador: CreateAdministradoreDto) {
    try{
      const newAdmin = this.administradorRepository.create( administrador ) ;
      return this.administradorRepository.save( newAdmin ) ;
    }
    catch( error ){
      console.error( 'No se pudo crear el nuevo administrador ' + error ) ;
    };
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

  findDepartamentos( idUsuario: number ){
    try{
      return this.administradorRepository.find( { relations: [ 'departamento' ] , where: { idUsuario: idUsuario } } ) ;
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
