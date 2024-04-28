import { Injectable } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(authenticationDto: AuthenticationDto) {
        const { username, password } = authenticationDto;
        
        // consider using userService method for this 
        const user = await this.userModel.findOne({
            username: username
        });

        if (!user) {
            return null;
        }

        const correctPassword = await comparePasswords(password, user.password);
        if (correctPassword) {
            return this.jwtService.sign({
                _id: user._id,
                username: user.username
            });
        }
    }
}
