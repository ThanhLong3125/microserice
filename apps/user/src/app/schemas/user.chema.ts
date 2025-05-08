import { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, type: String })
    name: string;
    @Prop({ required: true, unique: true , type: String})
    email: string;
    @Prop({ required: true , type: String})
    password: string;
    @Prop({ required: true , type: String})
    role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
