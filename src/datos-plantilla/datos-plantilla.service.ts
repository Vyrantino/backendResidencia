import { Injectable } from '@nestjs/common';
import { CreateDatosPlantillaDto } from './dto/create-datos-plantilla.dto';
import { UpdateDatosPlantillaDto } from './dto/update-datos-plantilla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosPlantilla } from './entities/datos-plantilla.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DatosPlantillaService {
  constructor(
    @InjectRepository( DatosPlantilla )
    private datosPlantillaRepository: Repository< DatosPlantilla >,
    private dataSource: DataSource,
  ){}

  async create(datoPlantilla: CreateDatosPlantillaDto) { //Crear datos como transaccion nomas por si las moscas
    const queryRunner = this.dataSource.createQueryRunner() ;
    await queryRunner.connect() ;
    await queryRunner.startTransaction() ;
    try{
      await queryRunner.manager.save( datoPlantilla ) ;
    } 
    catch( error ){
      await queryRunner.rollbackTransaction() ;
    }
    finally{
      await queryRunner.release() ;
    }
  }

  findBy( idPlantilla: number ): Promise< DatosPlantilla[] >{
    return this.datosPlantillaRepository.findBy( { idPlantilla: idPlantilla } ) ; //Filtrar los datos plantilla por plantilla
  }

  findAll(): Promise< DatosPlantilla[] > {
    return this.datosPlantillaRepository.find() ; //Puede que no se use
  }

  findOne(id: number): Promise< DatosPlantilla | null > {
    return this.datosPlantillaRepository.findOneBy( { idDatoPlantilla: id } ); //Para manipular dicho dato
  }

  update(id: number, updateDatosPlantillaDto: UpdateDatosPlantillaDto) {
    return this.datosPlantillaRepository.update( { idDatoPlantilla: id } , updateDatosPlantillaDto ) ; //puede que no se use
  }

  async remove(id: number): Promise< void > {
    await this.datosPlantillaRepository.delete( id ); // quitar dato de la plantilla
  }
}
