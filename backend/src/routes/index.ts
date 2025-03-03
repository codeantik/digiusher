import express, { Router } from 'express';
import instancesRoute from './instances.routes';

const router: Router = express.Router();

const routes: { path: string; route: Router; middlewares?: any[] }[] = [
  { path: '/instances', route: instancesRoute },
];

routes.forEach(({ path, route, middlewares = [] }) => {
  router.use(path, ...middlewares, route);
});

export default router;
