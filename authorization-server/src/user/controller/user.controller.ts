// import {
//   BadRequestException,
//   Body,
//   Controller,
//   HttpCode,
//   Post,
// } from '@nestjs/common';
// import { UserLoginResponse } from './messages/user-login-response';
// import { UserRegisterResponse } from './messages/user-register-response';
// import { UserService } from '../services/user.service';
// import { UserLoginRequest } from './messages/user-login-request';
// import { UserRegisterRequest } from './messages/user-register-request';
//
// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}
//
//   @Post('login')
//   async login(
//     @Body() requestBody: UserLoginRequest,
//   ): Promise<UserLoginResponse> {
//     return null;
//   }
//
//   @Post('register')
//   @HttpCode(204)
//   async register(
//     @Body() requestBody: UserRegisterRequest,
//   ): Promise<UserRegisterResponse> {
//     const email: string = requestBody.email;
//     const password: string = requestBody.password;
//
//     try {
//       await this.userService.register(email, password);
//     } catch (error) {
//       throw new BadRequestException();
//     }
//
//     return;
//   }
// }
