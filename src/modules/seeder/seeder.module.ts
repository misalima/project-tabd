import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import {BookSchema, ReviewSchema, UserSchema} from "../../../mongodb/schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Book', schema: BookSchema },
            { name: 'Review', schema: ReviewSchema },
        ]),
    ],
    providers: [SeederService],
    controllers: [SeederController],
})
export class SeederModule {}
