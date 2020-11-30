import { ApiProperty, OmitType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty({ required: false })
  uuid: string

  @ApiProperty({ required: false })
  nickname: string
}
