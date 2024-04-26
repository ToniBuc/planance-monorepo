import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false})
    displayName?: string;

    @Prop({ required: false})
    avatarUrl?: string;

    @Prop({required: true})
    dateOfRegistration: number;

    @Prop({required: false})
    groups?: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);