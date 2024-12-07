import {IsNotEmpty, IsString} from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({message: 'Title is required'})
    @IsString({message: 'Title must be a string'})
    title: string;

    @IsNotEmpty({message: 'Author is required'})
    @IsString({message: 'Author must be a string'})
    author: string;

    @IsNotEmpty({message: 'Genre is required'})
    @IsString({message: 'Genre must be a string'})
    genre: string;

    @IsNotEmpty({message: 'Description is required'})
    @IsString({message: 'Description must be a string'})
    description: string;

    @IsNotEmpty({message: 'Published at is required'})
    @IsString({message: 'Published at must be a string'})
    publishedAt: string;
}