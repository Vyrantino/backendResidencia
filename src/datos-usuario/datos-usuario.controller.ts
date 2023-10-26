import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DatosUsuarioService } from './datos-usuario.service';
import { CreateDatosUsuarioDto } from './dto/create-datos-usuario.dto';
import { UpdateDatosUsuarioDto } from './dto/update-datos-usuario.dto';

@Controller('datos-usuario')
export class DatosUsuarioController {
  constructor(private readonly datosUsuarioService: DatosUsuarioService) {}

  @Post()
  create(@Body() createDatosUsuarioDto: CreateDatosUsuarioDto) {
    return this.datosUsuarioService.create(createDatosUsuarioDto);
  }

  @Get()
  findAll() {
    return this.datosUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosUsuarioService.findOne(+id);
  }

  @Get( 'idUsuario/:idUsuario' )
  getUserData( @Param('idUsuario' , ParseIntPipe ) idUsuario: number ){
    return this.datosUsuarioService.findDatosUsuario( idUsuario ) ;
  }

  
  @Get( 'datosFaltantes/:idUsuario' )
  getEmptyData( @Param('idUsuario' , ParseIntPipe ) idUsuario: number ){
    return this.datosUsuarioService.findEmptyData( idUsuario ) ;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosUsuarioDto: UpdateDatosUsuarioDto) {
    return this.datosUsuarioService.update(+id, updateDatosUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosUsuarioService.remove(+id);
  }
}
