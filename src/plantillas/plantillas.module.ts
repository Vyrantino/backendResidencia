import { Module } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { PlantillasController } from './plantillas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity';
import { Departamentos } from 'src/departamentos/entities/departamento.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Plantilla , Departamentos ]) ] , 
  controllers: [PlantillasController],
  providers: [PlantillasService],
})
export class PlantillasModule {}
