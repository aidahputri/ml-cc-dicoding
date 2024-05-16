import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictModule } from './predict/predict.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PredictModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
