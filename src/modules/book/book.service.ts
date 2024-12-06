import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import {CreateBookDto} from "./dto/createBook.dto";
import {UpdateBookDto} from "./dto/updateBook.dto";

@Injectable()
export class BookService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllBooks() {
        return this.prismaService.book.findMany();
    }

    async getBookById(id: string) {
        return this.prismaService.book.findUnique({
            where: {id}
        });
    }

    async createBook(data: CreateBookDto) {
        return this.prismaService.book.create({
            data:{
                ...data,
                publishedAt: data.publishedAt
            }});
    }

    async updateBook(id: string, data: UpdateBookDto) {
        return this.prismaService.book.update({
            where: {id},
            data
        });
    }

    async deleteBook(id: string) {
        return this.prismaService.book.delete({
            where: {id}
        });
    }
}