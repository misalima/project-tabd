import {AppModule} from "../../src/app.module";
import {Test} from "@nestjs/testing";
import * as request from "supertest";
import {BookService} from "../../src/modules/book/book.service";
import {writeToJsonFile} from "../utils/fileUtils";

describe('Teste de Performance - Consulta de Dados (Reviews)', () => {
    let app;
    let bookService;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        bookService = moduleFixture.get<BookService>(BookService);
        await app.init();
    });

    it('Deve medir o tempo de busca de reviews por livro', async () => {
        let totalTime = 0;
        const details = [];

        const books = await bookService.getAllBooks();
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * books.length);
            const randomBook = books[randomIndex];
            const bookId = randomBook.id;

            const startTime = performance.now();
            await request(app.getHttpServer()).get(`/api/review/book/${bookId}`).expect(200);
            const endTime = performance.now();

            const duration = endTime - startTime;
            totalTime += duration;

            details.push({iteration: i + 1, duration: duration + "ms"});

            console.log(`Iteração ${i + 1}: ${duration}ms`);
        }

        const averageTime = totalTime / 10;

        const testResults = {
            testSuite: 'Teste de Performance - Consulta de Dados (Reviews)',
            testName: 'Deve medir o tempo de busca de reviews por livro',
            averageTime: averageTime + "ms",
            details: details
        };

        writeToJsonFile(testResults);

        console.log(`Tempo de execução: ${averageTime}ms`);
    });
})