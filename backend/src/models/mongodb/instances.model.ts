import mongoose from 'mongoose';

interface Instance {
  id: string;
  unit: string;
  pricePerUnit: string;
  vcpu: string;
  memory: string;
  location: string;
  instanceType: string;
}

const InstanceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    unit: { type: String, required: true },
    pricePerUnit: { type: String, required: true },
    vcpu: { type: String, required: true },
    memory: { type: String, required: true },
    location: { type: String, required: true },
    instanceType: { type: String, required: true },
  },
  { timestamps: true },
);

const InstanceModel = mongoose.model('Instance', InstanceSchema);

export { Instance, InstanceModel };
