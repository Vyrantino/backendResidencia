import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash , compare } from 'bcrypt' ; 
import { LoginDto } from './dto/login.dto';
 
@Injectable()
export class UsuariosService {
  constructor( 
    @InjectRepository( Usuarios )
    private usuariosRepository: Repository< Usuarios >,
    private jwtServiice: JwtService ,
   ){}

  async register(usuario: CreateUsuarioDto) {
    const { Password } = usuario ; 
    const plainToHash = await hash( Password , 10 ) ; 
    usuario = { ...usuario , Password: plainToHash } ;
    const newUsuario = this.usuariosRepository.create( usuario ) ; 
    return this.usuariosRepository.save( newUsuario ) ;
  }

  async login( usuario: LoginDto ){
    const { Email , Username , Password } = usuario ; 
    const findUser = await this.usuariosRepository.findOne({
      where: {
        ...(Email ? { Email } : Username ? { Username } : {}), 
      },
    });
    if( !findUser ) throw new HttpException( 'Usuario no se encontró' , 404 ) ;
    const checkPassword = await compare( Password, findUser.Password );
    if( !checkPassword ) throw new HttpException( 'Contraseña Incorrecta ' , 403 ) ;
    const payload = { idUsuario: findUser.idUsuario , username: findUser.Username } ; 
    const token = this.jwtServiice.sign( payload );
    const data = { 
      idUsuario: findUser.idUsuario, 
      Username: findUser.Username , 
      Role: findUser.Role , 
      token: token 
    }

    return data ;  
  }

  findAll(): Promise < Usuarios[] > {
    return this.usuariosRepository.find( { where: { Role: 'Usuario' } } );
  }

  findAllMaster(): Promise < Usuarios[] > {
    return this.usuariosRepository.find( );
  }

  findOne(id: number): Promise< Usuarios | null > {
    return this.usuariosRepository.findOneBy( { idUsuario: id } );
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try{
      if( updateUsuarioDto.Password ){
        const { Password } = updateUsuarioDto ; 
        const plainToHash = await hash( Password , 10 ) ; 
        updateUsuarioDto = { ...updateUsuarioDto , Password: plainToHash } ;
        return this.usuariosRepository.update( { idUsuario: id } , updateUsuarioDto );
      }
      else{
        return this.usuariosRepository.update( { idUsuario: id } , updateUsuarioDto );
      }
    }
    catch( error ){
      console.error( error );
    }
  }

  remove(id: number) {
    return this.usuariosRepository.delete(id);
  }
}
