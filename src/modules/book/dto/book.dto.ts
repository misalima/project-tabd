import { Schema } from 'mongoose';
import {
  IsString,
  IsArray,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  publishedAt: string;

  @IsArray()
  @IsMongoId({ each: true })
  readers: Schema.Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  reviews: Schema.Types.ObjectId[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readers?: Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  reviews?: Schema.Types.ObjectId[];
}
