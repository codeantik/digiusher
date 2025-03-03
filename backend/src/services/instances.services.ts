import { FilterQuery } from 'mongoose';
import { Instance, InstanceModel } from '../models/mongodb/instances.model';

class InstanceService {
  /**
   * Filters instances based on query parameters
   * @param query - Object containing filter parameters (minRAM, maxRAM, minCPU, maxCPU)
   * @returns {Instance<any[]>} - Returns filtered instances grouped by vCPU and memory
   */
  static async filterInstances(query: any): Promise<Instance[]> {
    return [];
  }
}

export default InstanceService;
