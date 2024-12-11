import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new review
  async createReview(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
    });
  }

  // Get all reviews
  async getAllReviews() {
    return this.prisma.review.findMany({
      include: { book: true, user: true },
    });
  }

  // Get a review by ID
  async getReviewById(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { book: true, user: true },
    });
  }

  // Update a review by ID
  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  // Delete a review by ID
  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}