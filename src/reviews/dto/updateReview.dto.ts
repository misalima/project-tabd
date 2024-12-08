import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
