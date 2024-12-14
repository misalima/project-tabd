import { Controller, Get, Query } from '@nestjs/common';
import {MongoService} from "./mongo.service";


@Controller('api/mongo')
export class MongoController {
    constructor(private readonly mongoService: MongoService) {}

    @Get('users')
    async getAllUsers() {
        return this.mongoService.findAllUsers();
    }

    @Get('books/by-title')
    async getBooksByTitle(@Query('title') title: string) {
        return this.mongoService.findBooksByTitle(title);
    }

    @Get('books/by-genre')
    async getBooksByGenre(@Query('genre') genre: string) {
        return this.mongoService.findBooksByGenre(genre);
    }

    @Get('reviews/by-book')
    async getReviewsByBook(@Query('bookId') bookId: string) {
        return this.mongoService.findReviewsByBook(bookId);
    }

    @Get('books')
    async getAllBooks() {
        return this.mongoService.findAllBooks();
    }
}
