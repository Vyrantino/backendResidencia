import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentos } from './entities/documento.entity';
import {  Repository } from 'typeorm';
import { DatosUsuario } from 'src/datos-usuario/entities/datos-usuario.entity';
import * as fs from 'fs' ;
import * as path from 'path' ;
import { Plantilla } from 'src/plantillas/entities/plantilla.entity';
import { Departamentos } from 'src/departamentos/entities/departamento.entity';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");


@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository( Documentos )
    private documentosRepository: Repository< Documentos >,
    @InjectRepository( DatosUsuario )
    private datosUsuarioRepository: Repository< DatosUsuario >,
    @InjectRepository( Plantilla )
    private plantillaRepository: Repository< Plantilla >,
    @InjectRepository( Departamentos )
    private departamentosRepository: Repository< Departamentos >,
 
  ){}

  async create(documento: CreateDocumentoDto) {//crear nuevo documento
    const userData = await this.datosUsuarioRepository
    .createQueryBuilder('datos_usuario')
    .innerJoin('datos_usuario.usuario', 'usuarios')
    .innerJoin('datos_usuario.dato', 'datos')
    .select([ 'datos.Nombre', 'datos_usuario.contenido'])
    .where('datos_usuario.idUsuario = :idUsuario', { idUsuario: documento.idUsuario })
    .getRawMany();
    const renderData = {} ;
    for( const each of userData){
      renderData[each.datos_Nombre] = each.datos_usuario_contenido;
    }
    const plantilla = await this.plantillaRepository.findOneBy( { idPlantilla: documento.idPlantilla } ) ; 
    const leerArchivo = fs.readFileSync( plantilla.Route , "binary" ) ; 
    const zip = new PizZip(leerArchivo) ; 
    const doc = new Docxtemplater( zip,{
      paragraphLoop: true,
      linebreaks: true,
    } );
    doc.render( renderData ) ;
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });
    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve("./DirectorioDepartamentos", "output.docx"), buf);
    const currentTime = new Date() ;
    const formatedCurrentTime = currentTime.toISOString() ;
    documento.FechaModificacion = formatedCurrentTime ; 
    const newDocumento = this.documentosRepository.create( documento ) ; 
    return this.documentosRepository.save( newDocumento );
  }

  async findAll(): Promise< Documentos[] > {
    try {
      const documentos = await this.documentosRepository.find({
        relations: ['plantilla' , 'plantilla.departamento'],
      });
  
      return documentos;
    }
    catch( error ){
      console.error('Ocurrió un error: ' + error);
      throw new Error('No se pudo obtener la lista de documentos.');
    }
  }

  async findOne(id: number): Promise < Documentos | null > {
    try{
      const documento = await this.documentosRepository.findOneBy( { idDocumento: id } ) ;
      const userData = await this.datosUsuarioRepository
        .createQueryBuilder('datos_usuario')
        .innerJoin('datos_usuario.usuario', 'usuarios')
        .innerJoin('datos_usuario.dato', 'datos')
        .select([ 'datos.Nombre', 'datos_usuario.contenido'])
        .where('datos_usuario.idUsuario = :idUsuario', { idUsuario: documento.idUsuario })
        .getRawMany();
        const renderData = {} ;
        for( const each of userData){
          renderData[each.datos_Nombre] = each.datos_usuario_contenido;
        }
        const plantilla = await this.plantillaRepository.findOneBy( { idPlantilla: documento.idPlantilla } ) ; 
        const leerArchivo = fs.readFileSync( plantilla.Route , "binary" ) ; 
        const zip = new PizZip(leerArchivo) ; 
        const doc = new Docxtemplater( zip,{
          paragraphLoop: true,
          linebreaks: true,
        } );
        doc.render( renderData ) ;
        const buf = doc.getZip().generate({
          type: "nodebuffer",
          compression: "DEFLATE",
        });
        const currentTime = new Date() ;
        const formatedCurrentTime = currentTime.toISOString() ;
        documento.FechaModificacion = formatedCurrentTime ; 
        fs.writeFileSync(path.resolve("./DirectorioDepartamentos", "output2.docx"), buf);
        return buf ;
    }
    catch( e ){
      console.log( e ) ;
    }
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosRepository.update( { idDocumento: id } , updateDocumentoDto );
  }

  remove(id: number) {
    return this.documentosRepository.delete( id );
  }

  async findTopPlantillas(  ): Promise < Documentos[] | null >{
    const topPlantillas = await this.documentosRepository
      .createQueryBuilder()
      .select(['COUNT(idPlantilla) AS count', 'idPlantilla'])
      .groupBy('idPlantilla')
      .orderBy('count', 'DESC')
      .limit(5) // Obtener las top 5 plantillas
      .getRawMany();
    return topPlantillas ;
  }

}
