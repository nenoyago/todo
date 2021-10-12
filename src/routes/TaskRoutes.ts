import { Router } from 'express';

import TaskController from '../controllers/TaskController';
import TaskValidation from '../middlewares/TaskValidation';

const router = Router();

router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.done);

router.delete('/:id', TaskController.delete);
router.get('/:id', TaskController.show);

router.get('/filter/all/:macAddress', TaskController.index);
router.get('/filter/late/:macAddress', TaskController.late);
router.get('/filter/today/:macAddress', TaskController.today);
router.get('/filter/week/:macAddress', TaskController.week);
router.get('/filter/month/:macAddress', TaskController.month);
router.get('/filter/year/:macAddress', TaskController.year);

export default router;