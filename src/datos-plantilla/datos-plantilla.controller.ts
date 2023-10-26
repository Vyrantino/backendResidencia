import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosPlantillaService } from './datos-plantilla.service';
import { CreateDatosPlantillaDto } from './dto/create-datos-plantilla.dto';
import { UpdateDatosPlantillaDto } from './dto/update-datos-plantilla.dto';

@Controller('datos-plantilla')
export class DatosPlantillaController {
  constructor(private readonly datosPlantillaService: DatosPlantillaService) {}

  @Post()
  create(@Body() createDatosPlantillaDto: CreateDatosPlantillaDto) {
    return this.datosPlantillaService.create(createDatosPlantillaDto);
  }

  @Get()
  findAll() {
    return this.datosPlantillaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosPlantillaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosPlantillaDto: UpdateDatosPlantillaDto) {
    return this.datosPlantillaService.update(+id, updateDatosPlantillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosPlantillaService.remove(+id);
  }
}
