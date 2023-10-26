import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosUsuarioDto } from './create-datos-usuario.dto';

export class UpdateDatosUsuarioDto extends PartialType(CreateDatosUsuarioDto) {}
