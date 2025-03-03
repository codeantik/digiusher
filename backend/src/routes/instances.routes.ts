import express, { Router } from 'express';
import { filterInstances } from '../controllers/instances.controller';

const router: Router = express.Router();

router.get('/filter', filterInstances);

export default router;
