import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
    constructor(private readonly prismaService: PrismaService) {}

    async seedUsers() {
        await this.prismaService.review.deleteMany();
        await this.prismaService.user.deleteMany();

        const users = Array.from({length: 10000}).map(() => ({
            username: faker.internet.username(),
            email: faker.internet.email(),
            preferences: [faker.helpers.arrayElement(["action", "comedy", "drama", "horror"])],
        }));

        await this.prismaService.user.createMany({
            data: users,
            skipDuplicates: true,
        });
    }

    async seedBooks() {
        await this.prismaService.book.deleteMany();

        const books = Array.from({length: 6000}).map(() => ({
            title: faker.commerce.productName(),
            author: faker.person.firstName(),
            genre: faker.helpers.arrayElement(["action", "comedy", "drama", "horror"]),
            description: faker.lorem.paragraph(),
            publishedAt: faker.date.past().toString(),
        }));

        await this.prismaService.book.createMany({
            data: books,
        });
    }

    async seedReviews() {
        const users = await this.prismaService.user.findMany();
        const books = await this.prismaService.book.findMany();

        const reviews = Array.from({length: 12000}).map(() => ({
            rating: faker.number.int({min: 1, max: 5}),
            comment: faker.lorem.sentence(),
            bookId: books[faker.number.int({min: 0, max: books.length - 1})].id,
            userId: users[faker.number.int({min: 0, max: users.length - 1})].id,
        }));

        await this.prismaService.review.createMany({
            data: reviews,
        });
    }
    
    async runSeed() {
        await this.seedUsers();
        await this.seedBooks();
        await this.seedReviews();
    }
}