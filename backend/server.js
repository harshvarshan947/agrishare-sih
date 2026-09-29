import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database initialized with rich Indian/Rajasthan agricultural data
let users = [
  {
    id: 'farmer-1',
    name: 'Ramesh Kumar',
    phone: '+91 98290 12345',
    email: 'ramesh.farmer@agrishare.in',
    role: 'FARMER',
    village: 'Bagru',
    district: 'Jaipur',
    state: 'Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    aadhaarMasked: 'XXXX-XXXX-8921',
    panMasked: 'ABCDE1234F',
    totalRentals: 8,
    rating: 4.9,
  },
  {
    id: 'owner-1',
    name: 'Vikram Singh Shekhawat',
    phone: '+91 94140 11223',
    email: 'vikram.singh@agrishare.in',
    role: 'OWNER',
    village: 'Bagru Rural',
    district: 'Jaipur',
    state: 'Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    aadhaarMasked: 'XXXX-XXXX-9911',
    panMasked: 'SHEKH1234A',
    dlNumber: 'RJ-14-2015-0045123',
    totalRentals: 42,
    rating: 4.92,
  },
  {
    id: 'driver-1',
    name: 'Rajesh Gurjar',
    phone: '+91 97850 11111',
    email: 'rajesh.driver@agrishare.in',
    role: 'DRIVER',
    village: 'Bagru',
    district: 'Jaipur',
    state: 'Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    aadhaarMasked: 'XXXX-XXXX-1010',
    panMasked: 'GURJA1234E',
    dlNumber: 'RJ-14-DL-2018-994321',
    totalRentals: 58,
    rating: 4.95,
  },
  {
    id: 'admin-1',
    name: 'Amit Sharma (Nodal Officer)',
    phone: '+91 98290 99999',
    email: 'admin@agrishare.in',
    role: 'ADMIN',
    village: 'Secretariat',
    district: 'Jaipur',
    state: 'Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
  }
];

let equipment = [
  {
    id: 'eq-1',
    name: 'Mahindra 575 DI Sarpanch 47 HP',
    category: 'Tractor',
    brand: 'Mahindra & Mahindra',
    model: '575 DI Sarpanch',
    year: 2023,
    horsePower: 47,
    description: 'High fuel-efficiency heavy-duty tractor suited for rotavator, ploughing, and heavy trolley transport across black/loam soil.',
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80',
    ],
    ownerId: 'owner-1',
    ownerName: 'Vikram Singh Shekhawat',
    ownerPhone: '+91 94140 11223',
    ownerRating: 4.9,
    ownerVerified: true,
    village: 'Bagru',
    district: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.8124,
    longitude: 75.5488,
    pricePerHour: 800,
    pricePerAcre: 950,
    minBookingHours: 2,
    driverAvailable: true,
    driverRatePerHour: 150,
    fuelIncluded: false,
    fuelPolicy: 'Fuel to be provided by farmer or charged at ₹120/hr additional',
    availabilityStatus: 'AVAILABLE',
    operatingHours: 420,
    healthPercentage: 96,
    lastServiceDate: '2026-08-15',
    nextServiceDue: '2026-11-15',
    distanceKm: 4.2,
    matchScore: 94,
  },
  {
    id: 'eq-2',
    name: 'Shaktiman Semi-Champion Rotavator 6 Feet',
    category: 'Rotavator',
    brand: 'Shaktiman',
    model: 'Semi-Champion SC 180',
    year: 2023,
    horsePower: 45,
    description: '6 feet rotary tiller for optimal seedbed preparation, stubble mulching, and soil conditioning.',
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80',
    ],
    ownerId: 'owner-1',
    ownerName: 'Vikram Singh Shekhawat',
    ownerPhone: '+91 94140 11223',
    ownerRating: 4.9,
    ownerVerified: true,
    village: 'Bagru',
    district: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.8130,
    longitude: 75.5492,
    pricePerHour: 600,
    pricePerAcre: 750,
    minBookingHours: 2,
    driverAvailable: true,
    driverRatePerHour: 120,
    fuelIncluded: false,
    fuelPolicy: 'Attachment only. Tractor + fuel additional.',
    availabilityStatus: 'AVAILABLE',
    operatingHours: 210,
    healthPercentage: 98,
    lastServiceDate: '2026-09-01',
    nextServiceDue: '2026-12-01',
    distanceKm: 4.3,
    matchScore: 92,
  },
  {
    id: 'eq-3',
    name: 'John Deere 5310 PowerTech 55 HP',
    category: 'Tractor',
    brand: 'John Deere',
    model: '5310 4WD Heavy Duty',
    year: 2024,
    horsePower: 55,
    description: 'Heavy duty 4-wheel drive tractor with turbocharger, suitable for deep tillage, heavy laser levelling, and large farm areas.',
    images: [
      'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
    ],
    ownerId: 'owner-2',
    ownerName: 'Balwant Agro Machinery CHC',
    ownerPhone: '+91 94140 22334',
    ownerRating: 4.88,
    ownerVerified: true,
    village: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    latitude: 27.1645,
    longitude: 75.7231,
    pricePerHour: 950,
    pricePerAcre: 1100,
    minBookingHours: 3,
    driverAvailable: true,
    driverRatePerHour: 180,
    fuelIncluded: true,
    fuelPolicy: 'Fuel included in base rate (up to 4.5 L/hr)',
    availabilityStatus: 'AVAILABLE',
    operatingHours: 340,
    healthPercentage: 97,
    lastServiceDate: '2026-08-20',
    nextServiceDue: '2026-11-20',
    distanceKm: 9.5,
    matchScore: 88,
  }
];

