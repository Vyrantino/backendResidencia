import { Test, TestingModule } from '@nestjs/testing';
import { DatosPlantillaService } from './datos-plantilla.service';

describe('DatosPlantillaService', () => {
  let service: DatosPlantillaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosPlantillaService],
    }).compile();

    service = module.get<DatosPlantillaService>(DatosPlantillaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
