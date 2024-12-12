import * as fs from "node:fs";
import * as path from "node:path";

export const writeToJsonFile = (data: unknown) => {
    const filePath = path.resolve('./test/performance_results.json');
    let fileContent: unknown[] = [];

    if (fs.existsSync(filePath)) {
        const currentContent = fs.readFileSync(filePath, 'utf8');

        if (currentContent.trim() !== '') {
            try {
                fileContent = JSON.parse(currentContent);
            } catch (e) {
                console.error('Erro ao parsear o JSON do arquivo:', e);
                fileContent = [];
            }
        }
    }

    fileContent.push(data);

    fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf8');
};
