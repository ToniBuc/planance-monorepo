import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthenticationService } from "../authentication.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authenticationService: AuthenticationService
    ) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authenticationService.validateUser({ username, password });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}