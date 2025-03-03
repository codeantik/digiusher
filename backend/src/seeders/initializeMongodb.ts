import axios from 'axios';
import { InstanceModel } from '../models/mongodb/instances.model';

export const initializeMongodb = async (): Promise<void> => {
  try {
    console.log('initalizing MongoDB with instance data ------------------');
    const url =
      'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/20250113201859/eu-west-1/index.json';
    const { data } = await axios.get(url);

    const onDemand = data.terms.OnDemand;
    const instances = Object.values(data.products)
      .filter((instance: any) => instance.productFamily === 'Database Instance')
      .flatMap((instance: any) => {
        const attributes = instance.attributes;
        const pricingData = onDemand[instance.sku];

        return Object.values(pricingData || {}).flatMap((subtype: any) =>
          Object.values(subtype.priceDimensions).map((priceData: any) => ({
            id: priceData.rateCode,
            unit: priceData.unit,
            pricePerUnit: parseFloat(priceData.pricePerUnit.USD),
            vcpu: attributes.vcpu,
            memory: attributes.memory,
            location: attributes.location,
            instanceType: attributes.instanceType,
          })),
        );
      });

    if (instances.length === 0) {
      console.warn('No valid instance data found.');
      return;
    }

    await InstanceModel.deleteMany();
    await InstanceModel.insertMany(instances);

    console.log(`Inserted ${instances.length} documents into MongoDB`);
  } catch (error: any) {
    console.error('Error initializing Mongodb', error.message);
  }
};
