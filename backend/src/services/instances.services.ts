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

    if (minRam || maxRam) {
      filter.memoryAsNumber = {
        ...(minRam ? { $gte: minRam } : {}),
        ...(maxRam ? { $lte: maxRam } : {}),
      };
    }

    if (minCpu || maxCpu) {
      filter.vcpuAsNumber = {
        ...(minCpu ? { $gte: minCpu } : {}),
        ...(maxCpu ? { $lte: maxCpu } : {}),
      };
    }

    const pageNumber = Math.max(page || 1, 1); // Ensure valid page number
    const pageSize = Math.max(limit || 30, 1); // Ensure valid page size
    const skip = (pageNumber - 1) * pageSize;

    const instances: Instance[] = await InstanceModel.aggregate([
      {
        $addFields: {
          vcpuAsNumber: { $toInt: "$vcpu" },
          memoryAsNumber: {
            $toDouble: {
              $replaceAll: {
                input: "$memory",
                find: " GiB",
                replacement: "",
              },
            },
          },
          pricePerUnitAsNumber: { $toDouble: "$pricePerUnit" },
        },
      },
      { $match: filter },
      { $sort: { memoryAsNumber: 1, vcpuAsNumber: 1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    return instances;
  }
}

export default InstanceService;
