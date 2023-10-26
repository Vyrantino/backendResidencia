import { Test, TestingModule } from '@nestjs/testing';
import { DatosUsuarioController } from './datos-usuario.controller';
import { DatosUsuarioService } from './datos-usuario.service';

describe('DatosUsuarioController', () => {
  let controller: DatosUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosUsuarioController],
      providers: [DatosUsuarioService],
    }).compile();

    controller = module.get<DatosUsuarioController>(DatosUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
