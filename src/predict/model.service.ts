import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node'

@Injectable()
export class ModelService {
  private model: tf.GraphModel

  async predict(img: Uint8Array) {
    if (!this.model) {
      this.model = await tf.loadGraphModel(process.env.MODEL_PUBLIC_URL)
    }

    const tensor = tf.node
      .decodeJpeg(img)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = this.model.predict(tensor) as tf.Tensor;
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const result = confidenceScore > 50 ? "Cancer" : "Non-cancer"

    return result
  }
}
