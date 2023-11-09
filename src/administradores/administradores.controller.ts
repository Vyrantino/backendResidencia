import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  create(@Body() createAdministradoreDto: CreateAdministradoreDto) {
    return this.administradoresService.create(createAdministradoreDto);
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get( 'departamentos/:idUsuario' )
  findDepartamentos( @Param( 'idUsuario' , ParseIntPipe ) idUsuario: number  ){
    return this.administradoresService.findDepartamentos( idUsuario ) ;
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.administradoresService.findBy(+id);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateAdministradoreDto: UpdateAdministradoreDto) {
    return this.administradoresService.update(+id, updateAdministradoreDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.administradoresService.remove(+id);
  }
}
