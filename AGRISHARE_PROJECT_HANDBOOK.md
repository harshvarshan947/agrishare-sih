# 🌾 AGRISHARE – COMPLETE PROJECT HANDBOOK & TEAM GUIDE
### Smart India Hackathon (SIH 2026) | Comprehensive Technical & Product Reference

> **"Share Equipment. Reduce Cost. Grow Together."**  
> *A unified digital platform connecting farmers, equipment owners, and certified operators across rural India.*

---

## 📑 TABLE OF CONTENTS
1. [Executive Summary & SIH Problem Statement](#1-executive-summary--sih-problem-statement)
2. [The Ground Reality & Problem Analysis](#2-the-ground-reality--problem-analysis)
3. [The AgriShare Solution & Core Innovations](#3-the-agrishare-solution--core-innovations)
4. [Role-by-Role Feature Deep-Dive (4 Stakeholders)](#4-role-by-role-feature-deep-dive)
5. [End-to-End User Journeys](#5-end-to-end-user-journeys)
6. [Technical Architecture & System Design](#6-technical-architecture--system-design)
7. [Complete Project File Map & Code Structure](#7-complete-project-file-map--code-structure)
8. [Database Schema (Prisma 22 Models)](#8-database-schema-prisma-22-models)
9. [22-Step SIH Live Presentation & Demo Script](#9-22-step-sih-live-presentation--demo-script)
10. [Business Model, Unit Economics & Market Impact](#10-business-model-unit-economics--market-impact)
11. [Judge Q&A Defense & Frequently Asked Questions](#11-judge-qa-defense--frequently-asked-questions)
12. [Deployment & Local Execution Guide](#12-deployment--local-execution-guide)
13. [Team Presentation Roles & Time Distribution](#13-team-presentation-roles--time-distribution)

---

## 1. EXECUTIVE SUMMARY & SIH PROBLEM STATEMENT

- **Project Title:** AgriShare – Agricultural Equipment Sharing & Mechanization Platform
- **SIH Problem Statement:** *"Match farmers who need agricultural equipment with nearby equipment owners."*
- **Target Ministry / Domain:** Ministry of Agriculture & Farmers Welfare / Rural Mechanization
- **Primary Goal:** Make expensive farm machinery accessible to small and marginal farmers on-demand via an Uber-like marketplace, while enabling equipment owners and rural drivers to maximize seasonal earnings.

---

## 2. THE GROUND REALITY & PROBLEM ANALYSIS

India has over **140 million agricultural households**, of which **86% are small and marginal farmers** holding less than 2 hectares of land.

### The 4 Critical Pain Points:
1. **Excessive Capital Expenditure:** A modern 45–55 HP tractor costs ₹7 to ₹11 Lakhs, with implements (rotavator, laser leveller, happy seeder) adding ₹2 to ₹5 Lakhs. Small farmers cannot afford this capital investment.
2. **Low Asset Utilization for Owners:** Existing tractor owners only utilize their machinery for 300–450 hours per year during their own sowing/harvesting windows. For the remaining 70% of the year, expensive machinery sits idle in sheds depreciating.
3. **Informal & Exploitative Rental Markets:** Farmers currently rely on village middlemen or informal verbal contracts. They face unpredictable pricing, no guarantee of timely arrival, and no verified machine condition.
4. **Scarcity of Skilled Operators/Drivers:** Operating heavy equipment like 4WD tractors or combine harvesters requires specialized skills. Many tractor owners lack full-time operators, while rural youth with driving licenses struggle to find consistent seasonal work.

---

## 3. THE AGRISHARE SOLUTION & CORE INNOVATIONS

AgriShare transforms agricultural mechanization through 7 proprietary innovations:

### 1. Multi-Factor Smart Matching Engine
Instead of basic text search, AgriShare uses an agronomic matching formula:
$$\text{Match Score} = f(\text{Distance}, \text{Acreage/HP Suitability}, \text{Machine Health}, \text{Budget Fit}, \text{Driver Availability})$$
It matches farmers with nearby machinery within a 5–25 km radius and provides clear transparency (e.g. *“94% Match: Only 4.2 km away, 47 HP ideal for 8 acres, 96% certified health”*).

### 2. Double-Handshake OTP Security Protocol
Eliminates disputes regarding equipment custody, operating hours, and damage:
- **Pickup OTP (`4821`):** Equipment owner enters this when releasing the machinery to the assigned driver.
- **Delivery OTP (`7394`):** Farmer enters this when work is completed in their field to trigger instant wallet payout.

### 3. Community Group Rental Pooling
Contiguous farmers in the same village cluster can pool small adjacent plots (e.g., 3 farmers pooling 4 + 3 + 5 = 12 acres). 
- Eliminates repeated tractor transport overhead.
- Unlocks **25% to 35% bulk discount** on rental rates.

### 4. AgriAI Agronomic Assistant
An AI chatbot specialized in Indian agriculture:
- Suggests ideal machinery and horsepower based on crop type, acreage, and soil conditions (Black, Loam, Sandy).
- Calculates estimated fuel consumption.
- Advises on government subsidies (SMAM, PM-KUSUM) and optimal sowing windows.

### 5. Verified Driver & Operator Marketplace
Allows equipment owners to dispatch machinery with certified, background-checked rural operators with verified commercial DL and Aadhaar credentials.

### 6. Subsidies & Government Scheme Integration
Direct linkage to government agricultural mechanization portals (Sub-Mission on Agricultural Mechanization – SMAM, Custom Hiring Centers – CHCs, PM-KUSUM, RajKisan Sathi).

### 7. 24x7 Emergency SOS Helpline
One-tap distress button for mechanical breakdowns, hydraulic failures, or field accidents, connecting directly to the nearest rural mechanization response team and Kisan Call Center (`1800-180-1551`).

---

## 4. ROLE-BY-ROLE FEATURE DEEP-DIVE

AgriShare provides 4 purpose-built portals with distinct permissions and interfaces:

```
                          ┌──────────────────────────┐
                          │   AgriShare Platform     │
                          └─────────────┬────────────┘
         ┌──────────────────┬───────────┴───────────┬──────────────────┐
         ▼                  ▼                       ▼                  ▼
   👨‍🌾 FARMER         🚜 OWNER                🚚 DRIVER           🛡️ ADMIN
   - Search & Match   - Fleet Inventory       - Job Pipeline      - State Analytics
   - Booking & OTP    - Booking Dispatch      - GPS Navigation    - KYC Approvals
   - Group Rentals    - Demand Radar          - OTP Handover      - CHC Centers
   - AgriAI Chatbot   - Maintenance & Health  - Wallet & Payout   - Subsidy Schemes
```

---

### 👨‍🌾 1. FARMER PORTAL (`/farmer/*`)
*Designed for accessibility, voice friendliness, and ease of use in rural conditions.*

| Route | Feature Name | Description & Capabilities |
| :--- | :--- | :--- |
| `/farmer/dashboard` | **Farmer Command Center** | Active bookings with live OTP cards, 5-day weather forecast with agricultural advisories (e.g., *“No rain for 3 days - ideal for soil prep”*), and quick links. |
| `/farmer/search` | **Smart Match Equipment Finder** | Filter by machinery category, acres, crop type, and distance. View algorithmic match scores (e.g. 94%), per-hour and per-acre transparent pricing. |
| `/equipment/:id` | **Machine Detail & Booking Config** | Full specifications, tractor HP, fuel policy, driver selection toggle, transparent price calculation (Base + Driver + Platform Fee - Discounts). |
| `/farmer/bookings` | **Booking Tracker & Field Status** | Live status tracking (*Requested → Driver Assigned → In Transit → Reached Field → Completed*), Pickup OTP, Delivery OTP, and 5-star review system. |
| `/farmer/requests` | **Custom Machinery Broadcast** | Post custom machinery needs when specific equipment is not immediately listed nearby; local owners receive notifications. |
| `/farmer/group-rentals` | **Community Group Pooling** | Join or create village clusters to pool land area and save 25%–35% on rental costs. |
| `/farmer/messages` | **Field Chat & Direct Contact** | Real-time direct chat with equipment owner and assigned driver. |
| `/farmer/profile` | **Farmer Profile & Landholdings** | Verified Aadhaar, land records (Khasra/Khatauni), and rental history. |

---

### 🚜 2. EQUIPMENT OWNER PORTAL (`/owner/*`)
*Fleet management and revenue optimization for tractor & implement owners.*

| Route | Feature Name | Description & Capabilities |
| :--- | :--- | :--- |
| `/owner/dashboard` | **Fleet Overview & Pulse** | Active machines in field, pending rental requests, total revenue earned, and high-demand seasonal alerts. |
| `/owner/equipment` | **Machinery Inventory** | Register new tractors/implements, upload photos, set hourly/acre rates, define fuel policies, and toggle availability. |
| `/owner/bookings` | **Booking Management & Dispatch** | Accept/decline incoming farmer requests and assign verified drivers from the roster. |
| `/owner/demand` | **Unmet Demand Radar** | Heatmap and feed of unfulfilled farmer requests in nearby villages to deploy idle machinery where demand is highest. |
| `/owner/revenue` | **Financial Ledger & Analytics** | Interactive Recharts graphs of daily/weekly/monthly revenue, transaction breakdown, and Direct Benefit Transfer (DBT) payouts. |
| `/owner/drivers` | **Operator Roster Management** | Manage trusted drivers, view driving license verification status, track completed jobs and driver ratings. |
| `/owner/maintenance` | **Predictive Machine Health** | Log operating hours, track hydraulic oil and engine health percentage (e.g., 96%), and view next service due dates. |

---

### 🚚 3. DRIVER / OPERATOR PORTAL (`/driver/*`)
*Mobile-first workflow for heavy machinery operators.*

| Route | Feature Name | Description & Capabilities |
| :--- | :--- | :--- |
| `/driver/dashboard` | **Driver Cockpit** | Assigned jobs for today, current trip status, daily earnings counter, and vehicle telemetry. |
| `/driver/jobs` | **8-Stage Job Pipeline** | Structured step-by-step workflow: *Assigned → En Route to Owner → Reached Pickup → Pickup OTP Verification → En Route to Farmer → Reached Field → Delivery OTP Verification → Job Complete*. |
| `/driver/map` | **GPS Navigation Map** | Live OpenStreetMap/Leaflet route visualization between equipment hub and farmer's field with turn-by-turn guidance. |
| `/driver/earnings` | **Earnings & Payout Ledger** | Per-job operator compensation (e.g., ₹150/hr), overtime allowances, and wallet withdrawal. |
| `/driver/profile` | **Operator Credentials** | Driving license endorsements (heavy tractor, combine), verified safety score, and experience records. |

---

### 🛡️ 4. ADMIN & GOVERNMENT PORTAL (`/admin/*`)
*Monitoring, governance, and state-level agricultural mechanization oversight.*

| Route | Feature Name | Description & Capabilities |
| :--- | :--- | :--- |
| `/admin/dashboard` | **State Mechanization Dashboard** | Total registered machinery, active field rentals, gross transaction value (GTV), and pending verification queue. |
| `/admin/users` | **User Verification & KYC Audit** | Verify or reject Aadhaar, PAN, and DL credentials for Farmers, Owners, and Drivers. |
| `/admin/equipment` | **State Fleet Registry** | Statewide catalog of machinery, Custom Hiring Centers (CHCs), and machinery health status. |
| `/admin/rentals` | **Rental Dispute & Audit Log** | Comprehensive ledger of all bookings, OTP verification audit trails, and safety compliance records. |
| `/admin/demand` | **Statewide Demand Trends** | Crop-wise demand distribution (Wheat, Paddy, Mustard, Cotton) and machinery shortage heatmaps. |
| `/admin/revenue` | **Platform Economics & Assurance** | GTV aggregation, 5% platform fee reserve, and financial settlement records. |
| `/admin/schemes` | **Subsidies & Scheme Manager** | Publish and update central/state mechanization schemes (SMAM, PM-KUSUM, Subsidies). |
| `/admin/reports` | **Compliance Reports** | Exportable CSV audit reports for government evaluators and nodal officers. |

---

## 5. END-TO-END USER JOURNEYS

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE BOOKING & WORKFLOW                         │
└────────────────────────────────────────────────────────────────────────┘

 [1. Farmer searches]  ---> [2. Smart Match Ranks] ---> [3. Farmer Books]
  - Enters: 8 acres,         - Mahindra 575 DI (94%)     - Chooses Date & Slot
    Wheat, Bagru              - 4.2 km, ₹800/hr, Driver   - Transparent Breakdown
                                                          - Gets OTPs: 4821 / 7394
                                                                    │
                                                                    ▼
 [6. Driver Navigates] <--- [5. Driver Assigned]  <--- [4. Owner Accepts]
  - Leaflet GPS Map          - Rajesh Gurjar gets       - Vikram reviews request
  - En route to Owner          push notification         - Dispatches operator
         │
         ▼
 [7. Pickup OTP (4821)] ---> [8. In Transit to Field] ---> [9. Field Work Done]
  - Owner enters OTP           - Driver brings tractor     - 8 acres cultivated
  - Machine released             to Farmer Ramesh            under tractor power
                                                                    │
                                                                    ▼
 [12. Rating & Review] <--- [11. Payout Settled]  <--- [10. Delivery OTP (7394)]
  - 5-Star feedback          - ₹8,500 to Owner           - Farmer enters OTP
  - Trust score updated      - ₹900 to Driver            - Job officially completed
```

---

## 6. TECHNICAL ARCHITECTURE & SYSTEM DESIGN

AgriShare is engineered as a modern, decoupled full-stack web application designed for resilience in low-connectivity rural environments:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                  │
│  React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons             │
│  Interactive UI: Recharts + Leaflet / OpenStreetMap (Free Tile Layer)   │
│  State Management: Unified API Client + LocalStorage Dual-Sync          │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTP REST / JSON
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        API & ROUTING LAYER                              │
│  Node.js + Express.js (Modular REST Controller)                         │
│  Endpoints: /api/auth, /api/equipment, /api/bookings, /api/match,       │
│             /api/emergency, /api/health                                 │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Prisma Client
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATA & STORAGE LAYER                             │
│  Prisma ORM (22 Relational Models)                                      │
│  PostgreSQL / SQLite ready schema with indexes and relations            │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Engineering Decisions:
1. **Zero External Billing Keys:** OpenStreetMap + Leaflet was chosen over Google Maps to eliminate costly API keys and credit card billing constraints, ensuring 100% uptime during presentations.
2. **Dual-Sync Storage Engine:** The platform synchronizes state across an Express REST API backend and in-browser `localStorage`. If network drops during a hackathon evaluation, the demo continues running seamlessly without breaking.
3. **Multilingual Architecture:** A dedicated dictionary supporting 6 Indian languages (English, हिन्दी, राजस्थानी, ગુજરાતી, ਪੰਜਾਬੀ, मराठी) ensures accessibility for rural non-English speakers.
4. **Interactive Floating Demo Bar:** Embedded presenter controller (`SihDemoBar.tsx`) allowing 1-click role jumping and an automated 22-step workflow presentation.

---

## 7. COMPLETE PROJECT FILE MAP & CODE STRUCTURE

```
c:\antigravity project\SIH project\
│
├── package.json                   # Root configuration with monorepo scripts
├── README.md                      # Project summary and quickstart
├── AGRISHARE_PROJECT_HANDBOOK.md  # Complete project handbook (This file)
├── .gitignore                     # Git ignore rules for node_modules and build artifacts
│
├── backend/                       # Node.js + Express REST API
│   ├── server.js                  # Modular Express API + static SPA production server
│   ├── package.json               # Backend dependencies (express, cors, dotenv, @prisma/client)
│   └── prisma/
│       └── schema.prisma          # Comprehensive 22-model Prisma database schema
│
└── frontend/                      # React 18 + Vite + TypeScript application
    ├── index.html                 # Single page application HTML entry point
    ├── vite.config.ts             # Vite build configuration
    ├── tailwind.config.js         # Tailwind CSS styling and theme tokens
    ├── tsconfig.json              # TypeScript configuration
    ├── vercel.json                # Vercel SPA client-side routing rewrites
    ├── netlify.toml               # Netlify SPA build and redirect rules
    │
    ├── public/
    │   ├── _redirects             # Netlify SPA fallback rule
    │   ├── favicon.svg            # AgriShare tractor logo icon
    │   └── icons.svg              # Platform SVG asset sprites
    │
    └── src/
        ├── main.tsx               # React application root mounting
        ├── App.tsx                # Route definitions (28+ application routes)
        ├── index.css              # Global styles, Tailwind directives, Leaflet overrides
        │
        ├── types/
        │   └── index.ts           # Strict TypeScript interfaces (User, Equipment, Booking, etc.)
        │
        ├── context/
        │   ├── AuthContext.tsx        # Authentication state & 1-click role switcher
        │   ├── LanguageContext.tsx    # Multilingual state (6 languages)
        │   └── DemoFlowContext.tsx    # 22-step SIH demo presentation state controller
        │
        ├── services/
        │   ├── api.ts                 # Unified API client with dual-sync storage engine
        │   ├── mockData.ts            # Realistic seed data (Jaipur/Bagru agricultural context)
        │   ├── matchingService.ts     # Multi-factor smart matching & scoring algorithm
        │   └── aiService.ts           # AgriAI agronomic recommendation chatbot engine
        │
        ├── i18n/
        │   └── translations.ts        # Multilingual strings across all 6 languages
        │
        ├── components/
        │   ├── Navbar.tsx             # Responsive header with role badges & language selector
        │   ├── Footer.tsx             # Platform footer with emergency helpline link
        │   ├── Sidebar.tsx            # Role-specific dashboard navigation sidebar
        │   ├── MapComponent.tsx       # Leaflet OpenStreetMap interactive map
        │   ├── WeatherWidget.tsx      # 5-day weather forecast with agricultural advisories
        │   ├── AgriAIAssistant.tsx    # Floating AgriAI interactive assistant drawer
        │   ├── EmergencyModal.tsx     # 24/7 Emergency SOS modal with instant dispatch
        │   └── SihDemoBar.tsx         # Floating SIH presenter control bar with auto-play
        │
        └── pages/
            ├── LandingPage.tsx        # High-converting public landing page
            ├── LoginPage.tsx          # Authentication with 1-click demo role buttons
            ├── RegisterPage.tsx       # User onboarding with role selection
            ├── EquipmentListPage.tsx  # Public machinery catalog
            ├── EquipmentDetailPage.tsx# Equipment configuration & booking portal
            │
            ├── farmer/                # Farmer sub-routes
            │   ├── FarmerDashboard.tsx
            │   ├── FarmerSearch.tsx
            │   ├── FarmerBookings.tsx
            │   ├── FarmerRequests.tsx
            │   ├── FarmerGroupRentals.tsx
            │   ├── FarmerMessages.tsx
            │   └── FarmerProfile.tsx
            │
            ├── owner/                 # Equipment Owner sub-routes
            │   ├── OwnerDashboard.tsx
            │   ├── OwnerEquipment.tsx
            │   ├── OwnerBookings.tsx
            │   ├── OwnerDemand.tsx
            │   ├── OwnerRevenue.tsx
            │   ├── OwnerDrivers.tsx
            │   └── OwnerMaintenance.tsx
            │
            ├── driver/                # Driver/Operator sub-routes
            │   ├── DriverDashboard.tsx
            │   ├── DriverJobs.tsx
            │   ├── DriverMap.tsx
            │   ├── DriverEarnings.tsx
            │   └── DriverProfile.tsx
            │
            └── admin/                 # Administrator & Government sub-routes
                ├── AdminDashboard.tsx
                ├── AdminUsers.tsx
                ├── AdminEquipment.tsx
                ├── AdminRentals.tsx
                ├── AdminDemand.tsx
                ├── AdminRevenue.tsx
                ├── AdminSchemes.tsx
                └── AdminReports.tsx
```

---

## 8. DATABASE SCHEMA (PRISMA 22 MODELS)

The backend schema defined at `backend/prisma/schema.prisma` is production-grade with 22 models:

| Model | Purpose | Key Attributes |
| :--- | :--- | :--- |
| `User` | All actors (Farmer, Owner, Driver, Admin) | `id`, `name`, `phone`, `email`, `role`, `verificationStatus`, `aadhaarMasked` |
| `Equipment` | Registered machinery items | `id`, `name`, `category`, `hp`, `pricePerHour`, `pricePerAcre`, `healthPercentage` |
| `Booking` | Rental contracts & transactions | `id`, `farmerId`, `equipmentId`, `ownerId`, `driverId`, `status`, `pickupOtp`, `deliveryOtp` |
| `EquipmentRequest` | Farmer broadcasted requirements | `id`, `farmerId`, `equipmentType`, `crop`, `farmArea`, `budgetMax`, `status` |
| `GroupRental` | Village cluster pools | `id`, `village`, `targetAreaAcres`, `discountedCostPerAcre`, `savingsPercentage` |
| `GroupRentalMember` | Participants in group rental | `id`, `groupId`, `farmerId`, `acresPledged`, `joinedAt` |
| `DriverProfile` | Operator credentials | `id`, `userId`, `licenseNumber`, `experienceYears`, `verifiedHeavyMachinery` |
| `DriverJob` | Dispatched driving assignments | `id`, `bookingId`, `driverId`, `stage`, `pickupTime`, `completedTime` |
| `MaintenanceRecord` | Machine servicing history | `id`, `equipmentId`, `operatingHours`, `serviceDate`, `notes`, `healthScore` |
| `GovernmentScheme` | Subsidies & initiatives | `id`, `title`, `ministry`, `subsidyPercentage`, `applicationUrl`, `category` |
| `EmergencyAlert` | SOS breakdown dispatches | `id`, `userId`, `lat`, `lng`, `issueType`, `status`, `assignedOfficer` |
| `Review` | 5-star ratings and feedback | `id`, `bookingId`, `authorId`, `targetId`, `rating`, `comment` |
| *+ 10 auxiliary models* | Notifications, GPS telemetry, fuel logs, audit records, wallet transactions, KYC docs. |

---

## 9. 22-STEP SIH LIVE PRESENTATION & DEMO SCRIPT

*Use the floating `SihDemoBar` at the bottom right. You can either click through step-by-step or press **"Auto-Play"**.*

| Step | Role | Screen / Action | Presentation Talking Point |
|:---:|:---:|---|---|
| **1** | Farmer | `/farmer/dashboard` | *"Here is Ramesh Kumar, a wheat farmer in Bagru, Jaipur. His dashboard shows local weather and active rentals."* |
| **2** | Farmer | `/farmer/search` | *"Ramesh needs soil preparation equipment for his 8-acre field before sowing."* |
| **3** | Farmer | Click Search Filters | *"He enters '8 Acres', 'Wheat Crop', and searches within a 10 km radius."* |
| **4** | Farmer | Smart Matching Results | *"Our proprietary algorithm ranks the results based on distance, HP capacity, and price."* |
| **5** | Farmer | View Top Match | *"The Mahindra 575 DI is ranked #1 with a 94% Match: only 4.2 km away with 47 HP ideal for 8 acres."* |
| **6** | Farmer | `/equipment/eq-1` | *"Ramesh opens the machine profile, inspecting certified health (96%) and fuel policies."* |
| **7** | Farmer | Booking Form | *"He selects Acre-based booking, requests a verified driver, and reviews the transparent price breakdown."* |
| **8** | Farmer | Pricing Summary | *"Base ₹7,600 + Driver ₹900 + Platform Fee ₹150. No hidden charges."* |
| **9** | Farmer | Click 'Confirm Booking' | *"Booking confirmed! The system instantly issues two secure codes: Pickup OTP 4821 and Delivery OTP 7394."* |
| **10** | Owner | Switch to `/owner/bookings` | *"Now switching to equipment owner Vikram Singh Shekhawat. He receives the real-time booking alert."* |
| **11** | Owner | Click 'Accept' | *"Vikram accepts the reservation and assigns his certified operator, Rajesh Gurjar."* |
| **12** | Owner | `/owner/maintenance` | *"Vikram monitors machine health telematics (420 operating hours, next service in 60 days)."* |
| **13** | Driver | Switch to `/driver/dashboard` | *"Now switching to driver Rajesh Gurjar. He sees the newly assigned job on his cockpit."* |
| **14** | Driver | `/driver/map` | *"Rajesh opens the GPS navigation map with route guidance to Vikram's machinery hub."* |
| **15** | Driver | `/driver/jobs` | *"Rajesh arrives at the equipment hub. To prevent theft or unauthorized release, OTP handshake is required."* |
| **16** | Driver | Enter Pickup OTP `4821` | *"Pickup OTP 4821 verified! The machine is officially released to the driver."* |
| **17** | Driver | Re-open `/driver/map` | *"Rajesh navigates with the tractor and rotavator to Ramesh's field in Bagru."* |
| **18** | Driver | Reached Field | *"Driver reaches Field No. 4 and performs the 8-acre tillage work."* |
| **19** | Driver | Enter Delivery OTP `7394` | *"Farmer Ramesh verifies the finished work and enters Delivery OTP 7394."* |
| **20** | Driver | `/driver/earnings` | *"Job completed! Rajesh receives his ₹900 driver wage directly into his wallet."* |
| **21** | Owner | `/owner/revenue` | *"Owner Vikram receives ₹8,500 rental payout settled through DBT."* |
| **22** | Admin | `/admin/dashboard` | *"Finally, the Admin Portal: Nodal officers monitor state mechanization, tractor utilization, and subsidy distribution."* |

---

## 10. BUSINESS MODEL, UNIT ECONOMICS & MARKET IMPACT

### How AgriShare Sustains Itself:
1. **5% Platform Facilitation Fee:** Charged on successful equipment rental transactions (e.g., ₹150–₹400 per booking).
2. **Verified Operator Commission:** Nominal 3% commission on driver job payouts.
3. **Featured Machinery Placement:** Equipment owners can sponsor top listings during peak seasonal demand.
4. **Institutional Tie-ups:** Custom Hiring Centers (CHCs) and state agricultural departments pay enterprise dashboard fees for telematics and utilization analytics.

### Unit Economics Example (Single 8-Acre Booking):
- **Gross Booking Value:** ₹8,650
- **Equipment Owner Payout:** ₹7,600 (88%)
- **Verified Driver Payout:** ₹900 (10.4%)
- **AgriShare Platform Revenue:** ₹150 (1.6%)
- **Cost to Farmer:** ₹1,081 per acre (vs. ₹1,600/acre via informal village middlemen — **a 32% net saving for the farmer!**)

---

## 11. JUDGE Q&A DEFENSE & FREQUENTLY ASKED QUESTIONS

#### Q1: "What if small farmers do not have smartphones or internet access?"
> **Answer:** *"AgriShare is designed for rural inclusivity through three channels: (1) Progressive Web App (PWA) with offline caching, (2) Integration with village Common Service Centers (CSCs) and Gram Panchayat Village Level Entrepreneurs (VLEs) who can book on behalf of farmers, and (3) IVR / SMS toll-free booking enabled through the Kisan Call Center hotline (1800-180-1551)."*

#### Q2: "What happens if machinery breaks down during field operation?"
> **Answer:** *"We have a three-tier protection model: (1) Equipment must pass a certified preventative health checklist (operating hours and hydraulic score) before listing, (2) Our 24/7 Emergency SOS feature dispatches the nearest rural mechanic unit, and (3) The farmer is only billed for verified completed hours via the Delivery OTP handshake."*

#### Q3: "How does AgriShare prevent equipment theft or unauthorized use?"
> **Answer:** *"Our Double-Handshake OTP protocol ensures that equipment cannot be released without the Pickup OTP (`4821`), and the transaction cannot close without the Delivery OTP (`7394`). All drivers must have verified commercial driving licenses and Aadhaar identity before being dispatched."*

#### Q4: "How does this differ from existing startups like EM3 or FarMart?"
> **Answer:** *"Older models operated heavy asset-heavy fleets or acted as pure B2B grain traders. AgriShare is a lightweight, zero-inventory peer-to-peer marketplace that incorporates community group pooling (saving farmers 35%), an agronomic AI matching engine, and integrated driver matchmaking."*

---

## 12. DEPLOYMENT & LOCAL EXECUTION GUIDE

### Local Setup (Running on your laptop):
```bash
# 1. Clone repository
git clone <your-repo-url>
cd "SIH project"

# 2. Run backend (Terminal 1)
cd backend
npm install
node server.js
# Runs on http://localhost:5000

# 3. Run frontend (Terminal 2)
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Live Web Hosting:
- **Frontend (Vercel):** Connect GitHub repo → Set Root Directory to `frontend` → Click Deploy. Automatic SSL and global edge CDN.
- **Frontend (Netlify):** Drag-and-drop `frontend/dist` onto [app.netlify.com/drop](https://app.netlify.com/drop) for instant URL in 30 seconds.
- **Full-Stack (Render):** Deploy repository as a single web service. The Express backend automatically serves the React production build on one unified URL.

---

## 13. TEAM PRESENTATION ROLES & TIME DISTRIBUTION

*Recommended 5-minute SIH presentation breakdown for a 4-person team:*

| Member | Title | Speaking Time | Focus Area |
| :--- | :--- | :---: | :--- |
| **Speaker 1** | Team Leader & Product Vision | **1:00 min** | Problem statement, 86% small farmers, high machinery costs, and AgriShare's core proposition. |
| **Speaker 2** | Tech Lead & Architecture | **1:00 min** | Tech stack (React, Leaflet, Express, Prisma), Smart Matching algorithm, and zero-key reliability. |
| **Speaker 3** | Live Demo Driver | **2:00 min** | Execute the 22-step demo using `SihDemoBar`: Farmer books → Owner accepts → Driver delivers with OTP. |
| **Speaker 4** | Business, Impact & Q&A | **1:00 min** | Unit economics (32% farmer savings), government alignment (SMAM), and closing judge Q&A. |

---

*AgriShare – Built with pride for Indian Farmers & Smart India Hackathon 2026.*
