import { Router } from 'express';
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from './cars.controller.js';

const router = Router();

router.get('/', getAllCars);
router.post('/', createCar);
router.get('/:carId', getCarById);
router.put('/:carId', updateCar);
router.delete('/:carId', deleteCar);

export default router;
