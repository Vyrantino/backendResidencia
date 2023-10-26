import { Injectable } from '@nestjs/common';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Datos } from './entities/dato.entity';

@Injectable()
export class DatosService {
  constructor(
    @InjectRepository( Datos )
    private datosRepository: Repository< Datos >
  ){}


  create(dato: CreateDatoDto) {
    const newDato = this.datosRepository.create( dato ) ;
    return this.datosRepository.save( newDato ) ;//Para crear nuevos datos
  }

  findAll(): Promise< Datos[] > {
    return this.datosRepository.find() ;//Para cargar todos los tipo de datos 
  }

  findOne(id: number): Promise< Datos | null > {
    return this.datosRepository.findOneBy( { idDato: id } ); //Para servir un solo dato y relacionarlo
  }

  update(id: number, updateDatoDto: UpdateDatoDto) {
    return this.datosRepository.update( { idDato: id } , updateDatoDto ); //Para actualizarlo
  }

  async remove(id: number): Promise<void> {
    await this.datosRepository.delete( id ); //para borrarlo
  }
}
