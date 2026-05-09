import { Router, Request, Response } from 'express';
import {
  authService,
  carService,
  dealerService,
  customerInterestService,
  sellCarRequestService,
  financeEnquiryService,
  insuranceEnquiryService,
  serviceRequestService,
  dashboardService,
} from './mockServices.js';

const router = Router();

// ─── Health ───────────────────────────────────────────────────────────────────

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'autocarwellness-mock', timestamp: new Date().toISOString() });
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

router.post('/auth/customer/request-otp', (req: Request, res: Response) => {
  const { mobile_number } = req.body;
  if (!mobile_number) return res.status(400).json({ message: 'mobile_number is required' });
  const result = authService.requestOtp(mobile_number);
  res.json(result);
});

router.post('/auth/customer/verify-otp', (req: Request, res: Response) => {
  const { mobile_number, otp } = req.body;
  if (!mobile_number || !otp) return res.status(400).json({ message: 'mobile_number and otp are required' });
  const result = authService.verifyOtp(mobile_number, otp);
  if (!result) return res.status(401).json({ message: 'Invalid OTP' });
  res.json(result);
});

router.post('/auth/owner/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password are required' });
  const result = authService.ownerLogin(email, password);
  if (!result) return res.status(401).json({ message: 'Invalid credentials' });
  res.json(result);
});

router.get('/auth/verify', (req: Request, res: Response) => {
  const user = authService.verifyToken(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ user: { id: user.id, name: user.name, email: user.email, mobileNumber: user.mobileNumber, role: user.role } });
});

router.post('/auth/logout', (req: Request, res: Response) => {
  authService.logout(req.headers.authorization);
  res.json({ message: 'Logged out successfully' });
});

// ─── Cars ─────────────────────────────────────────────────────────────────────

router.get('/cars', (req: Request, res: Response) => {
  const cars = carService.getAll(req.query as any);
  res.json(cars);
});

router.post('/cars', (req: Request, res: Response) => {
  const car = carService.create(req.body);
  res.status(201).json(car);
});

router.get('/cars/:id', (req: Request, res: Response) => {
  const car = carService.getById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

router.put('/cars/:id', (req: Request, res: Response) => {
  const car = carService.update(req.params.id, req.body);
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

router.delete('/cars/:id', (req: Request, res: Response) => {
  const ok = carService.delete(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Car not found' });
  res.json({ message: 'Car deleted successfully' });
});

// ─── Dealers ──────────────────────────────────────────────────────────────────

router.get('/dealers', (_req: Request, res: Response) => {
  res.json(dealerService.getAll());
});

router.post('/dealers', (req: Request, res: Response) => {
  const dealer = dealerService.create(req.body);
  res.status(201).json(dealer);
});

router.get('/dealers/:id', (req: Request, res: Response) => {
  const dealer = dealerService.getById(req.params.id);
  if (!dealer) return res.status(404).json({ message: 'Dealer not found' });
  res.json(dealer);
});

router.put('/dealers/:id', (req: Request, res: Response) => {
  const dealer = dealerService.update(req.params.id, req.body);
  if (!dealer) return res.status(404).json({ message: 'Dealer not found' });
  res.json(dealer);
});

router.delete('/dealers/:id', (req: Request, res: Response) => {
  const ok = dealerService.delete(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Dealer not found' });
  res.json({ message: 'Dealer deleted successfully' });
});

// ─── Admin dashboard ──────────────────────────────────────────────────────────

router.get('/admin/dashboard/summary', (_req: Request, res: Response) => {
  res.json(dashboardService.getSummary());
});

// ─── Customer Interests (admin) ───────────────────────────────────────────────

router.get('/admin/customer-interests', (_req: Request, res: Response) => {
  res.json(customerInterestService.getAll());
});

// Status update uses /car-interest/:id/status (matches LeadsPage endpointMap)
router.put('/car-interest/:id/status', (req: Request, res: Response) => {
  const record = customerInterestService.updateStatus(req.params.id, req.body.status);
  if (!record) return res.status(404).json({ message: 'Interest not found' });
  res.json(record);
});

// Public interest submission
router.post('/car-interest/:carId', (req: Request, res: Response) => {
  const record = customerInterestService.create({ ...req.body, carId: req.params.carId });
  res.status(201).json(record);
});

// ─── Sell Car Requests ────────────────────────────────────────────────────────

router.get('/sell-car-requests', (_req: Request, res: Response) => {
  res.json(sellCarRequestService.getAll());
});

router.post('/sell-car-requests', (req: Request, res: Response) => {
  const record = sellCarRequestService.create(req.body);
  res.status(201).json(record);
});

router.put('/sell-car-requests/:id/status', (req: Request, res: Response) => {
  const record = sellCarRequestService.updateStatus(req.params.id, req.body.status);
  if (!record) return res.status(404).json({ message: 'Sell request not found' });
  res.json(record);
});

// ─── Finance Enquiries ────────────────────────────────────────────────────────

router.get('/finance-enquiries', (_req: Request, res: Response) => {
  res.json(financeEnquiryService.getAll());
});

router.post('/finance-enquiries', (req: Request, res: Response) => {
  const record = financeEnquiryService.create(req.body);
  res.status(201).json(record);
});

router.put('/finance-enquiries/:id/status', (req: Request, res: Response) => {
  const record = financeEnquiryService.updateStatus(req.params.id, req.body.status);
  if (!record) return res.status(404).json({ message: 'Finance enquiry not found' });
  res.json(record);
});

// ─── Insurance Enquiries ──────────────────────────────────────────────────────

router.get('/insurance-enquiries', (_req: Request, res: Response) => {
  res.json(insuranceEnquiryService.getAll());
});

router.post('/insurance-enquiries', (req: Request, res: Response) => {
  const record = insuranceEnquiryService.create(req.body);
  res.status(201).json(record);
});

router.put('/insurance-enquiries/:id/status', (req: Request, res: Response) => {
  const record = insuranceEnquiryService.updateStatus(req.params.id, req.body.status);
  if (!record) return res.status(404).json({ message: 'Insurance enquiry not found' });
  res.json(record);
});

// ─── Service Requests ─────────────────────────────────────────────────────────

router.get('/service-requests', (_req: Request, res: Response) => {
  res.json(serviceRequestService.getAll());
});

router.post('/service-requests', (req: Request, res: Response) => {
  const record = serviceRequestService.create(req.body);
  res.status(201).json(record);
});

router.put('/service-requests/:id/status', (req: Request, res: Response) => {
  const record = serviceRequestService.updateStatus(req.params.id, req.body.status);
  if (!record) return res.status(404).json({ message: 'Service request not found' });
  res.json(record);
});

// ─── Contact Us ───────────────────────────────────────────────────────────────

router.post('/contact-us', (_req: Request, res: Response) => {
  res.json({ message: 'Message received. We will get back to you shortly.' });
});

export default router;
