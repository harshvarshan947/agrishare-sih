/**
 * AgriShare Input Validation Utilities
 * Validates Email addresses, Indian Mobile Numbers, and Login Identifiers
 */

/**
 * Validates standard email address format (e.g. user@domain.com)
 */
export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  // Standard RFC 5322 compliant regex for practical email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
};

/**
 * Validates standard 10-digit Indian mobile numbers starting with 6, 7, 8, or 9
 * Supports formats: 9829012345, +91 98290 12345, 09829012345, 98290-12345
 */
export const isValidIndianPhone = (phone: string): boolean => {
  const trimmed = phone.trim();
  // If it contains alphabetic characters, it's not a phone number
  if (/[a-zA-Z]/.test(trimmed)) {
    return false;
  }

  // Extract all digit characters
  const digitsOnly = trimmed.replace(/\D/g, '');

  // Must end in a valid 10-digit sequence starting with 6-9
  if (digitsOnly.length === 10) {
    return /^[6-9]\d{9}$/.test(digitsOnly);
  }
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(digitsOnly.slice(2));
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return /^[6-9]\d{9}$/.test(digitsOnly.slice(1));
  }

  return false;
};

/**
 * Normalizes an Indian phone number to "+91 XXXXX XXXXX"
 */
export const formatIndianPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  const last10 = digits.slice(-10);
  if (last10.length === 10) {
    return `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
  }
  return phone;
};

export interface LoginIdentifierValidation {
  isValid: boolean;
  type?: 'email' | 'phone';
  error?: string;
}

/**
 * Validates login input that can be either an Email or a Mobile Number
 */
export const validateLoginIdentifier = (val: string): LoginIdentifierValidation => {
  const trimmed = val.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Please enter your registered email or 10-digit mobile number.',
    };
  }

  // Case 1: Contains letters without '@' -> Cannot be an email or a phone
  if (/[a-zA-Z]/.test(trimmed) && !trimmed.includes('@')) {
    return {
      isValid: false,
      error: 'Invalid format. Please enter a valid email (e.g. name@example.com) or a 10-digit mobile number.',
    };
  }

  // Case 2: Contains '@' -> Must be a valid email
  if (trimmed.includes('@')) {
    if (isValidEmail(trimmed)) {
      return { isValid: true, type: 'email' };
    }
    return {
      isValid: false,
      error: 'Please enter a valid email address with a domain (e.g. name@domain.com).',
    };
  }

  // Case 3: Digits only or phone format
  if (isValidIndianPhone(trimmed)) {
    return { isValid: true, type: 'phone' };
  }

  return {
    isValid: false,
    error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9 (e.g. 9829012345).',
  };
};
