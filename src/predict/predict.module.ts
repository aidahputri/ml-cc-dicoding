import { Module } from '@nestjs/common';
import { PredictService } from './predict.service';
import { PredictController } from './predict.controller';
import { ModelService } from './model.service';

@Module({
  controllers: [PredictController],
  providers: [PredictService, ModelService],
})
export class PredictModule {}
