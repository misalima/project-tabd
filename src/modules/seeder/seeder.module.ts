import {Module} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import {SeederService} from "./seeder.service";
import {SeederController} from "./seeder.controller";

@Module({
    controllers: [SeederController],
    providers: [PrismaService, SeederService],
})

export class SeederModule {}