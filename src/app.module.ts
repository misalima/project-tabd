import { Module } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {BookModule} from "./modules/book/book.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [BookModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
