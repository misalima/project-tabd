import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import {
  BookDocument,
  ReviewDocument,
  UserDocument,
} from '../../../mongodb/schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async seedUsers() {
    await this.userModel.deleteMany();
    await this.reviewModel.deleteMany();

    const users = [];
    const emails = new Set();
    const usernames = new Set();

    while (users.length < 10000) {
      let username = faker.internet.username();
      let email = faker.internet.email();

      // Ensure unique username
      while (usernames.has(username)) {
        username = faker.internet.username();
      }
      usernames.add(username);

      // Ensure unique email
      while (emails.has(email)) {
        email = faker.internet.email();
      }
      emails.add(email);

      users.push({
        username,
        email,
        preferences: [
          faker.helpers.arrayElement(['action', 'comedy', 'drama', 'horror']),
        ],
      });
    }

    await this.userModel.insertMany(users);
    console.log('Users seeded successfully');
  }

  async seedBooks() {
    await this.bookModel.deleteMany();

    const books = Array.from({ length: 10000 }).map(() => ({
      title: faker.commerce.productName(),
      author: faker.person.firstName(),
      genre: faker.helpers.arrayElement([
        'action',
        'comedy',
        'drama',
        'horror',
      ]),
      description: faker.lorem.paragraph(),
      publishedAt: faker.date.past().toString(),
    }));

    await this.bookModel.insertMany(books);
    console.log('Books seeded successfully');
  }

  async seedReviews() {
    const users = await this.userModel.find();
    const books = await this.bookModel.find();

    const reviews = Array.from({ length: 10000 }).map(() => ({
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      bookId: books[faker.number.int({ min: 0, max: books.length - 1 })]._id,
      userId: users[faker.number.int({ min: 0, max: users.length - 1 })]._id,
    }));

    await this.reviewModel.insertMany(reviews);
    console.log('Reviews seeded successfully');
  }

  async runSeed() {
    await this.seedUsers();
    await this.seedBooks();
    await this.seedReviews();
    console.log('All data seeded successfully');
  }
}
