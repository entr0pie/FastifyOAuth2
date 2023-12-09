import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserAuthorizationGuard } from 'src/user/security/guards/user-authorization/user-authorization.guard';
import { ApplicationService } from '../services/application.service';
import { UserService } from 'src/user/services/user.service';
import { ApplicationRegisterRequest } from './messages/application-register-request';
import { application } from 'express';
import { ApplicationRegisterResponse } from './messages/application-register-response';
import { ApplicationUpdateRequest } from './messages/application-update-request';
import { ApplicationUpdateResponse } from './messages/application-update-response';
import { ApplicationDeleteResponse } from './messages/application-delete-response';

@UseGuards(UserAuthorizationGuard)
@Controller('applications')
export class ApplicationController {

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly userService: UserService,
    ) {}

    @Get()
    public async getApplications(@Request() req): Promise<object> {
        const jwt = req['user'];
        const email = jwt.payload.sub;
        const user = await this.userService.findByEmail(email);

        const applications = await this.applicationService.getByOwner(user.id);
        return applications;
    }

    @Get(':client_id')
    public async getApplication(@Request() req, @Param('client_id') client_id): Promise<object> {
        const jwt = req['user'];
        const email = jwt.payload.sub;
        const user = await this.userService.findByEmail(email);

        const application = await this.applicationService.getByClientId(client_id);
        return application;
    }
    
    @Post('register')
    public async register(@Request() req, @Body() reqBody: ApplicationRegisterRequest): Promise<ApplicationRegisterResponse> {
        const jwt = req['user'];
        const email = jwt.payload.sub;
        const user = await this.userService.findByEmail(email);

        try {
            const application = await this.applicationService.create(reqBody.client_id, reqBody.redirect_url, user.id);
            return { client_id: application.client_id, client_secret: application.client_secret, redirect_url: application.redirect_url };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':client_id')
    public async update(@Request() req, @Param('client_id') client_id, @Body() reqBody: ApplicationUpdateRequest): Promise<ApplicationUpdateResponse> {
        const jwt = req['user'];
        const email = jwt.payload.sub;
        const user = await this.userService.findByEmail(email);

        try {
            const application = await this.applicationService.update(client_id, reqBody.client_id, reqBody.redirect_url, user.id);
            return { client_id: application.client_id, client_secret: application.client_secret, redirect_url: application.redirect_url };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':client_id')
    public async delete(@Request() req): Promise<ApplicationDeleteResponse> {
        const jwt = req['user'];
        const email = jwt.payload.sub;
        const user = await this.userService.findByEmail(email);

        try {
            const application = await this.applicationService.delete(req.params.client_id);
            return { client_id: application.client_id, redirect_url: application.redirect_url };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
