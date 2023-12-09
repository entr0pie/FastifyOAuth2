import { BadRequestException, Body, Controller, HttpCode, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { UserLoginResponse } from './messages/user-login-response';
import { UserRegisterResponse } from './messages/user-register-response';
import { UserService } from '../services/user.service';
import { UserLoginRequest } from './messages/user-login-request';
import { UserRegisterRequest } from './messages/user-register-request';
import { IUserTokenService } from '../security/user-token/interface/user-token-service.interface';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
        @Inject(IUserTokenService) private readonly userTokenService: IUserTokenService
    ) {}
    
    @Post('login')
    async login(@Body() requestBody: UserLoginRequest): Promise<UserLoginResponse> {
        const email: string = requestBody.email;
        const password: string = requestBody.password;

        try {
            if (await this.userService.checkCredentials(email, password)) {
                const token = await this.userTokenService.createToken(email);
                return { access_token: token };
            }

            throw new UnauthorizedException();
            
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Post('register')
    @HttpCode(204)
    async register(@Body() requestBody: UserRegisterRequest): Promise<UserRegisterResponse> {
        const email: string = requestBody.email;
        const password: string = requestBody.password;

        try {
            await this.userService.register(email, password);
        } catch (error) {
            throw new BadRequestException();
        }

        return;
    }
}
