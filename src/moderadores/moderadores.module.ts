import { Module } from '@nestjs/common';
import { ModeradoresService } from './moderadores.service';
import { ModeradoresController } from './moderadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderador } from './entities/moderador.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Moderador ]) ] , 
  controllers: [ModeradoresController],
  providers: [ModeradoresService],
})
export class ModeradoresModule {}
