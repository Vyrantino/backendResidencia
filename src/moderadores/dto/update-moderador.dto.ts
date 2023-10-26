import { PartialType } from '@nestjs/mapped-types';
import { CreateModeradoreDto } from './create-moderador.dto';

export class UpdateModeradoreDto extends PartialType(CreateModeradoreDto) {}
