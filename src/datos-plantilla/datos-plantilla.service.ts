import { Injectable } from '@nestjs/common';
import { CreateDatosPlantillaDto } from './dto/create-datos-plantilla.dto';
import { UpdateDatosPlantillaDto } from './dto/update-datos-plantilla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosPlantilla } from './entities/datos-plantilla.entity';
import { And, DataSource, Repository } from 'typeorm';
import { DatosUsuario } from 'src/datos-usuario/entities/datos-usuario.entity';
import { on } from 'events';

@Injectable()
export class DatosPlantillaService {
  constructor(
    @InjectRepository( DatosPlantilla )
    private datosPlantillaRepository: Repository< DatosPlantilla >,
    private dataSource: DataSource,
  ){}

  async create(datoPlantilla: CreateDatosPlantillaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newDatoPlantilla = this.datosPlantillaRepository.create(datoPlantilla);
      await this.datosPlantillaRepository.save(newDatoPlantilla);
      await queryRunner.commitTransaction();
      return { success: true, data: newDatoPlantilla };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { success: false, error: error.message };
    } finally {
      await queryRunner.release();
    }
  }
  

  findBy( idPlantilla: number ): Promise< DatosPlantilla[] >{
    return this.datosPlantillaRepository.findBy( { idPlantilla: idPlantilla } ) ; //Filtrar los datos plantilla por plantilla
  }

  findAll(): Promise< DatosPlantilla[] > {
    return this.datosPlantillaRepository.find() ; //Puede que no se use
  }

  async findNeededData( idPlantilla: number , idUsuario: number ){
    try{
      const neededData = await this.dataSource
        .createQueryBuilder()
        .select()
        .from( DatosPlantilla , "DatosPlantilla"  )
        .leftJoin( DatosUsuario , "DatosUsuario" , 
          "DatosUsuario.dato = DatosPlantilla.idDato " +
          "and DatosUsuario.idUsuario = :idUsuario" , { idUsuario } )
        .where( "DatosPlantilla.idPlantilla = :idPlantilla and DatosUsuario.contenido IS NULL" , { idPlantilla } )
        .getRawMany() ; 
        return neededData ; 
    }
    catch( error ){
      console.error( 'no se pudo realizar la consulta de los datos necesitados ' + error ) ;
    }
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
