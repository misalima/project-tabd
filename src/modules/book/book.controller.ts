import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {BookService} from "./book.service";
import {CreateBookDto} from "./dto/createBook.dto";
import {UpdateBookDto} from "./dto/updateBook.dto";

@Controller('api/book')

export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getAllBooks() {
        return this.bookService.getAllBooks();
    }

    @Get(':id')
    async getBookById(@Param('id') id: string) {
        return this.bookService.getBookById(id);
    }

    @Get('title/:title')
    async getBookByTitle(@Param('title') title: string) {
        return this.bookService.getBookByTitle(title);
    }

    @Get('genre/:genre')
    async getBookByGenre(@Param('genre') genre: string) {
        return this.bookService.getBookByGenre(genre);
    }

    @Post()
    async createBook(@Body() data: CreateBookDto) {
        return this.bookService.createBook(data);
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.bookService.updateBook(id, data);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        return this.bookService.deleteBook(id);
    }
}