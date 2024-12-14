/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from 'mongodb/schema';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('top-rated') async getTopRatedBooks(): Promise<Book[]> {
    return this.bookService.getTopRatedBooks();
  }

  @Post()
  async createBook(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.bookService.updateBook(id, data);
  }

  @Get('recommendations/:userId')
  async getUserRecommendations(@Param('userId') userId: string): Promise<any> {
    return this.bookService.getUserRecommendations(userId);
  }
}
