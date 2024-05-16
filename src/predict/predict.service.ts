import { BadRequestException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { ModelService } from './model.service';
import { randomUUID } from 'crypto';
import { HistoriesService } from './histories.service';

@Injectable()
export class PredictService {
  constructor(private readonly modelService: ModelService, private readonly historiesService: HistoriesService) { }

  async predict(img: Express.Multer.File) {
    if (img.size > 1000000) {
      throw new PayloadTooLargeException({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000"
      })
    }

    try {
      const result = await this.modelService.predict(img.buffer)
      const suggestion = result === "Cancer" ? "Terdeteksi kanker. Segera periksakan diri Anda!" : "Tidak terdeteksi kanker"

      const data = {
        id: randomUUID(),
        result,
        suggestion,
        createdAt: new Date().toISOString()
      }

      await this.historiesService.storeData(data.id, data)

      return data
    } catch (err) {
      console.log(err)
      throw new BadRequestException({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi"
      })
    }
  }

  async predictHistories() {
    return this.historiesService.getHistoriesData()
  }
}
