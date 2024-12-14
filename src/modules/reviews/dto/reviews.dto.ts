import { Schema } from 'mongoose';
import {
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsMongoId()
  bookId: Schema.Types.ObjectId;

  @IsMongoId()
  userId: Schema.Types.ObjectId;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsMongoId()
  bookId?: Schema.Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  userId?: Schema.Types.ObjectId[];
}
