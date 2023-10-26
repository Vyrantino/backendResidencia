import { Injectable } from '@nestjs/common';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs' ;
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as path from 'path' ;
import { Departamentos } from 'src/departamentos/entities/departamento.entity';

@Injectable()
export class PlantillasService {
  constructor(
    @InjectRepository( Plantilla )
    private plantillaRepository: Repository< Plantilla > ,
    @InjectRepository( Departamentos )
    private departamentosRepository: Repository< Departamentos >,
  ){}

  async create(plantilla: CreatePlantillaDto) {

    const doc = new Document({
      sections: [
          {
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                          new TextRun("{Nombre} {Apellido} {CURP}"),
                          new TextRun({
                              text: ""+plantilla.Nombre+"",
                              bold: true,
                          }),
                      ],
                  }),
              ],
          },
      ],
  });
  const departamento = await this.departamentosRepository.findOneBy( { idDepartamento: plantilla.idDepartamento } ) ;
  const documentPath = path.join( "./DirectorioDepartamentos" , departamento.Nombre , ""+plantilla.Nombre+".docx" ) ;
  Packer.toBuffer(doc).then((buffer) => { 
    fs.writeFileSync( documentPath, buffer);
  });
  
    const currentTime = new Date() ;
    const formatedCurrentTime = currentTime.toISOString() ;
    plantilla.FechaModificacion = formatedCurrentTime ; 
    plantilla.Route = documentPath ;
    const newPlantilla = this.plantillaRepository.create( plantilla ) ;
    return this.plantillaRepository.save( newPlantilla );
  }

  findAll(): Promise< Plantilla[] > {
    return this.plantillaRepository.find();
  }

  findOne(id: number): Promise < Plantilla | null > {
    return this.plantillaRepository.findOneBy( { idPlantilla: id } );
  }

  update(id: number, updatePlantillaDto: UpdatePlantillaDto) {
    const splitRoute = updatePlantillaDto.Route.split("/") ;
    const popOldName = splitRoute.pop() ;
    splitRoute.push( updatePlantillaDto.Nombre ) ;
    const newRoute = splitRoute.join( '/' );
    updatePlantillaDto.Route = newRoute ; 
    return this.plantillaRepository.update( { idPlantilla: id } , updatePlantillaDto );
  }

  async remove(id: number) {
    try {
      const plantilla = await this.plantillaRepository.findOneBy( { idPlantilla: id } );
      const nombrePlantilla = plantilla?.Nombre; 
  
      if (!nombrePlantilla) {
        throw new Error('Plantilla no encontrada');
      }

      const departamento = await this.departamentosRepository.findOneBy( { idDepartamento: plantilla.idDepartamento } );
      const nombreDepartamento = departamento?.Nombre; 
  
      if (!nombreDepartamento) {
        throw new Error('Departamento no encontrado');
      }

      const directorioPath = path.join( './DirectorioDepartamentos', nombreDepartamento , ""+nombrePlantilla+".docx");
      console.log( directorioPath ) ;
      if (fs.existsSync(directorioPath)) {
        fs.unlinkSync(directorioPath);
      }

      await this.departamentosRepository.delete(id);
  
      return `Plantilla ${nombrePlantilla} eliminada exitosamente.`;
    } catch (error) {
      throw new Error(`Error al eliminar la plantilla: ${error.message}`);
    }
  }
}
