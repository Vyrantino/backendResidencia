import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Administrador , Usuarios ]) ] ,
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
})
export class AdministradoresModule {}
