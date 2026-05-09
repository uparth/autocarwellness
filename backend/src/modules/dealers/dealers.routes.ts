import { Router } from 'express';
import { createDealer, deleteDealer, getAllDealers, getDealerById, updateDealer } from './dealers.controller.js';

const router = Router();

router.get('/', getAllDealers);
router.post('/', createDealer);
router.get('/:dealerId', getDealerById);
router.put('/:dealerId', updateDealer);
router.delete('/:dealerId', deleteDealer);

export default router;
