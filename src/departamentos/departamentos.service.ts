import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamentos } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs' ; 
import * as path from 'path';

@Injectable()
export class DepartamentosService {
  constructor( 
    @InjectRepository( Departamentos )
    private departamentosRepository: Repository< Departamentos >, 
  ) {}
  create(departamento: CreateDepartamentoDto) { //crea departamento y abre un directorio del mismo
    const newDepartamento = this.departamentosRepository.create( departamento ) ;
    const savedDepartamento = this.departamentosRepository.save( newDepartamento );
    const directorioNuevo = path.join( './DirectorioDepartamentos' , departamento.Nombre ) ;
   
    if (!fs.existsSync(directorioNuevo)) {
      fs.mkdirSync(directorioNuevo);
    }
    return savedDepartamento ; 
  }

  findAll(): Promise < Departamentos[] > { // encuentra todos los departamentos
    return this.departamentosRepository.find();
  }

  findOne(id: number): Promise< Departamentos | null > { //encuentra un departamento
    return this.departamentosRepository.findOneBy( { idDepartamento: id } );
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {//actualiza un departamento
    return this.departamentosRepository.update( { idDepartamento: id } , updateDepartamentoDto );
  }

  async remove(id: number) {//borra un departamento y a su directorio
    try {
      const departamento = await this.departamentosRepository.findOneBy( { idDepartamento: id } );
      const nombreDepartamento = departamento?.Nombre; 
  
      if (!nombreDepartamento) {
        throw new Error('Departamento no encontrado');
      }

      const directorioPath = path.join( './DirectorioDepartamentos', nombreDepartamento);

      if (fs.existsSync(directorioPath)) {
        fs.rmdirSync(directorioPath, { recursive: true });
      }

      await this.departamentosRepository.delete(id);
  
      return `Departamento ${nombreDepartamento} eliminado exitosamente.`;
    } catch (error) {
      throw new Error(`Error al eliminar el departamento: ${error.message}`);
    }
  }
}
