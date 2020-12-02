// import { User as UserEntity } from './../entities/user.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({
  collection: 'users',
  timestamps: {
    updatedAt: true,
    createdAt: true,
  },
})
export class User {
  @Prop({
    unique: true,
    type: String,
    required: true,
  })
  uuid: string

  @Prop({
    type: String,
    minlength: 6,
    required: true,
  })
  password: string

  @Prop({ type: String, required: true })
  nickname: string

  @Prop({ type: String, required: false })
  name?: string

  @Prop({ type: String, required: false })
  email?: string

  @Prop({ type: String, required: false })
  phone?: string

  @Prop({ type: String, required: false })
  photo?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
