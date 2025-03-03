import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import InstanceService from '../services/instances.services';
import { Instance } from '../models/mongodb/instances.model';

const filterInstances = catchAsync(async (req: Request, res: Response) => {
  const query: any = req.query;
  const instances: Instance[] | null = await InstanceService.filterInstances(
    query,
  );

  if (!instances) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Error while filtering instances',
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: instances,
  });
});

export { filterInstances };
