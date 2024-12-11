import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Controller('api/review')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  async findAll() {
    return this.reviewsService.getAllReviews();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.getReviewById(id);
  }

  @Get('book/:bookId')
  async findByBookId(@Param('bookId') bookId: string) {
      return this.reviewsService.getReviewByBookId(bookId);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
      return this.reviewsService.getReviewByUserId(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.deleteReview(id);
  }
}
