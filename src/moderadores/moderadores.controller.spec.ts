import { Test, TestingModule } from '@nestjs/testing';
import { ModeradoresController } from './moderadores.controller';
import { ModeradoresService } from './moderadores.service';

describe('ModeradoresController', () => {
  let controller: ModeradoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeradoresController],
      providers: [ModeradoresService],
    }).compile();

    controller = module.get<ModeradoresController>(ModeradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
