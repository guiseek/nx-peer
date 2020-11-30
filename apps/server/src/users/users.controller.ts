import {
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FindOneParams } from './dto/find-one-params.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get('find-one')
  findOne(@Query() query: FindOneParams) {
    return this.usersService.findOne(query)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.usersService.changePassword(id, changePasswordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
