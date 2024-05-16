import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class HistoriesService {
  async storeData(id: string, data: any) {
    const db = new Firestore();

    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
  }

  async getHistoriesData() {
    const db = new Firestore();

    const predictCollection = db.collection('prediction');
    const snapshots = await predictCollection.get();

    const data = snapshots.docs.map((doc) => ({
      id: doc.id,
      history: doc.data()
    }))

    return data
  }
}
