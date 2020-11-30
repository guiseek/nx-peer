import { Model } from 'mongoose'
import { createHmac } from 'crypto'
import { InjectModel } from '@nestjs/mongoose'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ChangePasswordDto } from './dto/change-password.dto'
import { User, UserDocument } from './schemas/user.schema'
import { FindOneParams } from './dto/find-one-params.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create({ password, ...data }: CreateUserDto) {
    password = this.encrypt(password)
    return new this.userModel({ password, ...data }).save()
  }

  findAll() {
    return this.userModel.find().select('-password').exec()
  }

  findById(id: string) {
    return this.userModel.findById(id).select('-password').exec()
  }

  findOne(props: FindOneParams) {
    return this.userModel.findOne(props).select('-password')
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ id }, updateUserDto)
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id })
  }

  async changePassword(id: string, change: ChangePasswordDto) {
    const user = await this.userModel.findById(id).select('password')
    const pass = this.encrypt(change.password)
    if (!(user.password === pass)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    return this.updatePassword(id, change.newPassword)
  }

  private updatePassword(id: string, newPassword: string) {
    const password = this.encrypt(newPassword)
    return this.userModel.updateOne({ id }, { password })
  }

  private encrypt(password: string) {
    return createHmac('sha256', password).digest('hex')
  }
}
