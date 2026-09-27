# 🌱 AgriShare – Agricultural Equipment Sharing Platform

> **"Share Equipment. Reduce Cost. Grow Together."**  
> *Developed for the Smart India Hackathon (SIH 2026)*

---

## 📌 Problem Statement & Solution
**SIH Problem Statement:** *"Match farmers who need agricultural equipment with nearby equipment owners."*

Small and marginal farmers across India face prohibitive capital costs when purchasing modern machinery (tractors, rotavators, laser land levellers, combine harvesters). Meanwhile, existing equipment owners experience low machine utilization outside their own planting windows.

**AgriShare** bridges this gap as a digital agricultural equipment sharing and rental marketplace. It connects farmers with nearby equipment owners and verified machine operators within a 5–25 km radius, introducing:
1. **Multi-Factor Smart Matching Algorithm:** Ranks equipment using distance, plot size suitability, equipment health certification, and budget fit.
2. **Community Group Rental Pooling:** Enables contiguous farmers to pool acres together, slashing transit overhead and saving up to 35% on rental costs.
3. **Two-Factor OTP Handover Protocol:** Eliminates machine disputes through Pickup OTP (`4821`) and Delivery OTP (`7394`) verification.
4. **AgriAI Agronomic Assistant:** Conversational assistant for equipment sizing, soil preparation advice, and government subsidy guidance.
5. **Government Schemes Integration:** Built-in portal for central & state mechanization schemes (SMAM, PM-KUSUM, RajKisan Sathi).
6. **24/7 Emergency SOS Helpline:** One-tap assistance for mechanical breakdowns and roadside support.

---

## 🚀 Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Lucide React Icons |
| **Data Visualization** | Recharts (Revenue, Demand trends, Utilization) |
| **Geospatial & Mapping** | OpenStreetMap + Leaflet (Driver navigation, route polylines) |
| **Backend** | Node.js, Express.js (REST API) |
| **Database & Schema** | Prisma ORM (22 models defined in `backend/prisma/schema.prisma`) |
| **State & Offline Sync** | Unified API Client with LocalStorage synchronization & instant fallbacks |
| **Multilingual** | 6 Regional Languages (English, हिन्दी, राजस्थानी, ગુજરાતી, ਪੰਜਾਬੀ, मराठी) |

---

## 👥 Role-Based Dashboards & Workflows

### 👨‍🌾 1. Farmer Portal (`/farmer/*`)
- **Dashboard (`/farmer/dashboard`):** Active bookings with live OTPs, 5-day weather advisories, quick links.
- **Smart Matching Search (`/farmer/search`):** Search by crop, acres, and budget. Calculates composite **Match Score (e.g. 94%)** with explicit reasons.
- **My Bookings (`/farmer/bookings`):** Live GPS route tracking, Pickup OTP (`4821`), Delivery OTP (`7394`), and 5-star review ratings.
- **Smart Requests (`/farmer/requests`):** Broadcast custom machinery requests to local equipment owners.
- **Group Rentals (`/farmer/group-rentals`):** Neighborhood cluster pooling with savings calculation (25% to 35%).
- **Field Messages (`/farmer/messages`):** Chat directly with equipment owner and assigned driver.
- **Profile & KYC (`/farmer/profile`):** Aadhaar and landholding verification status.

### 🚜 2. Equipment Owner Portal (`/owner/*`)
- **Dashboard (`/owner/dashboard`):** Fleet availability, active rentals, monthly earnings, and high demand alerts.
- **Equipment Inventory (`/owner/equipment`):** Add/edit machinery, adjust per-hour/per-acre rates, pause/resume units.
- **Booking Requests (`/owner/bookings`):** Review farmer requests, accept/reject, and assign certified drivers.
- **Demand Radar (`/owner/demand`):** Unfulfilled farmer demand heatmaps, surge alerts, and potential revenue.
- **Fleet Revenue (`/owner/revenue`):** Daily, weekly, and monthly Recharts graphs, bank DBT settlement ledger.
- **Driver Management (`/owner/drivers`):** Operator roster, driving license verification, and job performance.
- **Preventative Maintenance (`/owner/maintenance`):** Operating hours, hydraulic health %, service schedules.

### 🚚 3. Driver / Operator Portal (`/driver/*`)
- **Dashboard (`/driver/dashboard`):** Today's assigned jobs, active transit status, daily earnings summary.
- **Job Pipeline (`/driver/jobs`):** 8-stage pipeline progression (*Assigned → Going to Pickup → Reached Pickup → Pickup OTP Verified → On the Way → Delivery OTP Verified → Completed*).
- **Route Navigation Map (`/driver/map`):** Interactive Leaflet GPS map with simulated movement and turn-by-turn landmarks.
- **Earnings Ledger (`/driver/earnings`):** Per-job payouts, overtime calculations, instant DBT transfers.
- **Profile (`/driver/profile`):** Commercial heavy vehicle driving license endorsements.

