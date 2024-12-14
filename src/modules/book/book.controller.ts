import {Body, Controller, Param, Post, Put} from "@nestjs/common";
import {BookService} from "./book.service";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";

@Controller('api/book')

export class BookController {
    constructor(private readonly bookService: BookService) {}

    
    @Post()
    async createBook(@Body() data: CreateBookDto) {
        return this.bookService.createBook(data);
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.bookService.updateBook(id, data);
    }

   
}