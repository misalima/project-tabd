import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the module global
      envFilePath: '.env',
    }),
  ],
})
export class ConfigurationModule {}
