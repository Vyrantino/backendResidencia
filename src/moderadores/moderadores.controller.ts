import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeradoreDto: UpdateModeradoreDto) {
    return this.moderadoresService.update(+id, updateModeradoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderadoresService.remove(+id);
  }
}
