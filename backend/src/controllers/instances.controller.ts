import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import InstanceService from '../services/instances.services';
import { Instance } from '../models/mongodb/instances.model';

interface FilterParams {
  minRam?: number;
  maxRam?: number;
  minCpu?: number;
  maxCpu?: number;
  page: number;
  limit: number;
}

const filterInstances = catchAsync(async (req: Request, res: Response) => {
  const {
    cloudType,
    region,
    minRam,
    maxRam,
    minCpu,
    maxCpu,
    page = 1,
    limit = 30,
  } = req.query;

  // Convert query params properly

  const filters: FilterParams = {
    minRam: minRam ? Number(minRam) : undefined,
    maxRam: maxRam ? Number(maxRam) : undefined,
    minCpu: minCpu ? Number(minCpu) : undefined,
    maxCpu: maxCpu ? Number(maxCpu) : undefined,
    page: Math.max(Number(page) || 1, 1), // Ensure page is at least 1
    limit: Math.max(Number(limit) || 30, 1), // Ensure limit is at least 1
  };

  // Fetch instances
  const instances: Instance[] = await InstanceService.filterInstances(filters);

  // Return response
  res.status(httpStatus.OK).json({
    status: 'success',
    results: instances.length,
    data: instances,
    hasMore: instances.length === Math.max(Number(limit) || 30, 1),
  });
});

export { filterInstances };
