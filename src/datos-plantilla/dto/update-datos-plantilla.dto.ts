import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosPlantillaDto } from './create-datos-plantilla.dto';

export class UpdateDatosPlantillaDto extends PartialType(CreateDatosPlantillaDto) {}
