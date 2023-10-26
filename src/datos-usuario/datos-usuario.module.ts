import { Module } from '@nestjs/common';
import { DatosUsuarioService } from './datos-usuario.service';
import { DatosUsuarioController } from './datos-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosUsuario } from './entities/datos-usuario.entity';
import { Datos } from 'src/datos/entities/dato.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ DatosUsuario , Datos ]) ] , 
  controllers: [DatosUsuarioController],
  providers: [DatosUsuarioService],
})
export class DatosUsuarioModule {}