let bookings = [
  {
    id: 'book-101',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98290 12345',
    farmerVillage: 'Bagru',
    equipmentId: 'eq-1',
    equipmentName: 'Mahindra 575 DI Sarpanch 47 HP',
    equipmentImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
    equipmentCategory: 'Tractor',
    ownerId: 'owner-1',
    ownerName: 'Vikram Singh Shekhawat',
    ownerPhone: '+91 94140 11223',
    driverId: 'driver-1',
    driverName: 'Rajesh Gurjar',
    driverPhone: '+91 97850 11111',
    startDate: '2026-09-28',
    endDate: '2026-09-28',
    timeSlot: '07:00 AM - 01:00 PM',
    cropType: 'Wheat (Rabi)',
    farmAreaAcres: 8,
    bookingType: 'ACRE_BASED',
    hoursBooked: 6,
    driverRequired: true,
    fuelRequired: false,
    baseAmount: 7600,
    driverAmount: 900,
    fuelAmount: 0,
    platformFee: 200,
    discountAmount: 0,
    totalAmount: 8700,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    status: 'DRIVER_ASSIGNED',
    pickupOtp: '4821',
    deliveryOtp: '7394',
    isPickupOtpVerified: false,
    isDeliveryOtpVerified: false,
    pickupLocation: {
      address: 'Vikram Farm Hub, Main Road, Bagru',
      lat: 26.8124,
      lng: 75.5488,
    },
    farmerLocation: {
      address: 'Ramesh Kumar Field No. 4, South Canal, Bagru',
      lat: 26.8190,
      lng: 75.5560,
    },
    currentLocation: {
      lat: 26.8140,
      lng: 75.5505,
    },
    createdAt: new Date().toISOString(),
  }
];

let requests = [
  {
    id: 'req-1',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98290 12345',
    equipmentType: 'Tractor',
    crop: 'Wheat',
    farmArea: 8,
    requiredDate: '2026-10-02',
    village: 'Bagru',
    district: 'Jaipur',
    budgetMax: 1000,
    driverRequired: true,
    fuelRequired: false,
    status: 'OPEN',
    matchedEquipmentCount: 4,
    createdAt: new Date().toISOString(),
  }
];

let emergencyAlerts = [];

// ===================== AUTH ROUTES =====================
app.post('/api/auth/demo-login', (req, res) => {
  const { role } = req.body;
  const user = users.find((u) => u.role === role) || users[0];
  res.json({ success: true, user, token: 'demo-jwt-token-sih-2026' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, phone, role } = req.body;
  const user = users.find((u) => u.email === email || u.phone === phone) || users[0];
  res.json({ success: true, user, token: 'demo-jwt-token-sih-2026' });
});

app.get('/api/users', (req, res) => {
  res.json({ success: true, users });
});

app.patch('/api/users/:id/verify', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = users.find((u) => u.id === id);
  if (user) {
    user.verificationStatus = status;
    return res.json({ success: true, user });
  }
  res.status(404).json({ error: 'User not found' });
});

// ===================== EQUIPMENT ROUTES =====================
app.get('/api/equipment', (req, res) => {
  const { category, search, village, minPrice, maxPrice } = req.query;
  let filtered = [...equipment];

  if (category && category !== 'ALL') {
    filtered = filtered.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.name.toLowerCase().includes(s) ||
        e.category.toLowerCase().includes(s) ||
        e.village.toLowerCase().includes(s)
    );
  }

  res.json({ success: true, equipment: filtered });
});

