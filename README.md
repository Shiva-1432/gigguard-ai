# 🛡️ GigGuard AI
**AI-Powered Parametric Insurance for Delivery Workers**

> **🔗 Phase 1 Deliverables:**
> * **GitHub Repository:** [gigguard-ai](https://github.com/Shiva-1432/gigguard-ai.git)
> * **2-Minute Pitch Video:** `[Insert Link Here]`

**Team Name:** PrimeVector  
**Team Members:** Podishetti ShivaKrishna (Team Leader), Uppula Vinay Bhaskar, Kunchakuri Dheeraj, Kusuri Karthik, Saripella Vikram Aditya Varma  
**Institution:** Koneru Lakshmaih Educational Foundation (KL University)  
**Hackathon:** Guidewire DEVTrails 2026  
**Phase:** Phase 1 – Ideation & Foundation  

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
9. [Development Roadmap](#9-development-roadmap)
10. [Impact & Compliance](#10-impact--compliance)

---

## 1. Problem Statement
India’s gig economy depends heavily on delivery workers for platforms such as Swiggy, Zomato, Amazon, and Zepto. These workers rely entirely on completed deliveries for their daily income.

However, external disruptions such as **extreme weather, heavy rain, pollution, floods, or sudden curfews** can significantly reduce delivery activity. Recent studies indicate that climate disruptions cost informal and gig workers nearly ₹10,000–₹15,000 in lost income annually. In cities like Hyderabad, monsoon flooding and extreme heatwaves frequently reduce working hours. 

Currently, gig workers bear the full financial loss during these events. **GigGuard AI** solves this by providing an automated parametric insurance platform that protects delivery workers from income loss caused by environmental and social disruptions.

---

## 2. Target Personas

### 🚴‍♂️ Persona 1: Rahul (Full-Time Worker)
* **Demographics:** Age 24 | Hyderabad | Swiggy
* **The Challenge:** Rahul works ~10 hours/day, earning ₹800–₹1200. During heavy rain or high pollution, demand drops and restaurants close. Rahul loses hours of work and a significant portion of his earnings.
* **The Solution:** GigGuard AI automatically compensates him when verified disruptions prevent him from working.

### 🛵 Persona 2: Priya (Part-Time Worker)
* **Demographics:** Age 30 | Hyderabad | Zepto
* **The Challenge:** Priya works part-time evenings to supplement family income. Severe pollution or rain creates unsafe conditions, wiping out her limited earning window.
* **The Solution:** GigGuard AI protects her specific evening shifts by providing automated compensation when disruptions hit.

---

## 3. Proposed Solution & Platform

GigGuard AI is an AI-powered parametric insurance platform. It continuously monitors environmental and social disruption data. When predefined thresholds are crossed, the system automatically triggers payouts—eliminating manual claims and lengthy verifications.

### Platform Choice: Mobile-First Progressive Web App (PWA)
GigGuard AI will be developed as a **Mobile-First Progressive Web App (PWA)**. 
Delivery workers operate primarily through smartphones while on the road. A PWA provides several key advantages for this prototype:
* **Frictionless Access:** Lightweight installation directly from the browser to the home screen without app store approval delays.
* **Cross-Platform:** Seamless compatibility across Android and iOS devices.
* **Integration Ready:** Easy to embed within existing delivery platform web views (like a Swiggy or Zepto partner app).

---

## 4. Parametric Triggers
The platform uses predefined, data-backed disruption conditions to automatically activate claims.

| Disruption Type | Trigger Condition |
| :--- | :--- |
| 🌧️ **Heavy Rain** | Rainfall > 50 mm per hour |
| ☀️ **Extreme Heat** | Temperature > 45°C |
| 🌫️ **Air Pollution** | AQI > 350 |
| 🌊 **Flood Alert** | Government flood warning issued |
| 🚧 **Curfew / Zone Closure** | Restricted delivery zone declared |

### Hybrid Triggers
Complex environmental events often happen simultaneously. Hybrid triggers improve disruption detection accuracy.

| Hybrid Event | Condition |
| :--- | :--- |
| **Heavy Rain + Flood Risk** | Rainfall > 40 mm **AND** flood warning issued |
| **Extreme Heat + Pollution** | Temperature > 40°C **AND** AQI > 300 |

---

## 5. Premium Model
Gig workers operate on weekly income cycles, so GigGuard AI offers micro-premiums tailored to their earnings.

| Tier | Weekly Premium | Income Protection Coverage |
| :--- | :--- | :--- |
| **Basic** | ₹20 / week | ₹200 / day protection |
| **Standard** | ₹40 / week | ₹400 / day protection |
| **Pro** | ₹60 / week | ₹700 / day protection |

**Adoption Strategy:** In-app onboarding tutorials will use real-life examples to demonstrate how micro-premiums translate into meaningful protection. Future scaling includes direct API integration with Swiggy/Zepto for seamless auto-enrollment.

---

## 6. AI & ML Integration
Artificial intelligence elevates the platform from basic insurance to a proactive safety net:

* **Risk Prediction:** Machine learning models analyze historical weather data and disruption frequency to predict the likelihood of income loss in specific geo-zones.
* **Dynamic Premium Calculation:** AI dynamically adjusts weekly premiums based on real-time risk levels and city disruption history.
* **Fraud Detection:** Anomaly detection algorithms monitor GPS data and disruption events to flag suspicious activities (e.g., GPS spoofing).
* **Basis Risk Mitigation:** The system cross-references city-level environmental APIs with localized GPS signals to ensure payouts match actual worker conditions.

---

## 7. System Workflow
1. **Registration:** Worker registers and links their UPI/Payment details.
2. **Plan Selection:** Worker opts into a weekly micro-premium plan.
3. **Continuous Monitoring:** AI monitors OpenWeather and AQI APIs against the worker's live location.
4. **Parametric Trigger:** A threshold (e.g., >50mm rain) is crossed in the worker's zone.
5. **Verification & Processing:** System verifies the worker's active status and processes the claim instantly.
6. **Automated Payout:** Compensation is pushed directly to the worker's UPI.

---

## 8. Architecture & Tech Stack
### Frontend (User Interface)
* **Next.js (React):** For rapid, component-based UI development.
* **TypeScript:** Ensuring type-safe, bug-free code.
* **Tailwind CSS:** For a highly responsive, mobile-first design.

### Backend & Database
* **Node.js / Express.js:** Fast, asynchronous API routing.
* **MongoDB:** Flexible document storage for user profiles and active policies.
* **Python (Scikit-Learn):** Handling the ML models for risk prediction and fraud detection.

### Cloud Infrastructure (AWS Serverless)
To handle sudden, massive spikes in API requests (e.g., thousands of triggers firing simultaneously during a flash flood), the system utilizes a serverless cloud architecture:
* **AWS Lambda & API Gateway:** For auto-scaling trigger execution.
* **DynamoDB:** For high-speed read/writes during mass payout events.

---

## 9. Development Roadmap
* **Phase 1 [March 4 - 20]: Ideation & Foundation:** Finalize triggers, document the AI strategy, and build the initial frontend prototype.
* **Phase 2: Core System Development:** Build the policy engine, integrate OpenWeatherMap APIs, and connect the parametric trigger logic.
* **Phase 3: Optimization & Scaling:** Deploy ML fraud detection, integrate Razorpay/UPI payout simulations, and launch admin dashboards.

---

## 10. Impact & Compliance
* **Regulatory Alignment:** Designed to operate within innovation sandboxes proposed by the **Insurance Regulatory and Development Authority of India (IRDAI)**.
* **Projected Impact:**
    * Provide income protection for 5,000 delivery workers in Hyderabad in Year 1.
    * Reduce income volatility by 30–40% during major disruption events.
    * Support **SDG 8** (Decent Work and Economic Growth) by creating a resilient gig economy.