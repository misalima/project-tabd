import {SeederService} from "../../src/modules/seeder/seeder.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";

describe('Teste de Performance - Inserção de Dados (Usuários, Livros, Reviews)', () => {
    let seederService: SeederService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        seederService = moduleFixture.get<SeederService>(SeederService);
    });

    it('Deve medir o tempo de inserção de usuários, livros e reviews', async () => {
        let totalTime = 0;

        for (let i = 0; i < 10; i++) {
            const startTime = performance.now();
            await seederService.runSeed();
            const endTime = performance.now();
            const duration = endTime - startTime;
            totalTime += duration;

            console.log(`Iteração ${i + 1}: ${duration} ms`);
        }

        const averageTime = totalTime / 10;

        console.log(`Tempo de execução: ${averageTime}ms`);
    });
});