### 🛡️ 4. Admin Portal (`/admin/*`)
- **Dashboard (`/admin/dashboard`):** Statewide mechanization metrics, fleet distribution, pending KYC queue.
- **User Management (`/admin/users`):** Verify, reject, or audit Farmer, Owner, and Driver identities.
- **Fleet Assets (`/admin/equipment`):** Statewide register of all 20+ machines and Custom Hiring Centres.
- **Rental Analytics (`/admin/rentals`):** Complete booking ledger, OTP audits, cancellation monitoring.
- **Demand Analytics (`/admin/demand`):** Seasonal demand surge graphs (Kharif vs Rabi machinery).
- **Revenue Reports (`/admin/revenue`):** District-wise GTV and 5% platform assurance reserve.
- **Government Schemes (`/admin/schemes`):** Publish and manage SMAM, PM-KUSUM, and state subsidies.
- **Audit Reports (`/admin/reports`):** Export complete CSV logs for evaluation.

---

## ⚡ 22-Step SIH Presentation Scenario

The platform includes a dedicated **Floating Demo Controller (`SihDemoBar`)** at the bottom of the screen. Evaluators can step through the entire end-to-end workflow or click **"Auto-Play"** to watch it execute in ~2 minutes:

| Step | Actor | Action Description | Route |
|:---:|:---:|---|:---:|
| **1** | Farmer | Ramesh Kumar logs into Farmer Portal in Bagru | `/farmer/dashboard` |
| **2** | Farmer | Enters requirement: 8 acres wheat soil prep | `/farmer/search` |
| **3** | Farmer | Scans 10 km radius for available tractors | `/farmer/search` |
| **4** | Farmer | AI matching engine ranks Mahindra 575 DI as #1 Match | `/farmer/search` |
| **5** | Farmer | Sees 94% Match: 4.2 km away, ₹800/hr, Driver included | `/farmer/search` |
| **6** | Farmer | Selects equipment details & specifications | `/equipment/eq-1` |
| **7** | Farmer | Configures rental: 8 acres, driver included, fuel policy | `/equipment/eq-1` |
| **8** | Farmer | Transparent price breakdown: Base ₹7,600 + Driver ₹900 | `/equipment/eq-1` |
| **9** | Farmer | Confirms booking; Pickup OTP `4821` & Delivery OTP `7394` generated | `/farmer/bookings` |
| **10** | Owner | Owner Vikram receives live booking request from Ramesh | `/owner/bookings` |
| **11** | Owner | Owner accepts reservation and selects certified driver | `/owner/bookings` |
| **12** | Owner | Driver Rajesh Gurjar assigned to machine transit | `/owner/bookings` |
| **13** | Driver | Rajesh receives job dispatch notification on dashboard | `/driver/jobs` |
| **14** | Driver | Opens GPS route navigation map | `/driver/map` |
| **15** | Driver | Driver reaches Vikram Equipment Hub in Bagru | `/driver/jobs` |
| **16** | Driver | Owner verifies Pickup OTP `4821`; machine released | `/driver/jobs` |
| **17** | Driver | Driver transports tractor & rotavator to farmer field | `/driver/map` |
| **18** | Driver | Driver reaches Ramesh Kumar Field No. 4 | `/driver/jobs` |
| **19** | Driver | Farmer verifies Delivery OTP `7394`; work confirmed | `/driver/jobs` |
| **20** | Driver | 8 acres cultivation completed; job marked finished | `/driver/earnings` |
| **21** | Owner | Vikram receives ₹8,500 rental payout in wallet | `/owner/revenue` |
| **22** | Farmer | Ramesh provides 5-star rating and review feedback | `/farmer/bookings` |

---

## 🏃 How to Run the Application

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Start Backend API
\`\`\`bash
cd backend
node server.js
# Backend runs on http://localhost:5000
\`\`\`

### 2. Start Frontend Application
\`\`\`bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
\`\`\`

### 3. Verify Health
- Frontend UI: [http://localhost:5173](http://localhost:5173)
- Backend API Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🌐 Quick Demo Logins
Use the **1-Click Demo Login** buttons on the Login page or floating toolbar:
- **Farmer:** Ramesh Kumar (`ramesh.farmer@agrishare.in`)
- **Equipment Owner:** Vikram Singh Shekhawat (`vikram.singh@agrishare.in`)
- **Driver / Operator:** Rajesh Gurjar (`rajesh.driver@agrishare.in`)
- **Platform Admin:** Amit Sharma (`admin@agrishare.in`)

---
*AgriShare – Built with pride for Indian Farmers & Smart India Hackathon.*
