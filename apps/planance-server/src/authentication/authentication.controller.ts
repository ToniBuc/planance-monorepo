import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('authentication')
export class AuthenticationController {

    constructor() {

    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(
        @Req() req: Request
    ) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(
        @Req() req: Request
    ) {
        return req.user;
    }
}
