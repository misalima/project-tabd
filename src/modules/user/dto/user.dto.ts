import { Schema } from 'mongoose';
import {
  IsString,
  IsEmail,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true })
  preferences: string[];

  @IsArray()
  @IsMongoId({ each: true })
  reviews: Schema.Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  readBooks: Schema.Types.ObjectId[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  reviews?: Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readBooks?: Schema.Types.ObjectId[];
}
