import { Module } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {BookModule} from "./modules/book/book.module";

@Module({
  imports: [BookModule],
  providers: [PrismaService],
})
export class AppModule {}
