import { Request, Response } from 'express';
import prisma from '../../config/db.js';

export const getAllDealers = async (_req: Request, res: Response) => {
  const dealers = await prisma.dealer.findMany({
    include: { cars: { select: { id: true } } }
  });

  const formatted = dealers.map((dealer) => ({
    ...dealer,
    carsCount: dealer.cars.length,
  }));

  res.status(200).json(formatted);
};

export const createDealer = async (req: Request, res: Response) => {
  const { dealerName, dealerAddressLine1, dealerAddressLine2, city, state, pincode } = req.body;

  const dealer = await prisma.dealer.create({
    data: {
      dealerName,
      dealerAddressLine1,
      dealerAddressLine2,
      city,
      state,
      pincode
    }
  });

  res.status(201).json(dealer);
};

export const getDealerById = async (req: Request, res: Response) => {
  const dealer = await prisma.dealer.findUnique({
    where: { id: req.params.dealerId },
    include: { cars: true }
  });

  if (!dealer) {
    return res.status(404).json({ message: 'Dealer not found' });
  }

  res.status(200).json(dealer);
};

export const updateDealer = async (req: Request, res: Response) => {
  const { dealerName, dealerAddressLine1, dealerAddressLine2, city, state, pincode } = req.body;

  const dealer = await prisma.dealer.update({
    where: { id: req.params.dealerId },
    data: {
      dealerName,
      dealerAddressLine1,
      dealerAddressLine2,
      city,
      state,
      pincode
    }
  });

  res.status(200).json(dealer);
};

export const deleteDealer = async (req: Request, res: Response) => {
  await prisma.dealer.delete({ where: { id: req.params.dealerId } });
  res.status(200).json({ message: 'Dealer deleted successfully' });
};
