import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, mobileNumber, password, name, role } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        mobileNumber,
        passwordHash: hashedPassword,
        name,
        role: role || 'CUSTOMER',
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        mobileNumber: user.mobileNumber,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ message: 'Email or mobile number already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, mobileNumber, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { mobileNumber: mobileNumber },
        ],
      },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        mobileNumber: user.mobileNumber,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyToken = async (req: AuthRequest, res: Response) => {
  if (req.user) {
    res.json({
      authenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
};
