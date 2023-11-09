import { Injectable } from '@nestjs/common';
import { CreateModeradoreDto } from './dto/create-moderador.dto';
import { UpdateModeradoreDto } from './dto/update-moderador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderador } from './entities/moderador.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ModeradoresService {
  constructor(
    @InjectRepository( Moderador )
    private moderadoresRepository: Repository< Moderador >
  ) {}

  create(moderador: CreateModeradoreDto) {
    const newModerador = this.moderadoresRepository.create( moderador ) ;
    return this.moderadoresRepository.save( newModerador );
  }

  findAll(): Promise< Moderador[] > {
    return this.moderadoresRepository.find();
  }

  findByDepartamento(idDepartamento: number) {
    return this.moderadoresRepository.findBy( { idDepartamento: idDepartamento } );
  }

  findBy( idUsuario: number ): Promise < Moderador[] >{
    return this.moderadoresRepository.findBy( { idUsuario: idUsuario } ) ;
  }

  update(id: number, updateModeradoreDto: UpdateModeradoreDto) {
    return this.moderadoresRepository.update( { idModerador: id } , updateModeradoreDto );
  }

  remove(id: number) {
    return this.moderadoresRepository.delete( id );
  }
}
