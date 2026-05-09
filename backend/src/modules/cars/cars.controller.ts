import { Request, Response } from 'express';
import prisma from '../../config/db.js';

const sortMapping: Record<string, string> = {
  expected_price: 'expectedPrice',
  price: 'expectedPrice',
  kms: 'kmsDriven',
  year: 'carManufactureYear',
  created_at: 'createdAt',
  expectedPrice: 'expectedPrice',
  kmsDriven: 'kmsDriven',
  carManufactureYear: 'carManufactureYear',
  createdAt: 'createdAt'
};

export const getAllCars = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const pageSize = Math.min(Number(req.query.page_size ?? 10), 100);
  const requestedSort = typeof req.query.sort_by === 'string' ? req.query.sort_by : 'expected_price';
  const sortBy = (sortMapping[requestedSort] || 'expectedPrice') as 'expectedPrice' | 'kmsDriven' | 'carManufactureYear' | 'createdAt';
  const order = req.query.order === 'desc' ? 'desc' : 'asc';

  const filters: any = {};
  if (typeof req.query.fuel_type === 'string' && req.query.fuel_type.trim()) {
    filters.carFuelType = { equals: req.query.fuel_type.trim(), mode: 'insensitive' };
  }
  if (typeof req.query.city === 'string' && req.query.city.trim()) {
    filters.dealer = {
      city: { contains: req.query.city.trim(), mode: 'insensitive' }
    };
  }
  if (typeof req.query.min_price === 'string' && !isNaN(Number(req.query.min_price))) {
    filters.expectedPrice = { ...filters.expectedPrice, gte: Number(req.query.min_price) };
  }
  if (typeof req.query.max_price === 'string' && !isNaN(Number(req.query.max_price))) {
    filters.expectedPrice = { ...filters.expectedPrice, lte: Number(req.query.max_price) };
  }
  if (typeof req.query.search === 'string' && req.query.search.trim()) {
    const searchTerm = req.query.search.trim();
    filters.OR = [
      { carName: { contains: searchTerm, mode: 'insensitive' } },
      { carCompany: { contains: searchTerm, mode: 'insensitive' } },
      { dealer: { dealerName: { contains: searchTerm, mode: 'insensitive' } } }
    ];
  }

  const cars = await prisma.car.findMany({
    where: filters,
    orderBy: [{ [sortBy]: order } as any],
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      dealer: true,
      images: true
    }
  });

  res.status(200).json(cars);
};

export const createCar = async (req: Request, res: Response) => {
  const {
    dealerId,
    carName,
    carCompany,
    carFuelType,
    carManufactureYear,
    carRegistrationDate,
    carRegistrationState,
    carRegistrationNumber,
    carVariant,
    kmsDriven,
    transmission,
    color,
    expectedPrice,
    numberOfOwners,
    insuranceValidUpto,
    status,
    reportUrl
  } = req.body;

  const car = await prisma.car.create({
    data: {
      dealerId,
      carName,
      carCompany,
      carFuelType,
      carManufactureYear: Number(carManufactureYear),
      carRegistrationDate: carRegistrationDate ? new Date(carRegistrationDate) : null,
      carRegistrationState,
      carRegistrationNumber,
      carVariant,
      kmsDriven: Number(kmsDriven),
      transmission,
      color,
      expectedPrice: Number(expectedPrice),
      numberOfOwners: numberOfOwners ? Number(numberOfOwners) : null,
      insuranceValidUpto: insuranceValidUpto ? new Date(insuranceValidUpto) : null,
      status: status || 'available',
      reportUrl,
    }
  });

  res.status(201).json(car);
};

export const getCarById = async (req: Request, res: Response) => {
  const car = await prisma.car.findUnique({
    where: { id: req.params.carId },
    include: { dealer: true, images: true }
  });

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  res.status(200).json(car);
};

export const updateCar = async (req: Request, res: Response) => {
  const data: any = { ...req.body };
  if (data.carManufactureYear !== undefined) data.carManufactureYear = Number(data.carManufactureYear);
  if (data.kmsDriven !== undefined) data.kmsDriven = Number(data.kmsDriven);
  if (data.expectedPrice !== undefined) data.expectedPrice = Number(data.expectedPrice);
  if (data.numberOfOwners !== undefined) data.numberOfOwners = Number(data.numberOfOwners);
  if (data.carRegistrationDate !== undefined) data.carRegistrationDate = data.carRegistrationDate ? new Date(data.carRegistrationDate) : null;
  if (data.insuranceValidUpto !== undefined) data.insuranceValidUpto = data.insuranceValidUpto ? new Date(data.insuranceValidUpto) : null;

  const car = await prisma.car.update({
    where: { id: req.params.carId },
    data,
    include: { dealer: true, images: true }
  });

  res.status(200).json(car);
};

export const deleteCar = async (req: Request, res: Response) => {
  await prisma.car.delete({ where: { id: req.params.carId } });
  res.status(200).json({ message: 'Car deleted successfully' });
};
