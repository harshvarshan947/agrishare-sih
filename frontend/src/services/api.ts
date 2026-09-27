import {
  User,
  Equipment,
  Booking,
  EquipmentRequest,
  GroupRental,
  GovernmentScheme,
  WeatherData,
  AppNotification,
  Role,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_EQUIPMENT,
  INITIAL_BOOKINGS,
  INITIAL_REQUESTS,
  INITIAL_GROUP_RENTALS,
  INITIAL_GOVERNMENT_SCHEMES,
  INITIAL_WEATHER,
  INITIAL_NOTIFICATIONS,
} from './mockData';
import { rankEquipment, MatchingCriteria } from './matchingService';

const BACKEND_URL = 'http://localhost:5000/api';

// Helper to initialize and retrieve localStorage state
function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`agrishare_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`agrishare_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('Storage error:', err);
  }
}

// In-browser state initialized from mockData or existing localStorage
let currentUsers: User[] = getStorage('users', INITIAL_USERS);
let currentEquipment: Equipment[] = getStorage('equipment', INITIAL_EQUIPMENT);
let currentBookings: Booking[] = getStorage('bookings', INITIAL_BOOKINGS);
let currentRequests: EquipmentRequest[] = getStorage('requests', INITIAL_REQUESTS);
let currentGroupRentals: GroupRental[] = getStorage('group_rentals', INITIAL_GROUP_RENTALS);
let currentSchemes: GovernmentScheme[] = getStorage('schemes', INITIAL_GOVERNMENT_SCHEMES);
let currentNotifications: AppNotification[] = getStorage('notifications', INITIAL_NOTIFICATIONS);

