import {Test} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";
import * as request from "supertest";
import {writeToJsonFile} from "../utils/fileUtils";

describe('Teste de Performance - Consulta de Dados (Usuários)', () => {
    let app;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Deve medir o tempo de consulta de usuários', async () => {
        let totalTime = 0;
        const details = [];

        for (let i = 0; i < 10; i++) {
            const startTime = performance.now();
            await request(app.getHttpServer()).get('/api/user').expect(200);
            const endTime = performance.now();

            const duration = endTime - startTime;
            totalTime += duration;

            details.push({iteration: i + 1, duration: duration + "ms"});

            console.log(`Iteração ${i + 1}: ${duration}ms`);
        }

        const averageTime = totalTime / 10;

        const testResults = {
            testSuite: 'Teste de Performance - Consulta de Dados (Usuários)',
            testName: 'Deve medir o tempo de consulta de usuários',
            averageTime: averageTime + "ms",
            details: details
        };

        writeToJsonFile(testResults);

        console.log(`Tempo de execução: ${averageTime}ms`);
    });
})