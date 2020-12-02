import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return { uri: config.get('MONGO_URI') }
      },
      inject: [ConfigService]
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
