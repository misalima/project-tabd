import {Module} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import {BookController} from "./book.controller";
import {BookService} from "./book.service";

@Module({
    controllers: [BookController],
    providers: [PrismaService, BookService],
    exports: [BookService]
})

export class BookModule {}