import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService
    ) {

    }

    @Post('login')
    async login(
        @Body() authenticationDto: AuthenticationDto
    ) {
        const user = await this.authenticationService.validateUser(authenticationDto);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
