import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from './entities/documento.entity';
import { DatosUsuario } from 'src/datos-usuario/entities/datos-usuario.entity';
import { Plantilla } from 'src/plantillas/entities/plantilla.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Documentos , DatosUsuario , Plantilla ]) ] ,
  controllers: [DocumentosController],
  providers: [DocumentosService],
  
})
export class DocumentosModule {}
