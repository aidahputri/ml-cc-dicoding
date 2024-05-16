import { Module } from '@nestjs/common';
import { PredictService } from './predict.service';
import { PredictController } from './predict.controller';
import { ModelService } from './model.service';
import { HistoriesService } from './histories.service';

@Module({
  controllers: [PredictController],
  providers: [PredictService, ModelService, HistoriesService],
})
export class PredictModule {}
