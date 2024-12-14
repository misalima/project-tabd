/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument, UserDocument } from 'mongodb/schema';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createBook(data: CreateBookDto) {
    const createdBook = new this.bookModel(data);
    return createdBook.save();
  }

  async updateBook(id: string, data: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async getTopRatedBooks(): Promise<Book[]> {
    const cacheKey = 'topRatedBooks';
    const cachedBooks = await this.cacheManager.get<Book[]>(cacheKey);
    if (cachedBooks) {
      return cachedBooks;
    }

    const books = await this.bookModel
      .find()
      .sort({ rating: -1 })
      .limit(10)
      .exec();
    await this.cacheManager.set(cacheKey, books, 300000); // Cache for 5 minutes return books;
  }

  async getUserRecommendations(userId: string): Promise<any> {
    const cacheKey = `userRecommendations:${userId}`;
    const cachedRecommendations = await this.cacheManager.get(cacheKey);
    if (cachedRecommendations) {
      return cachedRecommendations;
    }

    const recommendations = await this.generateRecommendations(userId); // Your logic to generate recommendations
    await this.cacheManager.set(cacheKey, recommendations, 60000);
  }

  async generateRecommendations(userId: string): Promise<any> {
    // Fetch the user's preferences
    const user = await this.userModel
      .findById(userId)
      .populate('readBooks')
      .exec();
    const userPreferences = user.preferences;

    // Fetch books that match user preferences
    const recommendedBooks = await this.bookModel
      .find({ genre: { $in: userPreferences } })
      .exec();

    return recommendedBooks;
  }
}
