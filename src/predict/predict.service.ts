import { BadRequestException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { ModelService } from './model.service';
import { randomUUID } from 'crypto';

@Injectable()
export class PredictService {
  constructor(private readonly modelService: ModelService) { }

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

      return data
    } catch (err) {
      throw new BadRequestException({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi"
      })
    }
  }
}
