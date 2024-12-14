import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, BookDocument, ReviewDocument } from '../../../mongodb/schema';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
        @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
    ) {}

    async findAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findBooksByTitle(title: string): Promise<BookDocument[]> {
        return this.bookModel.find({ title: { $regex: title, $options: 'i' } }).exec();
    }

    async findBooksByGenre(genre: string): Promise<BookDocument[]> {
        return this.bookModel.find({ genre }).exec();
    }

    async findReviewsByBook(bookId: string): Promise<ReviewDocument[]> {
        return this.reviewModel.find({ book: bookId }).exec();
    }

    async findAllBooks(): Promise<BookDocument[]> {
        return this.bookModel.find().exec();
    }
}
