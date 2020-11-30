import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  uuid: string

  @IsNotEmpty()
  @ApiProperty()
  nickname: string

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  photo?: string;
}
