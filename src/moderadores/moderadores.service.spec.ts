import { Test, TestingModule } from '@nestjs/testing';
import { ModeradoresService } from './moderadores.service';

describe('ModeradoresService', () => {
  let service: ModeradoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeradoresService],
    }).compile();

    service = module.get<ModeradoresService>(ModeradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
