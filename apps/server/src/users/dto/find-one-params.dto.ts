import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, IsEmail, IsOptional, IsUUID } from 'class-validator'

export class FindOneParams {
  @IsUUID()
  @IsOptional({ always: true })
  @ApiProperty({ required: false })
  uuid?: string

  @IsEmail()
  @IsOptional({ always: true })
  @ApiProperty({ required: false })
  email?: string

  @IsAlphanumeric()
  @IsOptional({ always: true })
  @ApiProperty({ required: false })
  nickname?: string
}
