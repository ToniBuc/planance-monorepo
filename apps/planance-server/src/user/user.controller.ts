import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../authentication/guards/jwt.guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    async getUserById(
        @Param('userId') userId: string
    ) {
        const validId = mongoose.Types.ObjectId.isValid(userId);

        if (!validId) {
            throw new BadRequestException('Specified user ID is not valid.');
        }

        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('User with specified ID not found.');
        }

        return user;
    }

    @Get('username/:username')
    @UseGuards(JwtAuthGuard)
    getUserByUsername(
        @Param('username') username: string
    ) {
        const user = this.userService.getUserByUsername(username);
        
        if (!user) {
            throw new NotFoundException('User with specified username not found.');
        }

        return user;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    registerUser(
        @Body() registerUserDto: RegisterUserDto
    ) {
        return this.userService.registerUser(registerUserDto);
    }

    @Patch(':userId')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async updateUser(
        @Param('userId') userId: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        const validId = mongoose.Types.ObjectId.isValid(userId);

        if (!validId) {
            throw new BadRequestException('Specified user ID is not valid.');
        }

        const updatedUser = await this.userService.updateUser(userId, updateUserDto);

        if (!updatedUser) {
            throw new NotFoundException('User with specified ID not found.');
        }

        return updatedUser;
    }

    @Delete(':userId')
    @UseGuards(JwtAuthGuard)
    async deleteUser(
        @Param('userId') userId: string
    ) {
        const validId = mongoose.Types.ObjectId.isValid(userId);

        if (!validId) {
            throw new BadRequestException('Specified user ID is not valid.');
        }

        const deletedUser = await this.userService.deleteUser(userId);

        if (!deletedUser) {
            throw new NotFoundException('User with specified ID not found.');
        }

        return deletedUser;
    }

}