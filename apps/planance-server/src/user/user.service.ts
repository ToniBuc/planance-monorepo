import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hashPassword } from "../utils/bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const dateOfRegistration = Date.now();
        const password = await hashPassword(registerUserDto.password);
        const user = new this.userModel({...registerUserDto, password, dateOfRegistration});
        return user.save();
    }

    getUsers() {
        return this.userModel.find();
    }

    getUserById(userId: string) {
        return this.userModel.findById(userId);
    }

    getUserByUsername(username: string) {
        return this.userModel.find({
            username: username
        });
    }

    updateUser(userId: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    }

    deleteUser(userId: string) {
        return this.userModel.findByIdAndDelete(userId);
    }
}