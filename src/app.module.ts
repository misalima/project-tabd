/* eslint-disable @typescript-eslint/no-require-imports */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SeederModule } from './modules/seeder/seeder.module';
import {MongoModule} from "./modules/mongo/mongo.module";
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Make the module global
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongoModule,
    BookModule,
    UserModule,
    ReviewsModule,
    SeederModule,
  ],
})
export class AppModule {}