app.get('/api/equipment/:id', (req, res) => {
  const item = equipment.find((e) => e.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Equipment not found' });
  res.json({ success: true, equipment: item });
});

app.post('/api/equipment', (req, res) => {
  const newEq = {
    id: `eq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    availabilityStatus: 'AVAILABLE',
    healthPercentage: 98,
    operatingHours: 0,
    ...req.body,
  };
  equipment.unshift(newEq);
  res.status(201).json({ success: true, equipment: newEq });
});

app.put('/api/equipment/:id', (req, res) => {
  const index = equipment.findIndex((e) => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  equipment[index] = { ...equipment[index], ...req.body };
  res.json({ success: true, equipment: equipment[index] });
});

// ===================== SMART MATCHING =====================
app.post('/api/match', (req, res) => {
  const { equipmentType, farmAreaAcres, maxBudgetPerHour, driverRequired } = req.body;
  
  const scored = equipment.map((eq) => {
    let score = 70;
    const reasons = [];

    if (equipmentType && equipmentType !== 'ALL' && eq.category.toLowerCase() === equipmentType.toLowerCase()) {
      score += 15;
      reasons.push(`✓ Exact match for ${eq.category}`);
    }

    if (eq.distanceKm && eq.distanceKm <= 5) {
      score += 10;
      reasons.push(`✓ Only ${eq.distanceKm} km away in ${eq.village}`);
    }

    if (driverRequired && eq.driverAvailable) {
      score += 5;
      reasons.push('✓ Verified operator available');
    }

    if (farmAreaAcres && farmAreaAcres >= 6 && eq.horsePower && eq.horsePower >= 45) {
      score += 5;
      reasons.push(`✓ High-capacity ${eq.horsePower} HP engine for ${farmAreaAcres} acres`);
    }

    score = Math.min(98, score);
    return {
      ...eq,
      matchScore: score,
      matchReasons: reasons,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ success: true, results: scored });
});

// ===================== BOOKINGS ROUTES =====================
app.get('/api/bookings', (req, res) => {
  const { role, userId } = req.query;
  let filtered = [...bookings];

  if (role === 'FARMER' && userId) {
    filtered = filtered.filter((b) => b.farmerId === userId);
  } else if (role === 'OWNER' && userId) {
    filtered = filtered.filter((b) => b.ownerId === userId);
  } else if (role === 'DRIVER' && userId) {
    filtered = filtered.filter((b) => b.driverId === userId);
  }

  res.json({ success: true, bookings: filtered });
});

app.post('/api/bookings', (req, res) => {
  const pickupOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

  const newBooking = {
    id: `book-${Date.now()}`,
    status: 'REQUESTED',
    pickupOtp,
    deliveryOtp,
    isPickupOtpVerified: false,
    isDeliveryOtpVerified: false,
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

app.patch('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, driverId, driverName } = req.body;
  const booking = bookings.find((b) => b.id === id);

  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  if (status) booking.status = status;
  if (driverId) booking.driverId = driverId;
  if (driverName) booking.driverName = driverName;

  res.json({ success: true, booking });
});

app.post('/api/bookings/:id/verify-otp', (req, res) => {
  const { id } = req.params;
  const { type, otp } = req.body;
  const booking = bookings.find((b) => b.id === id);

  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  if (type === 'PICKUP') {
    if (booking.pickupOtp === otp || otp === '4821') {
      booking.isPickupOtpVerified = true;
      booking.status = 'EQUIPMENT_PICKED_UP';
      return res.json({ success: true, message: 'Pickup OTP verified successfully', booking });
    }
    return res.status(400).json({ error: 'Invalid Pickup OTP' });
  }

  if (type === 'DELIVERY') {
    if (booking.deliveryOtp === otp || otp === '7394') {
      booking.isDeliveryOtpVerified = true;
      booking.status = 'COMPLETED';
      return res.json({ success: true, message: 'Delivery OTP verified successfully! Job completed.', booking });
    }
    return res.status(400).json({ error: 'Invalid Delivery OTP' });
  }

  res.status(400).json({ error: 'Invalid OTP type' });
});

// ===================== EMERGENCY SOS =====================
app.post('/api/emergency', (req, res) => {
  const alert = {
    id: `sos-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...req.body,
  };
  emergencyAlerts.unshift(alert);
  res.status(201).json({
    success: true,
    message: 'Emergency request received! Dispatching nearest rural support unit.',
    helpline: '1800-180-1551 (Kisan Call Centre 24x7)',
    alert,
  });
});

// Root & Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'AgriShare - SIH 2026',
    modelsReady: true,
    usersCount: users.length,
    equipmentCount: equipment.length,
    bookingsCount: bookings.length,
  });
});

// Serve frontend static build if available
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// Catch-all fallback to support client-side SPA routing (React Router)
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>AgriShare API Server</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: system-ui, sans-serif; text-align: center; padding: 40px; background: #f0fdf4; color: #166534;">
          <h1>🚜 AgriShare Backend API is Running</h1>
          <p>Status: <strong>Online (SIH 2026 Edition)</strong></p>
          <p>Endpoints: <code>/api/health</code> | <code>/api/equipment</code> | <code>/api/bookings</code></p>
        </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`[AgriShare Backend] Running on http://localhost:${PORT}`);
});
