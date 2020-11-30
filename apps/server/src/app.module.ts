import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

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
  controllers: [],
  providers: [],
})
export class AppModule {}
