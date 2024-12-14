import { AppModule } from "../../src/app.module";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { writeToJsonFile } from "../utils/fileUtils";

describe('Teste de Performance - Consulta de Dados (Reviews)', () => {
    let app;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Deve medir o tempo de busca de reviews por livro', async () => {
        let totalTime = 0;
        const details = [];

        const booksResponse = await request(app.getHttpServer()).get('/api/mongo/books').expect(200);
        const books = booksResponse.body;

        for (let i = 0; i < 10; i++) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            const bookId = randomBook._id;

            const startTime = performance.now();
            await request(app.getHttpServer()).get(`/api/mongo/reviews/by-book?bookId=${bookId}`).expect(200);
            const endTime = performance.now();

            const duration = endTime - startTime;
            totalTime += duration;

            details.push({ iteration: i + 1, duration: `${duration}ms` });
            console.log(`Iteração ${i + 1}: ${duration}ms`);
        }

        const averageTime = totalTime / 10;
        const testResults = {
            testSuite: 'Teste de Performance - Consulta de Dados (Reviews)',
            testName: 'Busca por livro',
            averageTime: `${averageTime}ms`,
            details,
        };

        writeToJsonFile(testResults);
        console.log(`Tempo médio: ${averageTime}ms`);
    });
});