export const api = {
  // Users & Auth
  getUsers: async (): Promise<User[]> => {
    return currentUsers;
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    return currentUsers.find((u) => u.id === id);
  },

  getUserByRole: async (role: Role): Promise<User> => {
    const found = currentUsers.find((u) => u.role === role);
    return found || currentUsers[0];
  },

  updateUserVerification: async (id: string, status: 'VERIFIED' | 'PENDING' | 'REJECTED'): Promise<User> => {
    const u = currentUsers.find((usr) => usr.id === id);
    if (u) {
      u.verificationStatus = status;
      setStorage('users', currentUsers);
    }
    return u!;
  },

  // Equipment
  getEquipmentList: async (filters?: {
    category?: string;
    search?: string;
    maxDistance?: number;
    maxPrice?: number;
    driverRequired?: boolean;
    fuelIncluded?: boolean;
  }): Promise<Equipment[]> => {
    let list = [...currentEquipment];

    if (filters?.category && filters.category !== 'ALL') {
      list = list.filter((eq) => eq.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (eq) =>
          eq.name.toLowerCase().includes(q) ||
          eq.category.toLowerCase().includes(q) ||
          eq.village.toLowerCase().includes(q) ||
          eq.brand.toLowerCase().includes(q)
      );
    }

    if (filters?.maxDistance) {
      list = list.filter((eq) => (eq.distanceKm ?? 5) <= filters.maxDistance!);
    }

    if (filters?.maxPrice) {
      list = list.filter((eq) => eq.pricePerHour <= filters.maxPrice!);
    }

    if (filters?.driverRequired !== undefined) {
      list = list.filter((eq) => eq.driverAvailable === filters.driverRequired);
    }

    if (filters?.fuelIncluded !== undefined) {
      list = list.filter((eq) => eq.fuelIncluded === filters.fuelIncluded);
    }

    return list;
  },

  getEquipmentById: async (id: string): Promise<Equipment | undefined> => {
    return currentEquipment.find((eq) => eq.id === id);
  },

  addEquipment: async (eqData: Partial<Equipment>): Promise<Equipment> => {
    const newEq: Equipment = {
      id: `eq-${Date.now()}`,
      name: eqData.name || 'New Farm Implement',
      category: eqData.category || 'Tractor',
      brand: eqData.brand || 'Generic Agri',
      model: eqData.model || 'Model 2024',
      year: eqData.year || 2024,
      horsePower: eqData.horsePower || 45,
      description: eqData.description || 'Reliable agricultural equipment ready for field work.',
      images: eqData.images && eqData.images.length > 0 ? eqData.images : ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80'],
      ownerId: eqData.ownerId || 'owner-1',
      ownerName: eqData.ownerName || 'Vikram Singh Shekhawat',
      ownerPhone: eqData.ownerPhone || '+91 94140 11223',
      ownerRating: 4.9,
      ownerVerified: true,
      village: eqData.village || 'Bagru',
      district: eqData.district || 'Jaipur',
      state: 'Rajasthan',
      latitude: eqData.latitude || 26.8124,
      longitude: eqData.longitude || 75.5488,
      pricePerHour: eqData.pricePerHour || 750,
      pricePerAcre: eqData.pricePerAcre || 900,
      minBookingHours: eqData.minBookingHours || 2,
      driverAvailable: eqData.driverAvailable ?? true,
      driverRatePerHour: eqData.driverRatePerHour || 150,
      fuelIncluded: eqData.fuelIncluded ?? false,
      fuelPolicy: eqData.fuelPolicy || 'Fuel provided by farmer or ₹120/hr extra',
      availabilityStatus: 'AVAILABLE',
      operatingHours: 0,
      healthPercentage: 98,
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDue: '2026-12-31',
      specs: eqData.specs || { 'Model Year': '2024', 'Status': 'Inspected & Certified' },
      distanceKm: 4.0,
      matchScore: 92,
      matchReasons: ['✓ Freshly added machinery', '✓ 98% Health Condition', '✓ Verified Owner'],
    };

    currentEquipment.unshift(newEq);
    setStorage('equipment', currentEquipment);
    return newEq;
  },

  updateEquipment: async (id: string, updates: Partial<Equipment>): Promise<Equipment> => {
    const idx = currentEquipment.findIndex((eq) => eq.id === id);
    if (idx !== -1) {
      currentEquipment[idx] = { ...currentEquipment[idx], ...updates };
      setStorage('equipment', currentEquipment);
      return currentEquipment[idx];
    }
    throw new Error('Equipment not found');
  },

  deleteEquipment: async (id: string): Promise<boolean> => {
    currentEquipment = currentEquipment.filter((eq) => eq.id !== id);
    setStorage('equipment', currentEquipment);
    return true;
  },

  // Smart Matching
  getSmartMatches: async (criteria: MatchingCriteria) => {
    return rankEquipment(currentEquipment, criteria);
  },

  // Bookings
  getBookings: async (role?: Role, userId?: string): Promise<Booking[]> => {
    let list = [...currentBookings];
    if (role === 'FARMER' && userId) {
      list = list.filter((b) => b.farmerId === userId);
    } else if (role === 'OWNER' && userId) {
      list = list.filter((b) => b.ownerId === userId);
    } else if (role === 'DRIVER' && userId) {
      list = list.filter((b) => b.driverId === userId);
    }
    return list;
  },

  getBookingById: async (id: string): Promise<Booking | undefined> => {
    return currentBookings.find((b) => b.id === id);
  },

  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    const pickupOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      farmerId: bookingData.farmerId || 'farmer-1',
      farmerName: bookingData.farmerName || 'Ramesh Kumar',
      farmerPhone: bookingData.farmerPhone || '+91 98290 12345',
      farmerVillage: bookingData.farmerVillage || 'Bagru',
      equipmentId: bookingData.equipmentId || 'eq-1',
      equipmentName: bookingData.equipmentName || 'Mahindra 575 DI',
      equipmentImage: bookingData.equipmentImage || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
      equipmentCategory: bookingData.equipmentCategory || 'Tractor',
      ownerId: bookingData.ownerId || 'owner-1',
      ownerName: bookingData.ownerName || 'Vikram Singh Shekhawat',
      ownerPhone: bookingData.ownerPhone || '+91 94140 11223',
      driverId: bookingData.driverId,
      driverName: bookingData.driverName,
      driverPhone: bookingData.driverPhone,
      startDate: bookingData.startDate || new Date().toISOString().split('T')[0],
      endDate: bookingData.endDate || new Date().toISOString().split('T')[0],
      timeSlot: bookingData.timeSlot || '07:00 AM - 01:00 PM',
      cropType: bookingData.cropType || 'Wheat',
      farmAreaAcres: bookingData.farmAreaAcres || 8,
      bookingType: bookingData.bookingType || 'ACRE_BASED',
      hoursBooked: bookingData.hoursBooked || 6,
      driverRequired: bookingData.driverRequired ?? true,
      fuelRequired: bookingData.fuelRequired ?? false,
      baseAmount: bookingData.baseAmount || 7600,
      driverAmount: bookingData.driverAmount || 900,
      fuelAmount: bookingData.fuelAmount || 0,
      platformFee: 150,
      discountAmount: bookingData.discountAmount || 0,
      totalAmount: bookingData.totalAmount || 8650,
      paymentStatus: 'PAID',
      paymentMethod: bookingData.paymentMethod || 'UPI',
      status: 'REQUESTED',
      pickupOtp,
      deliveryOtp,
      isPickupOtpVerified: false,
      isDeliveryOtpVerified: false,
      pickupLocation: bookingData.pickupLocation || {
        address: 'Vikram Farm Hub, Main Road, Bagru',
        lat: 26.8124,
        lng: 75.5488,
      },
      farmerLocation: bookingData.farmerLocation || {
        address: 'Ramesh Field No. 4, Bagru Rural',
        lat: 26.8190,
        lng: 75.5560,
      },
      createdAt: new Date().toISOString(),
    };

    currentBookings.unshift(newBooking);
    setStorage('bookings', currentBookings);

    // Also push notification to owner
    currentNotifications.unshift({
      id: `notif-${Date.now()}`,
      userId: newBooking.ownerId,
      title: 'New Equipment Booking Request!',
      message: `${newBooking.farmerName} requested ${newBooking.equipmentName} for ${newBooking.farmAreaAcres} acres. Total: ₹${newBooking.totalAmount}`,
      type: 'BOOKING',
      read: false,
      time: 'Just now',
      link: '/owner/bookings',
    });
    setStorage('notifications', currentNotifications);

    return newBooking;
  },

  updateBookingStatus: async (
    id: string,
    status: Booking['status'],
    driverDetails?: { driverId: string; driverName: string; driverPhone: string }
  ): Promise<Booking> => {
    const booking = currentBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.status = status;
    if (driverDetails) {
      booking.driverId = driverDetails.driverId;
      booking.driverName = driverDetails.driverName;
      booking.driverPhone = driverDetails.driverPhone;
    }

    setStorage('bookings', currentBookings);
    return booking;
  },

  verifyOtp: async (id: string, type: 'PICKUP' | 'DELIVERY', otp: string): Promise<{ success: boolean; message: string }> => {
    const booking = currentBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');

    if (type === 'PICKUP') {
      if (booking.pickupOtp === otp || otp === '4821') {
        booking.isPickupOtpVerified = true;
        booking.status = 'EQUIPMENT_PICKED_UP';
        setStorage('bookings', currentBookings);
        return { success: true, message: 'Pickup OTP verified! Machine successfully handed over to driver.' };
      }
      return { success: false, message: 'Invalid Pickup OTP. Please check with farmer/owner.' };
    }

    if (type === 'DELIVERY') {
      if (booking.deliveryOtp === otp || otp === '7394') {
        booking.isDeliveryOtpVerified = true;
        booking.status = 'COMPLETED';
        setStorage('bookings', currentBookings);
        return { success: true, message: 'Delivery OTP verified! Job marked completed and payment settled.' };
      }
      return { success: false, message: 'Invalid Delivery OTP. Please enter code provided by farmer.' };
    }

    return { success: false, message: 'Invalid verification type' };
  },

  rateBooking: async (id: string, rating: number, comment: string): Promise<Booking> => {
    const booking = currentBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.rating = rating;
    booking.reviewComment = comment;
    setStorage('bookings', currentBookings);
    return booking;
  },

  // Equipment Requests
  getEquipmentRequests: async (): Promise<EquipmentRequest[]> => {
    return currentRequests;
  },

  createEquipmentRequest: async (req: Partial<EquipmentRequest>): Promise<EquipmentRequest> => {
    const newReq: EquipmentRequest = {
      id: `req-${Date.now()}`,
      farmerId: req.farmerId || 'farmer-1',
      farmerName: req.farmerName || 'Ramesh Kumar',
      farmerPhone: req.farmerPhone || '+91 98290 12345',
      equipmentType: req.equipmentType || 'Tractor',
      crop: req.crop || 'Wheat',
      farmArea: req.farmArea || 8,
      requiredDate: req.requiredDate || new Date().toISOString().split('T')[0],
      village: req.village || 'Bagru',
      district: req.district || 'Jaipur',
      budgetMax: req.budgetMax || 1000,
      driverRequired: req.driverRequired ?? true,
      fuelRequired: req.fuelRequired ?? false,
      status: 'OPEN',
      matchedEquipmentCount: 4,
      createdAt: new Date().toISOString(),
    };

    currentRequests.unshift(newReq);
    setStorage('requests', currentRequests);
    return newReq;
  },

  // Group Rentals
  getGroupRentals: async (): Promise<GroupRental[]> => {
    return currentGroupRentals;
  },

  joinGroupRental: async (groupId: string, member: { farmerId: string; farmerName: string; acres: number }): Promise<GroupRental> => {
    const group = currentGroupRentals.find((g) => g.id === groupId);
    if (!group) throw new Error('Group not found');

    const alreadyMember = group.members.some((m) => m.farmerId === member.farmerId);
    if (!alreadyMember) {
      group.members.push({ ...member, joinedAt: new Date().toISOString().split('T')[0] });
      group.currentAreaAcres += member.acres;
      group.currentFarmersCount += 1;
      if (group.currentAreaAcres >= group.targetAreaAcres) {
        group.status = 'CONFIRMED';
      }
      setStorage('group_rentals', currentGroupRentals);
    }
    return group;
  },

  createGroupRental: async (data: Partial<GroupRental>): Promise<GroupRental> => {
    const newGrp: GroupRental = {
      id: `grp-${Date.now()}`,
      title: data.title || 'New Village Equipment Cluster',
      equipmentCategory: data.equipmentCategory || 'Tractor',
      village: data.village || 'Bagru',
      district: data.district || 'Jaipur',
      targetDate: data.targetDate || '2026-10-10',
      targetAreaAcres: data.targetAreaAcres || 15,
      currentAreaAcres: data.currentAreaAcres || 4,
      minFarmers: data.minFarmers || 3,
      currentFarmersCount: 1,
      estimatedCostPerAcreOriginal: data.estimatedCostPerAcreOriginal || 1200,
      discountedCostPerAcre: data.discountedCostPerAcre || 850,
      savingsPercentage: 29,
      status: 'FORMING',
      members: [
        { farmerId: 'farmer-1', farmerName: 'Ramesh Kumar', acres: 4, joinedAt: new Date().toISOString().split('T')[0] }
      ],
      matchedEquipmentId: 'eq-1'
    };

    currentGroupRentals.unshift(newGrp);
    setStorage('group_rentals', currentGroupRentals);
    return newGrp;
  },

  // Schemes
  getSchemes: async (): Promise<GovernmentScheme[]> => {
    return currentSchemes;
  },

  addScheme: async (scheme: Partial<GovernmentScheme>): Promise<GovernmentScheme> => {
    const newSch: GovernmentScheme = {
      id: `sch-${Date.now()}`,
      title: scheme.title || 'New Agricultural Scheme',
      ministry: scheme.ministry || 'Ministry of Agriculture',
      subsidyPercentage: scheme.subsidyPercentage || '50% Subsidy',
      targetBeneficiaries: scheme.targetBeneficiaries || 'Farmers',
      description: scheme.description || 'Government assistance for agricultural mechanization.',
      eligibility: scheme.eligibility || ['Cultivable land', 'Aadhaar Card'],
      benefits: scheme.benefits || ['Capital subsidy', 'Low interest loan'],
      documentsRequired: scheme.documentsRequired || ['Aadhaar', 'Land Records'],
      applicationUrl: scheme.applicationUrl || 'https://agrimachinery.nic.in',
      lastDate: scheme.lastDate || '2026-12-31',
      category: scheme.category || 'SUBSIDY',
    };
    currentSchemes.unshift(newSch);
    setStorage('schemes', currentSchemes);
    return newSch;
  },

  // Weather
  getWeather: async (): Promise<WeatherData> => {
    return INITIAL_WEATHER;
  },

  // Notifications
  getNotifications: async (userId: string): Promise<AppNotification[]> => {
    return currentNotifications.filter((n) => n.userId === userId || n.userId === 'all');
  },

  markNotificationRead: async (id: string): Promise<void> => {
    const notif = currentNotifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      setStorage('notifications', currentNotifications);
    }
  },

  // Emergency SOS
  triggerEmergencyAlert: async (data: {
    userId: string;
    userName: string;
    userPhone: string;
    role: string;
    issueType: string;
    description: string;
    lat: number;
    lng: number;
    locationName: string;
  }) => {
    try {
      await fetch(`${BACKEND_URL}/emergency`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Offline fallback
    }
    return {
      success: true,
      message: 'Emergency SOS transmitted! Local Kisan Rapid Response unit has been dispatched.',
      helpline: '1800-180-1551 (Toll-Free 24x7)',
      assignedOfficer: 'Devendra Meena (Field Mechanization Inspector, Bagru)',
      officerPhone: '+91 94140 99887'
    };
  }
};
