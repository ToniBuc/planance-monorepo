import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../schemas/user.schema";
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
  }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '30 minutes'
      }
    }),
    PassportModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthenticationModule {}
