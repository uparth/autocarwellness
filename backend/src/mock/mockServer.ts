import express from 'express';
import cors from 'cors';
import mockRouter from './mockRoutes.js';

const app = express();
const PORT = process.env.MOCK_PORT ?? 4001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'autocarwellness-mock-server',
    message: 'Mock API is running. Set VITE_API_BASE_URL=http://localhost:4001/api in the frontend.',
    endpoints: {
      health: 'GET /api/health',
      auth: ['POST /api/auth/customer/request-otp', 'POST /api/auth/customer/verify-otp', 'POST /api/auth/owner/login', 'GET /api/auth/verify', 'POST /api/auth/logout'],
      cars: ['GET /api/cars', 'POST /api/cars', 'GET /api/cars/:id', 'PUT /api/cars/:id', 'DELETE /api/cars/:id'],
      dealers: ['GET /api/dealers', 'POST /api/dealers', 'PUT /api/dealers/:id', 'DELETE /api/dealers/:id'],
      admin: ['GET /api/admin/dashboard/summary', 'GET /api/admin/customer-interests'],
      leads: ['GET|POST /api/sell-car-requests', 'GET|POST /api/finance-enquiries', 'GET|POST /api/insurance-enquiries', 'GET|POST /api/service-requests'],
    },
    ownerCredentials: { email: 'owner@autocarwellness.com', password: 'owner123' },
    customerOtp: 'Any 6-digit OTP is accepted (e.g. 123456)',
  });
});

app.use('/api', mockRouter);

app.listen(PORT, () => {
  console.log(`\n🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`   API base: http://localhost:${PORT}/api`);
  console.log(`\n   Owner login: owner@autocarwellness.com / owner123`);
  console.log(`   Customer OTP: any 6-digit code (e.g. 123456)\n`);
  console.log(`   Set in frontend/.env:`);
  console.log(`   VITE_API_BASE_URL=http://localhost:${PORT}/api\n`);
});

export default app;
