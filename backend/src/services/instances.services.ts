import { FilterQuery } from "mongoose";
import { Instance, InstanceModel } from "../models/mongodb/instances.model";

interface FilterParams {
  minRam?: number;
  maxRam?: number;
  minCpu?: number;
  maxCpu?: number;
  page: number;
  limit: number;
}

class InstanceService {
  /**
   * Filters instances based on query parameters without grouping
   * @param query - Object containing filter parameters (minRam, maxRam, minCpu, maxCpu, page, limit)
   * @returns {Promise<Instance[]>} - Returns a list of filtered instances
   */
  static async filterInstances(query: FilterParams): Promise<Instance[]> {
    const { minRam, maxRam, minCpu, maxCpu, page, limit } = query;

    const filter: FilterQuery<any> = {};

    if (minRam !== undefined || maxRam !== undefined) {
      filter.memory = {
        ...(minRam !== undefined ? { $gte: minRam } : {}),
        ...(maxRam !== undefined ? { $lte: maxRam } : {}),
      };
    }

    if (minCpu !== undefined || maxCpu !== undefined) {
      filter.vcpu = {
        ...(minCpu !== undefined ? { $gte: minCpu } : {}),
        ...(maxCpu !== undefined ? { $lte: maxCpu } : {}),
      };
    }

    const pageNumber = Math.max(page || 1, 1); // Ensure valid page number
    const pageSize = Math.max(limit || 30, 1); // Ensure valid page size
    const skip = (pageNumber - 1) * pageSize;

    const instances: Instance[] = await InstanceModel.find(filter)
      .sort({ memory: 1, vcpu: 1 })
      .skip(skip)
      .limit(pageSize)
      .select("-__v -createdAt -updatedAt -_id"); // Exclude _v, createdAt, updatedAt, and _id fields

    return instances;
  }
}

export default InstanceService;