import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserTokenService } from '../../user-token/interface/user-token-service.interface';
import { Request } from 'express';

@Injectable()
export class UserAuthorizationGuard implements CanActivate {

  constructor(
    @Inject(IUserTokenService) private userTokenService: IUserTokenService,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }
    
    try {
      const decodedToken = await this.userTokenService.verifyToken(token);
      request['user'] = decodedToken;
    } catch {
      throw new UnauthorizedException();
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
