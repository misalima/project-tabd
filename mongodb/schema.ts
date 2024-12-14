import { Schema, Document } from 'mongoose';

export interface User {
    username: string;
    email: string;
    preferences: string[];
    reviews: Schema.Types.ObjectId[];
    readBooks: Schema.Types.ObjectId[];
}

export interface UserDocument extends User, Document {}

export const UserSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    preferences: [{ type: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    readBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

export interface Book {
    title: string;
    author: string;
    genre: string;
    description: string;
    publishedAt: string;
    readers: Schema.Types.ObjectId[];
    reviews: Schema.Types.ObjectId[];
}

export interface BookDocument extends Book, Document {}

export const BookSchema = new Schema<BookDocument>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    publishedAt: { type: String, required: true },
    readers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

export interface Review {
    rating: number;
    comment: string;
    bookId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
}

export interface ReviewDocument extends Review, Document {}

export const ReviewSchema = new Schema<ReviewDocument>({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
