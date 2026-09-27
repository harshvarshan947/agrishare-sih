import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

export interface DemoStep {
  step: number;
  title: string;
  actor: 'Farmer' | 'Owner' | 'Driver';
  actionDesc: string;
  route: string;
}

export const DEMO_STEPS: DemoStep[] = [
  { step: 1, title: 'Farmer Login', actor: 'Farmer', actionDesc: 'Farmer Ramesh Kumar logs in at Bagru', route: '/farmer/dashboard' },
  { step: 2, title: 'Smart Requirement', actor: 'Farmer', actionDesc: 'Farmer enters requirement: 8 acres wheat soil prep', route: '/farmer/search' },
  { step: 3, title: 'Nearby Discovery', actor: 'Farmer', actionDesc: 'Platform scans 10 km radius for available tractors', route: '/farmer/search' },
  { step: 4, title: 'AI Match Ranking', actor: 'Farmer', actionDesc: 'Matching engine ranks Mahindra 575 DI as #1 Match', route: '/farmer/search' },
  { step: 5, title: 'Inspect Match Factors', actor: 'Farmer', actionDesc: '94% Match: 4.2 km away, ₹800/hr, Driver included', route: '/farmer/search' },
  { step: 6, title: 'Select Equipment', actor: 'Farmer', actionDesc: 'Selects Mahindra 575 DI Sarpanch 47 HP', route: '/equipment/eq-1' },
  { step: 7, title: 'Configure Rental', actor: 'Farmer', actionDesc: 'Sets Date: Tomorrow, 8 Acres, Driver: Yes, Fuel: Farmer', route: '/equipment/eq-1' },
  { step: 8, title: 'Price Breakdown', actor: 'Farmer', actionDesc: 'Transparent breakdown: Base ₹7,600 + Driver ₹900 + Platform Fee', route: '/equipment/eq-1' },
  { step: 9, title: 'Confirm & Generate OTPs', actor: 'Farmer', actionDesc: 'Farmer reserves. Pickup OTP 4821 & Delivery OTP 7394 generated', route: '/farmer/bookings' },
  { step: 10, title: 'Owner Notification', actor: 'Owner', actionDesc: 'Owner Vikram receives live booking request from Ramesh', route: '/owner/bookings' },
  { step: 11, title: 'Owner Accepts', actor: 'Owner', actionDesc: 'Owner accepts reservation and selects certified driver', route: '/owner/bookings' },
  { step: 12, title: 'Driver Assignment', actor: 'Owner', actionDesc: 'Driver Rajesh Gurjar assigned to machine transit', route: '/owner/bookings' },
  { step: 13, title: 'Driver Receives Job', actor: 'Driver', actionDesc: 'Rajesh receives pickup dispatch notification', route: '/driver/jobs' },
  { step: 14, title: 'Route Navigation Map', actor: 'Driver', actionDesc: 'Interactive map shows route: Driver → Equipment Hub → Farm', route: '/driver/map' },
  { step: 15, title: 'Reached Pickup Hub', actor: 'Driver', actionDesc: 'Rajesh arrives at Vikram Farm Hub in Bagru', route: '/driver/jobs' },
  { step: 16, title: 'Pickup OTP Verification', actor: 'Driver', actionDesc: 'Owner verifies Pickup OTP 4821. Tractor handed over', route: '/driver/jobs' },
  { step: 17, title: 'En Route to Farm', actor: 'Driver', actionDesc: 'Driver transports tractor with rotavator to farmer field', route: '/driver/map' },
  { step: 18, title: 'Arrival at Farmer Plot', actor: 'Driver', actionDesc: 'Tractor arrives at Ramesh Kumar field no. 4', route: '/driver/jobs' },
  { step: 19, title: 'Delivery OTP Verification', actor: 'Driver', actionDesc: 'Farmer verifies Delivery OTP 7394 to unlock job', route: '/driver/jobs' },
  { step: 20, title: 'Work Completion', actor: 'Driver', actionDesc: '8 acres successfully rotavated & seeded. Job finished!', route: '/driver/earnings' },
  { step: 21, title: 'Owner Revenue Settled', actor: 'Owner', actionDesc: 'Vikram receives ₹8,500 rental payout in wallet', route: '/owner/revenue' },
  { step: 22, title: '5-Star Review & Rating', actor: 'Farmer', actionDesc: 'Ramesh gives 5-star rating and glowing feedback!', route: '/farmer/bookings' },
];

