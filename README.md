# 🛡️ GigGuard AI
### AI-Powered Parametric Insurance for Food Delivery Workers

![Hackathon](https://img.shields.io/badge/Hackathon-Guidewire%20DEVTrails%202026-blue)
![Phase](https://img.shields.io/badge/Phase-1%20%E2%80%93%20Ideation%20%26%20Foundation-green)
![Institution](https://img.shields.io/badge/Institution-KL%20University-orange)
![Platform](https://img.shields.io/badge/Platform-Mobile--First%20PWA-purple)

---

> **🔗 Phase 1 Deliverables**
> | Deliverable | Link |
> |---|---|
> | 📁 GitHub Repository | [gigguard-ai](https://github.com/Shiva-1432/gigguard-ai.git) |
> | 🎥 2-Minute Pitch Video | `[Insert Link Here]` |

**Team Members:** Podishetti Shiva Krishna, Uppula Vinay Bhaskar, Kunchakuri Dheeraj, Kusuri Karthik, Saripella Vikram Aditya Varma  
**Institution:** Koneru Lakshmaih Educational Foundation (KL University)  
**Hackathon:** Guidewire DEVTrails 2026  
**Phase:** Phase 1 – Ideation & Foundation  
**Delivery Segment:** Food Delivery — Swiggy / Zomato Partners  

---

## 📑 Table of Contents
1. [Problem Statement](#1-problem-statement)
2. [Target Personas](#2-target-personas)
3. [Proposed Solution & Platform](#3-proposed-solution--platform)
4. [Parametric Triggers](#4-parametric-triggers)
5. [Premium Model](#5-premium-model)
6. [AI & ML Integration](#6-ai--ml-integration)
7. [System Workflow](#7-system-workflow)
8. [Architecture & Tech Stack](#8-architecture--tech-stack)
9. [Phase 1 Roadmap](#9-phase-1-roadmap)
10. [Impact & Compliance](#10-impact--compliance)
11. [Security & Fraud Docs (24-Hour Update)](#11-security--fraud-docs-24-hour-update)

---

## 1. Problem Statement

India's gig economy depends heavily on **food delivery workers** for platforms such as Swiggy and Zomato. These workers rely entirely on completed deliveries for their daily income.

External disruptions — **extreme weather, heavy rain, pollution, floods, or sudden curfews** — can significantly reduce delivery activity and wipe out daily earnings. Recent studies indicate that climate disruptions cost gig workers nearly **₹10,000–₹15,000 in lost income annually**. In cities like Hyderabad, monsoon flooding and extreme heatwaves frequently reduce working hours.

> ❌ Currently, gig workers bear the **full financial loss** during these events with zero safety net.

**GigGuard AI** solves this by providing an **automated parametric insurance platform** that protects food delivery workers from income loss caused by environmental and social disruptions — with zero manual claims and instant UPI payouts.

---

## 2. Target Personas

### 🚴‍♂️ Persona 1: Rahul — Full-Time Food Delivery Worker

| Attribute | Detail |
|---|---|
| Age | 24 |
| City | Hyderabad |
| Platform | Swiggy |
| Daily Earnings | ₹800 – ₹1,200 |
| Working Hours | ~10 hours/day |

**The Challenge:** During heavy rain or high pollution, demand drops and restaurants close. Rahul loses hours of work with no compensation.

**How GigGuard AI Helps:** When a verified disruption hits his zone (e.g., rainfall > 50mm/hr), GigGuard AI automatically detects the event, verifies Rahul's active status, and transfers compensation directly to his UPI — no forms, no waiting.

---

### 🛵 Persona 2: Priya — Part-Time Food Delivery Worker

| Attribute | Detail |
|---|---|
| Age | 30 |
| City | Hyderabad |
| Platform | Swiggy |
| Working Window | Evening shifts only |
| Purpose | Supplementing family income |

**The Challenge:** Priya's entire earning window is the evening. Severe pollution or sudden rain wipes out her only earning opportunity for the day.

**How GigGuard AI Helps:** GigGuard AI monitors her specific shift window. When disruptions make conditions unsafe or unworkable, automated compensation is triggered — protecting her limited but vital income.

---

## 3. Proposed Solution & Platform

GigGuard AI is an **AI-powered parametric insurance platform** that continuously monitors environmental and social disruption data. When predefined thresholds are crossed, the system **automatically triggers payouts** — eliminating manual claims and lengthy verifications entirely.

### ✅ Why Parametric Insurance?

Traditional insurance requires filing claims, submitting proofs, and waiting for approvals — a process food delivery workers cannot navigate. Parametric insurance removes this entirely: **if the trigger condition is met, the payout happens automatically.**

### 📱 Platform Choice: Mobile-First Progressive Web App (PWA)

Delivery workers operate primarily through smartphones while on the road. A PWA is the optimal platform for this solution:

| Advantage | Explanation |
|---|---|
| **Frictionless Access** | Installs directly from browser to home screen — no app store delays |
| **Cross-Platform** | Works seamlessly on both Android and iOS |
| **Lightweight** | Low data usage, suitable for workers on mobile data |
| **Integration Ready** | Easily embeds within existing Swiggy partner web views |

---

## 4. Parametric Triggers

The platform uses predefined, data-backed disruption conditions to automatically activate income protection claims.

### Core Triggers

| Disruption Type | Trigger Condition | Data Source |
|---|---|---|
| 🌧️ **Heavy Rain** | Rainfall > 50 mm/hour | OpenWeatherMap API |
| ☀️ **Extreme Heat** | Temperature > 45°C | OpenWeatherMap API |
| 🌫️ **Air Pollution** | AQI > 350 | CPCB / AQI API |
| 🌊 **Flood Alert** | Government flood warning issued | NDMA API |
| 🚧 **Curfew / Zone Closure** | Restricted delivery zone declared | Local authority feeds |

### Hybrid Triggers

Complex environmental events often occur simultaneously. Hybrid triggers improve disruption detection accuracy and reduce false positives.

| Hybrid Event | Combined Condition |
|---|---|
| **Heavy Rain + Flood Risk** | Rainfall > 40 mm/hr **AND** flood warning issued |
| **Extreme Heat + Pollution** | Temperature > 40°C **AND** AQI > 300 |

> **Note:** All triggers are checked against the worker's **live GPS location** — not just city-wide averages — to ensure payouts match actual on-ground conditions.

---

## 5. Premium Model

Gig workers operate on weekly income cycles. GigGuard AI offers **micro-premiums** tailored to their earnings capacity.

| Tier | Weekly Premium | Daily Income Protection | Best For |
|---|---|---|---|
| 🥉 **Basic** | ₹20 / week | ₹200 / day | Part-time / occasional workers |
| 🥈 **Standard** | ₹40 / week | ₹400 / day | Regular workers |
| 🥇 **Pro** | ₹60 / week | ₹700 / day | Full-time high-earners |

**Adoption Strategy:** In-app onboarding tutorials use real-life examples to show how micro-premiums translate into meaningful protection. Future scaling includes direct API integration with Swiggy for seamless auto-enrollment at partner onboarding.

---

## 6. AI & ML Integration

Artificial intelligence elevates GigGuard AI from basic insurance to a **proactive income safety net**:

### 🔮 Risk Prediction
ML models analyze historical weather data and disruption frequency to predict the likelihood of income loss in specific geo-zones. Workers in high-risk zones receive proactive alerts.

### 💰 Dynamic Premium Calculation
AI dynamically adjusts weekly premiums based on real-time risk levels and the worker's zone disruption history. Workers in historically safe zones pay less.

### 🔍 Fraud Detection & Anti-Spoofing

GigGuard AI uses a **6-layer fraud defense system** that combines deterministic rules with ML scoring:

1. **GPS Validation**: Speed checks, acceleration plausibility, and signal-dropout consistency checks.
2. **Sensor Fusion**: Accelerometer + gyroscope correlation against claimed GPS movement.
3. **Network Verification**: Cell-tower and WiFi-based cross-validation against GPS claims.
4. **Behavioral Analysis**: Session integrity, request-rate anomalies, and claim pattern checks.
5. **Device/Payment Linkage**: Fingerprint linking, shared UPI detection, and ring-risk scoring.
6. **Rate Limiting**: Per-account, per-device, and per-UPI caps with burst throttling.

**Risk routing:**
- **Low risk (0-30)** → Auto payout
- **Medium risk (31-70)** → Conditional payout + evidence request
- **High risk (71-100)** → Hold + manual review

**Design target:** 95%+ fraud detection with <5% false-positive rate.

### 🛡️ Anti-Spoofing Architecture (24-Hour Requirement)

This section defines exactly how GigGuard AI differentiates a genuine worker from a spoofed identity in real time.

#### A. Clear Differentiation Logic: Real vs. Spoofed Worker

For each payout candidate, the platform computes a **Risk Score (0-100)** using independent evidence streams. Decision thresholds:

| Risk Score Range | Classification | Action |
|---|---|---|
| **0-30** | Low risk (genuine likely) | Auto-approve payout |
| **31-70** | Medium risk (uncertain) | Step-up verification + conditional queue |
| **71-100** | High risk (spoof likely) | Block auto-payout, send to manual review |

Core logic (simplified):

```
Risk Score =
  30% Sensor Integrity Risk +
  25% Network Authenticity Risk +
  20% Device Fingerprint Risk +
  15% Behavior Pattern Risk +
  10% Geo-Cluster Risk
```

#### B. Multi-Source Data Signals Used

Instead of relying only on GPS + public APIs, anti-spoofing combines multiple orthogonal signals:

| Signal Family | Examples Captured | What It Detects |
|---|---|---|
| **Sensor Data** | GPS drift, accelerometer-motion correlation, heading consistency, speed realism | Mock-location apps, impossible movement, stationary spoofing |
| **Network Data** | IP geolocation vs GPS, ASN reputation, VPN/proxy/Tor usage, rapid IP hopping | Remote location masking and scripted abuse |
| **Device Fingerprinting** | OS version, app build hash, secure device ID, emulator/root/jailbreak indicators | Multi-account farms, emulated devices |
| **Behavioral Signals** | Session duration, online/offline cadence, claim timing patterns, route entropy | Bot-like or rehearsed fraud behavior |
| **Cluster Signals** | Same pattern across nearby users, shared fingerprint artifacts, synchronized claim bursts | Coordinated fraud rings |

#### C. Detection Pipeline

1. **Ingest**: Stream worker telemetry every few seconds while active.
2. **Normalize**: Clean out noisy sensor readings and enrich with network/device metadata.
3. **Feature Build**: Compute spoof-risk features (mock-location probability, VPN confidence, route plausibility score).
4. **Model + Rules**: Blend ML anomaly score with deterministic policy rules.
5. **Decision Engine**: Assign trust tier and payout action.
6. **Audit Trail**: Store explainable reason codes for compliance and user appeals.

#### D. Coordinated Fraud Attack Handling (Telegram / Mass Spoofing Scenario)

GigGuard AI includes a dedicated **Fraud Ring Response Mode** for mass spoof campaigns:

1. **Burst Detection**: Detect unusual spikes in claims from one zone/time window.
2. **Graph Link Analysis**: Build real-time graph of accounts, devices, IP blocks, and movement signatures.
3. **Ring Scoring**: Mark connected components with high shared-risk patterns.
4. **Progressive Containment**:
  - Soft-hold suspicious payouts (minutes)
  - Hard-block repeated high-risk entities
  - Expand monitoring radius to adjacent zones
5. **Attack Playbook Trigger**:
  - Raise severity level (L1-L3)
  - Increase decision thresholds temporarily
  - Notify fraud ops dashboard for rapid triage

This prevents coordinated payout drain while allowing unaffected genuine workers to continue receiving claims.

#### E. UX Handling for Flagged Genuine Users (False Positive Safety)

If a genuine worker is flagged, the UX is designed to recover quickly and fairly:

1. **Transparent Notice**: App shows clear reason category (for example, location mismatch or network anomaly).
2. **Step-Up Verification**: Worker can complete one-tap checks (live location refresh, device integrity check, selfie/liveness if required).
3. **Fast Appeal Window**: In-app appeal with timeline target (for example, < 30 minutes for priority cases).
4. **Provisional Relief**: Partial emergency payout option for high-confidence workers pending final review.
5. **Post-Review Learning**: Confirmed false positives are fed back to model calibration to reduce repeat friction.

#### F. Explainability and Fairness Controls

- Every blocked/delayed payout includes machine + rule reason codes.
- No single signal can permanently ban a worker; decisions require multi-signal corroboration.
- Regular threshold calibration is performed by city/zone to avoid bias due to connectivity differences.
- Human override remains available for disputed cases.

### 📍 Basis Risk Mitigation
The system cross-references city-level environmental APIs with **localized GPS signals** to ensure payouts match actual worker conditions — not just regional averages.

---

## 7. System Workflow

```
[Worker Registers + Links UPI]
            ↓
   [Selects Weekly Plan]
            ↓
[AI Continuously Monitors Weather + AQI APIs vs Worker's GPS Zone]
            ↓
     [Disruption Threshold Crossed?]
            ↓
[Verify Worker Active Status + Fraud Check]
            ↓
    [Instant UPI Payout Triggered]
            ↓
  [Worker Notified via App + SMS]
```

### Anti-Spoofing Decision Workflow (Detailed)

```
[Trigger Candidate Identified]
            ↓
[Collect Sensor + Network + Device + Behavior + Cluster Signals]
            ↓
[Compute Risk Score + Fraud Ring Score]
            ↓
[Decision]
  ├─ Risk 0-30 and Ring Risk Low      → Auto Payout
  ├─ Risk 31-70 or Ring Risk Medium   → Step-Up Verification Queue
  └─ Risk 71-100 or Ring Risk High    → Hold + Manual Fraud Review
            ↓
[User Notification + Explainable Reason + Appeal Path]
```

**Step-by-Step:**
1. **Registration** — Worker registers and links UPI/payment details
2. **Plan Selection** — Worker opts into a weekly micro-premium plan
3. **Continuous Monitoring** — AI monitors OpenWeather and AQI APIs against worker's live location
4. **Parametric Trigger** — A threshold (e.g., >50mm rain) is crossed in the worker's zone
5. **Verification & Processing** — System verifies active status and runs fraud checks
6. **Automated Payout** — Compensation pushed directly to the worker's UPI within minutes

### App Screens (Wireframe)
![App Wireframe](./prototype/wireframe.png)

### System Architecture
![System Architecture](./docs/architecture.png)

---

## 8. Architecture & Tech Stack

### 🖥️ Frontend
| Technology | Purpose |
|---|---|
| **Next.js (React)** | Rapid, component-based PWA development |
| **TypeScript** | Type-safe, bug-free code |
| **Tailwind CSS** | Responsive, mobile-first design |

### ⚙️ Backend & Database
| Technology | Purpose |
|---|---|
| **Node.js / Express.js** | Fast, asynchronous API routing |
| **MongoDB** | Flexible document storage for user profiles and policies |
| **Python (Scikit-Learn)** | ML models for risk prediction and fraud detection |

### ☁️ Cloud Infrastructure (AWS Serverless)
| Service | Purpose |
|---|---|
| **AWS Lambda + API Gateway** | Auto-scaling trigger execution |
| **DynamoDB** | High-speed reads/writes during mass payout events |

### 🔌 External Integrations
| Integration | Purpose |
|---|---|
| **OpenWeatherMap API** | Real-time weather trigger data |
| **CPCB / AQI API** | Air quality index monitoring |
| **NDMA API** | Flood and disaster alerts |
| **Razorpay / UPI** | Instant payout processing |

### 🔐 Fraud Prevention Services
| Service | Purpose |
|---|---|
| **Device Fingerprinting SDK** | Real-time device ID generation and linked-account detection |
| **Sensor Fusion Engine** | Accelerometer + gyroscope + GPS consistency scoring |
| **Telecom APIs (Jio/Airtel)** | Cell-tower triangulation for location verification |
| **Google WiFi Geolocation API** | WiFi-based location cross-validation |
| **Ring Detection Engine** | Clustering + timing + payment-link analysis |
| **Rate Limiting Service** | Per-account, per-device, per-UPI caps and burst protection |

---

## 9. Phase 1 Roadmap

### ✅ Phase 1 — Ideation & Foundation *(March 4 – 20)*

- [x] Define target persona and delivery segment (Food — Swiggy)
- [x] Identify and define parametric triggers (environmental + social)
- [x] Design hybrid trigger conditions
- [x] Define weekly micro-premium model (3 tiers)
- [x] Document AI/ML integration strategy
- [x] Justify PWA as platform choice
- [x] Design system architecture diagram
- [x] Build app wireframes (4 key screens)
- [x] Create GitHub README
- [x] Record and upload 2-minute pitch video

---

## 10. Impact & Compliance

### 📊 Projected Impact
| Metric | Target |
|---|---|
| Workers protected in Hyderabad (Year 1) | 5,000+ |
| Income volatility reduction | 30–40% during disruption events |
| Claim processing time | < 5 minutes (fully automated) |

### 🏛️ Regulatory Alignment
- Designed to operate within **IRDAI innovation sandboxes** (Insurance Regulatory and Development Authority of India)
- Coverage strictly limited to **loss of income only** — excludes health, life, vehicle, and accident coverage
- Compliant with India's **UPI payment infrastructure** for instant disbursements

### 🌍 SDG Alignment
- **SDG 8** — Decent Work and Economic Growth: Financial safety net for informal gig workers
- **SDG 10** — Reduced Inequalities: Protects India's most economically vulnerable workforce
- **SDG 13** — Climate Action: Helps workers adapt to climate-driven income shocks

---

## 11. Security & Fraud Docs (24-Hour Update)

To keep this README readable while still providing production-depth anti-spoofing details, the complete 24-hour update is documented in dedicated files:

- 📑 **Master Index:** [MASTER_INDEX.md](./docs/MASTER_INDEX.md)
- 📄 **Architecture Addendum:** [ANTI_SPOOFING_ARCHITECTURE_ADDENDUM.md](./docs/ANTI_SPOOFING_ARCHITECTURE_ADDENDUM.md)
- 📊 **Visual Diagrams:** [ANTI_SPOOFING_VISUAL_DIAGRAMS.md](./docs/ANTI_SPOOFING_VISUAL_DIAGRAMS.md)
- 🔍 **Gap Analysis:** [GAP_ANALYSIS.md](./docs/GAP_ANALYSIS.md)
- 🔧 **Integration Guide:** [INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md)
- 📌 **Summary Report:** [SUMMARY_REPORT.md](./docs/SUMMARY_REPORT.md)
- 🎯 **One-Page Cheat Sheet:** [ANTI_SPOOFING_CHEAT_SHEET.md](./docs/ANTI_SPOOFING_CHEAT_SHEET.md)
- 🗂️ **Cheat Sheet Alias:** [CHEAT_SHEET.md](./docs/CHEAT_SHEET.md)

These docs cover:
- explicit spoofing differentiation algorithms
- multi-source signals beyond GPS
- coordinated ring attack handling
- false-positive recovery workflows and appeals
- risk scoring and rate-limiting controls

---

## 📁 Repository Structure

```
gigguard-ai/
├── README.md              ← This file (Phase 1 submission)
├── docs/
│   ├── architecture.png                       ← System architecture diagram
│   ├── ANTI_SPOOFING_ARCHITECTURE_ADDENDUM.md ← Detailed anti-spoofing design
│   ├── ANTI_SPOOFING_VISUAL_DIAGRAMS.md       ← Visual fraud-defense flows
│   ├── ANTI_SPOOFING_CHEAT_SHEET.md            ← One-page judge/pitch quick reference
│   ├── CHEAT_SHEET.md                          ← Shortcut alias to one-page cheat sheet
│   ├── GAP_ANALYSIS.md                        ← Gap assessment and risk analysis
│   ├── INTEGRATION_GUIDE.md                   ← README integration and checklist
│   ├── SUMMARY_REPORT.md                      ← 24-hour update executive summary
│   └── MASTER_INDEX.md                        ← Complete package navigation index
└── prototype/
    └── wireframe.png      ← App wireframe screens
```

---
