import { Test, TestingModule } from '@nestjs/testing';
import { DatosPlantillaController } from './datos-plantilla.controller';
import { DatosPlantillaService } from './datos-plantilla.service';

describe('DatosPlantillaController', () => {
  let controller: DatosPlantillaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosPlantillaController],
      providers: [DatosPlantillaService],
    }).compile();

    controller = module.get<DatosPlantillaController>(DatosPlantillaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
