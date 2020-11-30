import { ApiProperty, PickType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { MinLength } from 'class-validator'

export class ChangePasswordDto extends PickType(CreateUserDto, ['password']) {
  @ApiProperty({ required: true })
  @MinLength(6)
  newPassword: string
}
