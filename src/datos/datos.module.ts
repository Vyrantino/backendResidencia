import { Module } from '@nestjs/common';
import { DatosService } from './datos.service';
import { DatosController } from './datos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datos } from './entities/dato.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [ Datos ] ) ] , 
  controllers: [DatosController],
  providers: [DatosService],
})
export class DatosModule {}
