import { Controller, Post } from '@nestjs/common';
import { UserLoginResponse } from './messages/user-login-response';
import { UserRegisterResponse } from './messages/user-register-response';

@Controller('user')
export class UserController {
    
    @Post('login')
    public login(): UserLoginResponse {
        return null;
    }

    @Post('register')
    public register(): UserRegisterResponse {
        return null;
    }
}
