import { Module } from '@nestjs/common';
import { DatosPlantillaService } from './datos-plantilla.service';
import { DatosPlantillaController } from './datos-plantilla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosPlantilla } from './entities/datos-plantilla.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ DatosPlantilla ]) ] , 
  controllers: [DatosPlantillaController],
  providers: [DatosPlantillaService],
})
export class DatosPlantillaModule {}
