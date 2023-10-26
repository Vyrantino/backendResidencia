import { Test, TestingModule } from '@nestjs/testing';
import { DatosUsuarioService } from './datos-usuario.service';

describe('DatosUsuarioService', () => {
  let service: DatosUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosUsuarioService],
    }).compile();

    service = module.get<DatosUsuarioService>(DatosUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
