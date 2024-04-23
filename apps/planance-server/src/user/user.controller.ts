import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':userId')
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
    @UsePipes(new ValidationPipe())
    registerUser(
        @Body() registerUserDto: RegisterUserDto
    ) {
        registerUserDto.dateOfRegistration = Date.now();
        return this.userService.registerUser(registerUserDto);
    }

    @Patch(':userId')
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