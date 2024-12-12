import {SeederService} from "../../src/modules/seeder/seeder.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";
import {writeToJsonFile} from "../utils/fileUtils";

describe('Teste de Performance - Inserção de Dados (Usuários, Livros, Reviews)', () => {
    jest.setTimeout(30000);
    let seederService: SeederService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        seederService = moduleFixture.get<SeederService>(SeederService);
    });

    it('Deve medir o tempo de inserção de usuários, livros e reviews', async () => {
        const startTime = performance.now();
        await seederService.runSeed();
        const endTime = performance.now();

        const duration = endTime - startTime;

        const testResults = {
            testSuite: 'Teste de Performance - Inserção de Dados (Usuários, Livros, Reviews)',
            testName: 'Deve medir o tempo de inserção de usuários, livros e reviews',
            duration: duration + "ms",
        };

        writeToJsonFile(testResults);

        console.log(`Tempo de execução: ${duration}ms`);
    });
});