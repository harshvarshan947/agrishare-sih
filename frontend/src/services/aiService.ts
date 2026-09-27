import { AIMessage } from '../types';

export interface AIResponse {
  message: string;
  recommendedEquipment?: {
    name: string;
    category: string;
    reason: string;
    approxRate: string;
  }[];
  suggestedPrompts: string[];
}

export function queryAgriAI(userQuery: string): AIResponse {
  const query = userQuery.toLowerCase();

  if (query.includes('wheat') || query.includes('gehu') || query.includes('7 acre') || query.includes('8 acre')) {
    return {
      message: `For wheat cultivation across 7 to 8 acres, the recommended mechanization workflow is:

1. **Primary Soil Preparation:** 45-55 HP Tractor with an 11-Tyne Cultivator or 2-Bottom MB Plough to break compacted soil and bury previous crop stubble.
2. **Seedbed Pulverization:** 6-7 ft Rotavator (42-48 blades) to achieve a fine crumbly tilth in 1-2 passes, conserving subsoil moisture.
3. **Sowing & Fertilization:** A 9-Row or 11-Row Zero Till / Multi-Crop Seed Drill. This ensures uniform 5 cm seed depth and simultaneous basal DAP fertilizer placement, saving up to 20% seed and 35% sowing time.

*Disclaimer: Field conditions and soil moisture vary by soil type (e.g. sandy loam vs black cotton). Consult your local Krishi Vigyan Kendra (KVK) for exact seed rate.*`,
      recommendedEquipment: [
        { name: 'Mahindra 575 DI (47 HP)', category: 'Tractor', reason: 'High fuel efficiency for 7-8 acres', approxRate: '₹800/hr' },
        { name: 'Shaktiman Semi-Champion Rotavator', category: 'Rotavator', reason: 'Fast fine tilth preparation', approxRate: '₹600/hr' },
        { name: 'National Zero Till Seed Drill', category: 'Seed Drill', reason: 'Precision row sowing with fertilizer box', approxRate: '₹550/hr' },
      ],
      suggestedPrompts: [
        'How much will renting these machines cost for 8 acres?',
        'Can I do group rental with neighboring farmers?',
        'Is driver and fuel included in rental?'
      ]
    };
  }

  if (query.includes('mustard') || query.includes('sarson')) {
    return {
      message: `For Mustard (Sarson) farming:
- **Tillage:** Requires very fine, leveled seedbed as mustard seeds are tiny (1.5-2.5 kg/acre seed rate).
- **Levelling:** Using a **Laser Land Leveller** is strongly recommended—it reduces irrigation water wastage by 25-30% and guarantees uniform germination.
- **Sowing:** Mustard seed drill with shallow furrow depth (2-3 cm).
- **Spraying:** ASPEE Tractor-mounted boom sprayer for aphid (chepa) protection at 40-50 days.`,
      recommendedEquipment: [
        { name: 'Landforce Laser Land Leveller', category: 'Laser Land Leveller', reason: 'Saves 30% water and prevents waterlogging', approxRate: '₹900/hr' },
        { name: 'Swaraj 855 FE 52 HP', category: 'Tractor', reason: 'Ample hydraulic pull for leveller bucket', approxRate: '₹750/hr' }
      ],
      suggestedPrompts: [
        'Find Laser Levellers near Bagru',
        'What is the per acre cost of Laser Leveller?'
      ]
    };
  }

  if (query.includes('scheme') || query.includes('subsidy') || query.includes('yojana') || query.includes('smam') || query.includes('sarkari')) {
    return {
      message: `Key Government Machinery Subsidies available right now:

1. **SMAM (Sub-Mission on Agricultural Mechanization):**
   - 40% to 50% capital subsidy on tractors, rotavators, and laser levellers for small/marginal/women farmers.
   - Up to 80% subsidy (up to ₹10 Lakhs) for creating Custom Hiring Centres (CHC).
2. **Rajasthan Krishi Upkaran Subsidy (RajKisan Sathi):**
   - Direct DBT subsidy between ₹40,000 and ₹1,20,000 on notified implements.
3. **PM-KUSUM:**
   - 60% combined subsidy for solar agricultural pumps.

You can view complete eligibility and application links under our **Government Schemes** tab!`,
      suggestedPrompts: [
        'Show me documents needed for SMAM subsidy',
        'How do I register a Custom Hiring Centre?',
        'Open Government Schemes'
      ]
    };
  }

  if (query.includes('group') || query.includes('saving') || query.includes('bachat') || query.includes('cost')) {
    return {
      message: `**AgriShare Group Rental** allows 2 to 5 nearby farmers to club their farm plots together when renting equipment.

**Benefits:**
- **Zero Transit Waste:** The equipment moves once to the village cluster instead of multiple individual trips.
- **Bulk Discount:** Owners offer 20% to 35% lower per-acre rates for combined plots.
- **Shared Driver:** Operator costs are split among all group members.

For example, a 9-acre combined wheat sowing cluster in Bagru saves each farmer approximately ₹360 per acre compared to single-farmer booking!`,
      suggestedPrompts: [
        'Join Bagru Wheat Sowing Group',
        'How do I create a new group rental?'
      ]
    };
  }

  if (query.includes('weather') || query.includes('rain') || query.includes('barish') || query.includes('mausam')) {
    return {
      message: `**Current Agri Weather Advisory (Jaipur/Bagru Rural):**
- Temperature: 31°C, Humidity: 58%, Wind: 14 km/h.
- Rain Probability today & tomorrow: Low (10-25%).
- **Advisory:** High suitability for rotavation, tractor ploughing, and manure spreading over the next 48 hours. Light rain is forecasted for Tuesday (30 Sep), so please schedule soil prep beforehand.`,
      suggestedPrompts: [
        'Can I spray pesticide today?',
        'Check 5-day weather forecast'
      ]
    };
  }

  // Default helpful response
  return {
    message: `Hello! I am **AgriAI**, your digital agricultural assistant on AgriShare.

I can help you with:
- Finding the right machinery for your specific crop and acreage
- Calculating estimated rental costs (hourly vs per-acre)
- Explaining how to join **Group Rentals** to save up to 35%
- Checking central and state **Government Subsidies (SMAM / PM-KUSUM)**
- Agricultural weather advisories for sowing and spraying

What crop are you preparing, or what equipment do you need today?`,
    recommendedEquipment: [
      { name: 'Mahindra 575 DI (47 HP)', category: 'Tractor', reason: 'All-round performance', approxRate: '₹800/hr' },
      { name: 'Shaktiman Semi-Champion Rotavator', category: 'Rotavator', reason: 'Best-in-class seedbed preparation', approxRate: '₹600/hr' }
    ],
    suggestedPrompts: [
      'I have 7 acres of wheat. Which equipment do I need?',
      'Tell me about SMAM government subsidy',
      'How does Group Rental save money?',
      'Check farming weather advisory'
    ]
  };
}
