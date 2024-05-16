import { Controller } from '@nestjs/common';
import { PredictService } from './predict.service';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}
}
