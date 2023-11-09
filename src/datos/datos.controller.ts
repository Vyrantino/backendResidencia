import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DatosService } from './datos.service';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';

@Controller('datos')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}

  @Post()
  create(@Body() createDatoDto: CreateDatoDto) {
    return this.datosService.create(createDatoDto);
  }

  @Get()
  findAll() {
    return this.datosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number ) {
    return this.datosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe ) id: number, @Body() updateDatoDto: UpdateDatoDto) {
    return this.datosService.update(+id, updateDatoDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe ) id: number) {
    return this.datosService.remove(+id);
  }
}
