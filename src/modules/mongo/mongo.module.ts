import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, BookSchema, ReviewSchema } from '../../../mongodb/schema';
import {MongoController} from "./mongo.controller";
import {MongoService} from "./mongo.service";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Book', schema: BookSchema },
            { name: 'Review', schema: ReviewSchema },
        ]),
    ],
    controllers: [MongoController],
    providers: [MongoService],
})
export class MongoModule {}
