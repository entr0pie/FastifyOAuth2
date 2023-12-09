import { Test, TestingModule } from '@nestjs/testing';
import { RS256KeyProvider } from './rs256-key-provider.service';

describe('KeyProviderService', () => {
  let service: RS256KeyProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RS256KeyProvider],
    }).compile();

    service = module.get<RS256KeyProvider>(RS256KeyProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
