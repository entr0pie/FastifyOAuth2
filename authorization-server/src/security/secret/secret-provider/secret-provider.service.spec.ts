import { Test, TestingModule } from '@nestjs/testing';
import { SecretProviderService } from './secret-provider.service';

describe('SecretProviderService', () => {
  let service: SecretProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretProviderService],
    }).compile();

    service = module.get<SecretProviderService>(SecretProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
