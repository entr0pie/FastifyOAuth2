import { UserAuthorizationGuard } from './user-authorization.guard';

describe('UserAuthorizationGuard', () => {
  it('should be defined', () => {
    expect(new UserAuthorizationGuard()).toBeDefined();
  });
});
