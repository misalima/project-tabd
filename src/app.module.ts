import { Module } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {BookModule} from "./modules/book/book.module";
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BookModule, ReviewsModule],
  providers: [PrismaService],
})
export class AppModule {}
