import {Controller, Get} from "@nestjs/common";
import {SeederService} from "./seeder.service";

@Controller("api/seed")

export class SeederController {
    constructor(private readonly seederService: SeederService) {}

    @Get()
    async seedData() {
        await this.seederService.runSeed();
        return {message: "Data seeded successfully"};
    }
}