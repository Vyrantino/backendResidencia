import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  create(@Body() createAdministradoreDto: CreateAdministradoreDto , role: UpdateUsuarioDto ) {
    return this.administradoresService.create(createAdministradoreDto , role );
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get( 'user-departamentos/:idUsuario' )
  findUserDepartamentos( @Param( 'idUsuario' , ParseIntPipe ) idUsuario: number  ){
    return this.administradoresService.findUserDepartamentos( idUsuario ) ;
  }

  @Get( 'departament-administrators/:idDepartamento' )
  findDepartamentAdministrators( @Param( 'idDepartamento' , ParseIntPipe ) idDepartamento: number  ){
    return this.administradoresService.findDepartamentAdministrators( idDepartamento ) ;
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
