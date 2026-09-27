export type Role = 'FARMER' | 'OWNER' | 'DRIVER' | 'ADMIN';

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  village: string;
  district: string;
  state: string;
  avatar?: string;
  verificationStatus: VerificationStatus;
  aadhaarMasked?: string;
  panMasked?: string;
  dlNumber?: string;
  rating?: number;
  totalRentals?: number;
}

export type EquipmentCategory =
  | 'Tractor'
  | 'Harvester'
  | 'Rotavator'
  | 'Seed Drill'
  | 'Cultivator'
  | 'Thresher'
  | 'Sprayer'
  | 'Tractor Trolley'
  | 'Laser Land Leveller'
  | 'Combine Harvester'
  | 'Power Tiller';

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  year: number;
  horsePower?: number;
  description: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerRating: number;
  ownerVerified: boolean;
  village: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  pricePerAcre: number;
  minBookingHours: number;
  driverAvailable: boolean;
  driverRatePerHour: number;
  fuelIncluded: boolean;
  fuelPolicy: string;
  availabilityStatus: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE' | 'PAUSED';
  operatingHours: number;
  healthPercentage: number;
  lastServiceDate: string;
  nextServiceDue: string;
  specs: Record<string, string>;
  distanceKm?: number;
  matchScore?: number;
  matchReasons?: string[];
}

export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DRIVER_ASSIGNED'
  | 'GOING_TO_PICKUP'
  | 'REACHED_PICKUP'
  | 'EQUIPMENT_PICKED_UP'
  | 'ON_THE_WAY'
  | 'REACHED_FARMER'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

export interface Booking {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerVillage: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage: string;
  equipmentCategory: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  startDate: string;
  endDate: string;
  timeSlot: string;
  cropType: string;
  farmAreaAcres: number;
  bookingType: 'HOURLY' | 'ACRE_BASED' | 'GROUP';
  hoursBooked?: number;
  driverRequired: boolean;
  fuelRequired: boolean;
  baseAmount: number;
  driverAmount: number;
  fuelAmount: number;
  platformFee: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'CASH_ON_DELIVERY';
  paymentMethod?: 'UPI' | 'CARD' | 'CASH';
  status: BookingStatus;
  pickupOtp: string;
  deliveryOtp: string;
  isPickupOtpVerified: boolean;
  isDeliveryOtpVerified: boolean;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  farmerLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  currentLocation?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  reviewComment?: string;
  createdAt: string;
}

export interface EquipmentRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  equipmentType: EquipmentCategory;
  crop: string;
  farmArea: number;
  requiredDate: string;
  village: string;
  district: string;
  budgetMax: number;
  driverRequired: boolean;
  fuelRequired: boolean;
  status: 'OPEN' | 'MATCHED' | 'FULFILLED';
  matchedEquipmentCount: number;
  createdAt: string;
}

export interface GroupRental {
  id: string;
  title: string;
  equipmentCategory: EquipmentCategory;
  village: string;
  district: string;
  targetDate: string;
  targetAreaAcres: number;
  currentAreaAcres: number;
  minFarmers: number;
  currentFarmersCount: number;
  estimatedCostPerAcreOriginal: number;
  discountedCostPerAcre: number;
  savingsPercentage: number;
  status: 'FORMING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
  members: {
    farmerId: string;
    farmerName: string;
    acres: number;
    joinedAt: string;
  }[];
  matchedEquipmentId?: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  ministry: string;
  subsidyPercentage: string;
  targetBeneficiaries: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documentsRequired: string[];
  applicationUrl: string;
  lastDate: string;
  category: 'SUBSIDY' | 'LOAN' | 'TRAINING' | 'INSURANCE';
}

export interface WeatherData {
  village: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  forecast: {
    day: string;
    date: string;
    temp: number;
    condition: string;
    rainProb: number;
  }[];
  farmingAdvisory: {
    type: 'SAFE' | 'WARNING' | 'ALERT';
    title: string;
    message: string;
  };
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'DRIVER' | 'PAYMENT' | 'ALERT' | 'SCHEME' | 'MAINTENANCE';
  read: boolean;
  time: string;
  link?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: {
    equipmentName: string;
    category: EquipmentCategory;
    reason: string;
    estimatedCost: string;
  }[];
}