interface DemoFlowContextType {
  currentStep: number;
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  jumpToStep: (stepNumber: number) => Promise<void>;
  resetDemo: () => Promise<void>;
  runAllStepsAuto: () => Promise<void>;
}

const DemoFlowContext = createContext<DemoFlowContextType | undefined>(undefined);

export const DemoFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(true);
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const applyStepAction = async (stepNum: number) => {
    const stepObj = DEMO_STEPS.find((s) => s.step === stepNum);
    if (!stepObj) return;

    // Switch roles automatically based on actor
    if (stepObj.actor === 'Farmer') {
      await loginAsRole('FARMER');
    } else if (stepObj.actor === 'Owner') {
      await loginAsRole('OWNER');
    } else if (stepObj.actor === 'Driver') {
      await loginAsRole('DRIVER');
    }

    // Apply specific business logic triggers
    if (stepNum === 9) {
      // Create or update demo booking
      await api.updateBookingStatus('book-101', 'REQUESTED');
    } else if (stepNum === 11) {
      await api.updateBookingStatus('book-101', 'ACCEPTED');
    } else if (stepNum === 12) {
      await api.updateBookingStatus('book-101', 'DRIVER_ASSIGNED', {
        driverId: 'driver-1',
        driverName: 'Rajesh Gurjar',
        driverPhone: '+91 97850 11111',
      });
    } else if (stepNum === 15) {
      await api.updateBookingStatus('book-101', 'REACHED_PICKUP');
    } else if (stepNum === 16) {
      await api.verifyOtp('book-101', 'PICKUP', '4821');
    } else if (stepNum === 17) {
      await api.updateBookingStatus('book-101', 'ON_THE_WAY');
    } else if (stepNum === 18) {
      await api.updateBookingStatus('book-101', 'REACHED_FARMER');
    } else if (stepNum === 19) {
      await api.verifyOtp('book-101', 'DELIVERY', '7394');
    } else if (stepNum === 20) {
      await api.updateBookingStatus('book-101', 'COMPLETED');
    } else if (stepNum === 22) {
      await api.rateBooking('book-101', 5, 'Superb tractor condition! Rajesh did clean 8-acre soil prep.');
    }

    navigate(stepObj.route);
  };

  const nextStep = async () => {
    if (currentStep < DEMO_STEPS.length) {
      const next = currentStep + 1;
      setCurrentStep(next);
      await applyStepAction(next);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      applyStepAction(prev);
    }
  };

  const jumpToStep = async (stepNum: number) => {
    setCurrentStep(stepNum);
    await applyStepAction(stepNum);
  };

  const resetDemo = async () => {
    setCurrentStep(1);
    await api.updateBookingStatus('book-101', 'DRIVER_ASSIGNED');
    await applyStepAction(1);
  };

  const runAllStepsAuto = async () => {
    for (let i = 1; i <= DEMO_STEPS.length; i++) {
      setCurrentStep(i);
      await applyStepAction(i);
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  };

  return (
    <DemoFlowContext.Provider
      value={{
        currentStep,
        isDemoActive,
        setIsDemoActive,
        nextStep,
        prevStep,
        jumpToStep,
        resetDemo,
        runAllStepsAuto,
      }}
    >
      {children}
    </DemoFlowContext.Provider>
  );
};

export const useDemoFlow = () => {
  const ctx = useContext(DemoFlowContext);
  if (!ctx) {
    throw new Error('useDemoFlow must be used within DemoFlowProvider');
  }
  return ctx;
};
