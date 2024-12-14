import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SeederModule } from './modules/seeder/seeder.module';
import {MongoModule} from "./modules/mongo/mongo.module";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the module global
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongoModule,
    BookModule,
    UserModule,
    ReviewsModule,
    SeederModule
  ],
})
export class AppModule {}
