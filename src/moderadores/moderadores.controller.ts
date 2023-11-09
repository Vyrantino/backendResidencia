import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModeradoresService } from './moderadores.service';
import { CreateModeradoreDto } from './dto/create-moderador.dto';
import { UpdateModeradoreDto } from './dto/update-moderador.dto';

@Controller('moderadores')
export class ModeradoresController {
  constructor(private readonly moderadoresService: ModeradoresService) {}

  @Post()
  create(@Body() createModeradoreDto: CreateModeradoreDto) {
    return this.moderadoresService.create(createModeradoreDto);
  }

  @Get()
  findAll() {
    return this.moderadoresService.findAll();
  }

  @Get( 'departamento/:idDepartamento' )
  findByDepartamento( @Param( 'idDepartamento' , ParseIntPipe ) idDepartamento: number ) {
    return this.moderadoresService.findByDepartamento( idDepartamento );
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.moderadoresService.findBy(+id);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe ) id: number, @Body() updateModeradoreDto: UpdateModeradoreDto) {
    return this.moderadoresService.update(+id, updateModeradoreDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe ) id: number) {
    return this.moderadoresService.remove(+id);
  }
}
