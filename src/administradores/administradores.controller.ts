import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { DeleteAdministrador } from './dto/delete-administradore.dto';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  create(@Body() administrador: { idUsuario: number , idDepartamento: number , Role: string } ) {
    return this.administradoresService.create( administrador );
  }

  @Post('eliminar-admin')
  eliminarAdmin(@Body() administrador: DeleteAdministrador ) {
    return this.administradoresService.remove( administrador );
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get( 'user-departaments/:idUsuario' )
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


  // @Delete(':id')
  // remove(@Param('id' , ParseIntPipe) id: number) {
  //   return this.administradoresService.remove(+id);
  // }
}
