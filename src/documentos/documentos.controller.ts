import { Controller, Get, Post, Body, Patch, Param, Delete , Res , ParseIntPipe} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Response } from 'express';
import * as fs from 'fs' ;
import * as path from 'path' ;

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get( 'top' )
  findTop(){
    return this.documentosService.findTopPlantillas() ;
  }

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentosService.create(createDocumentoDto);
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  async descargarDocumento( @Param('id' , ParseIntPipe ) id: number , @Res() res: Response) {
    const buf = await this.documentosService.findOne( id ) ;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=output.docx`);
    res.send( buf );
  }
  @Get('idUsuario/:id')
  async getUserDocumentos( @Param('id' , ParseIntPipe ) idUsuario: number ) {
    return this.documentosService.findUserDocumentos(  idUsuario );
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentosService.remove(+id);
  }
}
