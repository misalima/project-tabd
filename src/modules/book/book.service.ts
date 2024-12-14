import {Injectable} from "@nestjs/common";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookDocument } from "mongodb/schema";

@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private readonly bookModel: Model<BookDocument>) {}
    
    async createBook(data: CreateBookDto) {
        const createdBook = new this.bookModel(data);
        return createdBook.save();
    }

    async updateBook(id: string, data: UpdateBookDto) {
        return this.bookModel.findByIdAndUpdate(id, data, { new: true}).exec();
    }
    
}