import { Controller, Get } from '@nestjs/common';
import { uuid } from './utils/uuid';

@Controller('')
export class AppController {

  @Get('uuid')
  getUuid() {
    return { uuid: uuid() }
  }

}
