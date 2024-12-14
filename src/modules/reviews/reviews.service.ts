import { Injectable } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from './dto/reviews.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from 'mongodb/schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
  ) {}
  async createReview(data: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(data);
    return createdReview.save();
  }
  async updateReview(id: string, data: UpdateReviewDto): Promise<Review> {
    return this.reviewModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
