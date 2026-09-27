import { Equipment } from '../types';

export interface MatchingCriteria {
  equipmentType?: string;
  farmAreaAcres?: number;
  maxDistanceKm?: number;
  maxBudgetPerHour?: number;
  driverRequired?: boolean;
  fuelRequired?: boolean;
  dateRequired?: string;
}

export interface MatchResult {
  equipment: Equipment;
  score: number; // 0 - 100
  reasons: string[];
  breakdown: {
    categoryMatch: number; // max 25
    distanceScore: number; // max 20
    healthAndCondition: number; // max 15
    ownerRatingScore: number; // max 15
    priceFitScore: number; // max 15
    driverFitScore: number; // max 10
  };
}

/**
 * Deterministic Multi-Factor Smart Matching Engine
 * Ranks agricultural equipment based on 10 criteria
 */
export function calculateMatchScore(
  equipment: Equipment,
  criteria: MatchingCriteria
): MatchResult {
  const reasons: string[] = [];
  let categoryScore = 25;
  let distanceScore = 20;
  let healthScore = 15;
  let ratingScore = 15;
  let priceScore = 15;
  let driverScore = 10;

  // 1. Equipment Type / Category Match (25 pts)
  if (criteria.equipmentType && criteria.equipmentType !== 'ALL') {
    if (equipment.category.toLowerCase() === criteria.equipmentType.toLowerCase()) {
      categoryScore = 25;
      reasons.push(`✓ Exact equipment match: ${equipment.category}`);
    } else if (
      (criteria.equipmentType === 'Tractor' && equipment.category === 'Power Tiller') ||
      (criteria.equipmentType === 'Cultivator' && equipment.category === 'Rotavator')
    ) {
      categoryScore = 14;
      reasons.push(`✓ Compatible alternative category: ${equipment.category}`);
    } else {
      categoryScore = 5;
    }
  } else {
    categoryScore = 25;
  }

  // 2. Distance from farmer (20 pts)
  const dist = equipment.distanceKm ?? 6.0;
  if (dist <= 5) {
    distanceScore = 20;
    reasons.push(`✓ Local proximity: Only ${dist.toFixed(1)} km away (fast transit)`);
  } else if (dist <= 10) {
    distanceScore = 16;
    reasons.push(`✓ Nearby village: ${dist.toFixed(1)} km from your farm`);
  } else if (dist <= 20) {
    distanceScore = 10;
    reasons.push(`✓ Sub-district cluster: ${dist.toFixed(1)} km distance`);
  } else {
    distanceScore = 5;
  }

  // 3. Equipment Health & Maintenance Condition (15 pts)
  const health = equipment.healthPercentage;
  if (health >= 95) {
    healthScore = 15;
    reasons.push(`✓ Superior equipment health (${health}% certified, newly serviced)`);
  } else if (health >= 90) {
    healthScore = 12;
    reasons.push(`✓ Good operational health (${health}%)`);
  } else if (health >= 80) {
    healthScore = 8;
  } else {
    healthScore = 4;
  }

  // 4. Owner Rating & Historical Reliability (15 pts)
  const rating = equipment.ownerRating;
  if (rating >= 4.85) {
    ratingScore = 15;
    reasons.push(`✓ Top-tier verified owner rating (${rating.toFixed(1)} ★ from ${equipment.ownerVerified ? 'Verified Hub' : 'Farmers'})`);
  } else if (rating >= 4.5) {
    ratingScore = 12;
    reasons.push(`✓ Reliable owner rating (${rating.toFixed(1)} ★)`);
  } else {
    ratingScore = 7;
  }

  // 5. Price / Budget Fit (15 pts)
  if (criteria.maxBudgetPerHour && criteria.maxBudgetPerHour > 0) {
    if (equipment.pricePerHour <= criteria.maxBudgetPerHour) {
      priceScore = 15;
      const savings = criteria.maxBudgetPerHour - equipment.pricePerHour;
      if (savings > 0) {
        reasons.push(`✓ Economical: ₹${equipment.pricePerHour}/hr (₹${savings}/hr below your max budget)`);
      } else {
        reasons.push(`✓ Within your target budget: ₹${equipment.pricePerHour}/hr`);
      }
    } else {
      const overBy = equipment.pricePerHour - criteria.maxBudgetPerHour;
      priceScore = Math.max(2, 15 - Math.round(overBy / 50));
    }
  } else {
    priceScore = 13;
    reasons.push(`✓ Competitive market rate (₹${equipment.pricePerHour}/hr | ₹${equipment.pricePerAcre}/acre)`);
  }

  // 6. Farm Area & Driver Availability Suitability (10 pts)
  if (criteria.driverRequired) {
    if (equipment.driverAvailable) {
      driverScore = 10;
      reasons.push(`✓ Verified trained driver/operator available on demand`);
    } else {
      driverScore = 2;
    }
  } else {
    driverScore = 9;
  }

  // Farm Area scaling check
  if (criteria.farmAreaAcres && criteria.farmAreaAcres > 0) {
    if (criteria.farmAreaAcres > 8 && (equipment.horsePower ?? 40) >= 50) {
      reasons.push(`✓ Heavy ${equipment.horsePower} HP engine ideal for large ${criteria.farmAreaAcres} acres`);
    } else if (criteria.farmAreaAcres <= 3 && equipment.category === 'Power Tiller') {
      reasons.push(`✓ Agile implement tailored for ${criteria.farmAreaAcres} acres`);
    }
  }

  // Availability check
  if (equipment.availabilityStatus === 'AVAILABLE') {
    reasons.push(`✓ Guaranteed availability on requested date`);
  }

  const totalScore = Math.min(
    99,
    Math.max(
      35,
      categoryScore + distanceScore + healthScore + ratingScore + priceScore + driverScore
    )
  );

  return {
    equipment,
    score: totalScore,
    reasons: reasons.slice(0, 5),
    breakdown: {
      categoryMatch: categoryScore,
      distanceScore,
      healthAndCondition: healthScore,
      ownerRatingScore: ratingScore,
      priceFitScore: priceScore,
      driverFitScore: driverScore,
    },
  };
}

export function rankEquipment(
  list: Equipment[],
  criteria: MatchingCriteria
): MatchResult[] {
  return list
    .map((eq) => calculateMatchScore(eq, criteria))
    .sort((a, b) => b.score - a.score);
}
