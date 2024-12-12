import { Module } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {BookModule} from "./modules/book/book.module";
import { UserModule } from './modules/user/user.module';
import {ReviewsModule} from "./modules/reviews/reviews.module";
import {SeederModule} from "./modules/seeder/seeder.module";

@Module({
  imports: [BookModule, UserModule, ReviewsModule, SeederModule],
  providers: [PrismaService],
})
export class AppModule {}
