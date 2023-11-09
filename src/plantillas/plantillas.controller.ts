import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';

@Controller('plantillas')
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Post()
  create(@Body() createPlantillaDto: CreatePlantillaDto) {
    return this.plantillasService.create(createPlantillaDto);
  }

  @Get()
  findAll() {
    return this.plantillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.plantillasService.findOne(+id);
  }

  @Get( 'idDepartamento/:idDepartamento' ) 
  findBy( @Param( 'idDepartamento' , ParseIntPipe ) idDepartamento: number ){
    return this.plantillasService.findBy( idDepartamento ) ; 
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe ) id: number, @Body() updatePlantillaDto: UpdatePlantillaDto) {
    return this.plantillasService.update(+id, updatePlantillaDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe ) id: number ) {
    return this.plantillasService.remove(+id);
  }
}
