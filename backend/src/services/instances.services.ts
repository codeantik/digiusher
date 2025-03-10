import { FilterQuery } from 'mongoose';
import { Instance, InstanceModel } from '../models/mongodb/instances.model';

interface FilterParams {
  minRam?: number;
  maxRam?: number;
  minCpu?: number;
  maxCpu?: number;
  page?: number;
  limit?: number;
}

class InstanceService {
  /**
   * Filters instances based on query parameters without grouping
   * @param query - Object containing filter parameters (minRam, maxRam, minCpu, maxCpu, page, limit)
   * @returns {Promise<Instance[]>} - Returns a list of filtered instances
   */
  static async filterInstances(query: FilterParams): Promise<Instance[]> {
    const { minRam, maxRam, minCpu, maxCpu, page = 1, limit = 30 } = query;

    const filter: FilterQuery<Instance> = {};

    // Use MongoDB `$expr` to compare numerical values
    if (minCpu !== undefined || maxCpu !== undefined) {
      filter.$expr = {
        $and: [
          ...(minCpu !== undefined ? [{ $gte: [{ $toDouble: "$vcpu" }, minCpu] }] : []),
          ...(maxCpu !== undefined ? [{ $lte: [{ $toDouble: "$vcpu" }, maxCpu] }] : []),
        ],
      };
    }

    if (minRam !== undefined || maxRam !== undefined) {
      filter.$expr = {
        ...filter.$expr,
        $and: [
          ...(filter.$expr?.$and || []), // Preserve previous conditions
          ...(minRam !== undefined ? [{ $gte: [{ $toDouble: { $arrayElemAt: [{ $split: ["$memory", " "] }, 0] } }, minRam] }] : []),
          ...(maxRam !== undefined ? [{ $lte: [{ $toDouble: { $arrayElemAt: [{ $split: ["$memory", " "] }, 0] } }, maxRam] }] : []),
        ],
      };
    }

    const pageNumber = Math.max(page, 1);
    const pageSize = Math.max(limit, 1);
    const skip = (pageNumber - 1) * pageSize;

    const instances: Instance[] = await InstanceModel.find(filter)
      .sort({ memory: 1, vcpu: 1 }) // Ensure consistent sorting
      .skip(skip)
      .limit(pageSize)
      .select('-__v -createdAt -updatedAt -_id')
      .lean(); // Improve performance by returning plain JS objects

    return instances;
  }
}

export default InstanceService;
