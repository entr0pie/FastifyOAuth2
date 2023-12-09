import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserAuthorizationGuard } from 'src/user/security/guards/user-authorization/user-authorization.guard';

@UseGuards(UserAuthorizationGuard)
@Controller('applications')
export class ApplicationController {

    @Get()
    public async getUserApplications(): Promise<object> {
        return null;
    }
    
    @Post('register')
    public async register(): Promise<string> {
        return null;
    }

    @Put('update')
    public async update(): Promise<string> {
        return null;
    }

    @Delete('delete')
    public async delete(): Promise<string> {
        return null;
    }
}
