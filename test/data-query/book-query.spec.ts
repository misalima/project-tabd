import {AppModule} from "../../src/app.module";
import {Test} from "@nestjs/testing";
import * as request from "supertest";
import {faker} from "@faker-js/faker";
import {writeToJsonFile} from "../utils/fileUtils";

describe('Teste de Performance - Consulta de Dados (Livros)', () => {
    let app;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Deve medir o tempo de busca de livros por título', async () => {
        let totalTime = 0;
        const details = [];

        for (let i = 0; i < 10; i++) {
            const title = faker.lorem.words(3);

            const startTime = performance.now();
            await request(app.getHttpServer()).get(`/api/book/?title=${title}`).expect(200);
            const endTime = performance.now();

            const duration = endTime - startTime;
            totalTime += duration;

            details.push({iteration: i + 1, duration: duration + "ms"});

            console.log(`Iteração ${i + 1}: ${duration}ms`);
        }

        const averageTime = totalTime / 10;

        const testResults = {
            testSuite: 'Teste de Performance - Consulta de Dados (Livros)',
            testName: 'Deve medir o tempo de busca de livros por título',
            averageTime: averageTime + "ms",
            details: details
        };

        writeToJsonFile(testResults);

        console.log(`Tempo de execução(busca por título): ${averageTime}ms`);
    });

    it ('Deve medir o tempo de busca de livros por gênero', async () => {
        let totalTime = 0;
        const details = [];

        for (let i = 0; i < 10; i++) {
            const genre = faker.helpers.arrayElement(['Ficção', 'Aventura', 'Romance', 'Terror', 'Fantasia']);

            const startTime = performance.now();
            await request(app.getHttpServer()).get(`/api/book/?genre=${genre}`).expect(200);
            const endTime = performance.now();

            const duration = endTime - startTime;
            totalTime += duration;

            details.push({iteration: i + 1, duration: duration + "ms"});

            console.log(`Iteração ${i + 1}: ${duration}ms`);
        }

        const averageTime = totalTime / 10;

        const testResults = {
            testSuite: 'Teste de Performance - Consulta de Dados (Livros)',
            testName: 'Deve medir o tempo de busca de livros por gênero',
            averageTime: averageTime + "ms",
            details: details
        };

        writeToJsonFile(testResults);

        console.log(`Tempo de execução (busca por gênero): ${averageTime}ms`);
    })
})