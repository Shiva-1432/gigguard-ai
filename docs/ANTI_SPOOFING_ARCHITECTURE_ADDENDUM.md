# GigGuard AI - Anti-Spoofing Architecture (24-Hour Update)

## Comprehensive Fraud Prevention and Verification Framework

## Overview

This addendum defines production-grade anti-spoofing architecture for an instant-payout parametric insurance product.

### Why this is mandatory

- Instant payouts increase fraud incentive.
- Delivery ecosystems are socially connected, so coordinated abuse is realistic.
- GPS-only checks are insufficient and can harm genuine workers through false positives.

## 1. Differentiation Logic: Real vs Spoofed Workers

### 1.1 GPS spoofing detection algorithm

#### Layer 1: Speed validation

```text
if distance(last_ping, current_ping) > max_speed * elapsed_time:
  flag = impossible_speed
  risk += 30
```

Implementation defaults:
- bike max practical speed in city: 60 km/h
- car max practical speed in city: 80 km/h
- default ping interval: 30 seconds

#### Layer 2: Acceleration profile

```text
if abs(delta_velocity / delta_time) > max_plausible_acceleration:
  flag = unrealistic_acceleration
  risk += 20
```

Purpose: detect instant velocity jumps typical of mock location toggling.

#### Layer 3: Signal dropout consistency

```text
if short_dropout and large_resume_gap:
  flag = possible_mock_toggle
  risk += 10
```

Purpose: distinguish natural urban GPS loss from scripted on/off location spoofing.

### 1.2 Sensor fusion: GPS and IMU correlation

```text
motion_imu = sqrt(ax^2 + ay^2 + az^2)
motion_gps = distance_change / time_interval

if motion_gps > movement_threshold and motion_imu < imu_min_threshold:
  flag = gps_motion_without_device_motion
  risk += 30
```

Interpretation: claimed movement with no device movement is high-confidence spoof behavior.

### 1.3 Device fingerprinting and identity stability

Fingerprint inputs:
- device model
- Android ID / secure device ID
- IMEI hash (if policy/permissions allow)
- network hardware signature
- app build and integrity indicators
- rooted/jailbroken/emulator indicators

```text
fingerprint_hash = sha256(model + android_id + imei_hash + app_hash + integrity_flags)

if fingerprint_hash reused across multiple active claimants:
  ring_score += 1
  risk += 15..40 (based on linked account count)
```

## 2. Multi-Source Data Signals

### 2.1 Signal matrix

| Signal family | Example features | Fraud detected |
|---|---|---|
| Sensor | acceleration, heading consistency, GPS drift profile | mock location and impossible movement |
| Network | cell tower mismatch, WiFi geolocation mismatch, risky ASN/VPN | remote spoofing and relay abuse |
| Device | fingerprint collisions, integrity tampering | multi-account farms |
| Behavioral | session foreground time, request cadence, claim timing | scripted/bot claim behavior |
| Cluster | synchronized claims, shared artifact graph | coordinated ring activity |

### 2.2 Network-based verification

```text
distance_error = haversine(gps_location, celltower_location)
if distance_error > tolerance_km:
  flag = network_gps_mismatch
  risk += 15..25
```

WiFi geolocation cross-check is used as secondary corroboration signal.

### 2.3 App-level behavioral checks

```text
if app_backgrounded_during_claimed_disruption_window:
  risk += 20

if api_request_rate > baseline_rate * 3 around claim:
  risk += 25
```

### 2.4 Optional perception evidence (worker-safe)

For medium-risk claims only, optional evidence can boost trust:
- weather photo
- text explanation
- trip proof metadata

## 3. Coordinated Attack Handling

### 3.1 Ring detection by linkage and clustering

- Build account-device-UPI-IP graph.
- Compute connected components and ring scores.
- Detect dense micro-clusters in short windows.

```text
if linked_component_size >= threshold and synchronized_claims == true:
  ring_alert = true
```

### 3.2 Geographic clustering anomaly

```text
if n_claims_within_radius(100m, 5min) >= 5:
  risk += 20
  ring_alert = true
```

### 3.3 Burst detection and progressive containment

```text
if claims_per_minute_in_zone > baseline * 10:
  set_mode = fraud_ring_response
  hold_batch_for_review = true
```

Containment actions:
- soft-hold suspicious payouts
- hard-block repeated high-risk entities
- temporary threshold hardening during active attack window

### 3.4 Rate limiting and payout caps

- per-account: max 3 claims/week
- per-device: max 10 claims/week
- per-UPI: max INR 5000/week

Crossing limits routes claim to manual workflow and can freeze linked entities.

## 4. False Positive UX: Recovery Pathways

### 4.1 Risk tiers and actions

| Tier | Score | Action |
|---|---|---|
| Low | 0-30 | instant payout |
| Medium | 31-70 | conditional payout + quick evidence |
| High | 71-100 | hold payout + manual review |

### 4.2 Worker transparency and dignity controls

Each flagged user gets:
- reason category
- required next step
- appeal deadline
- status timeline in app

### 4.3 Appeal and escalation flow

1. Worker submits evidence or asks support.
2. Auto-verification resolves clear approvals quickly.
3. Human review handles unresolved cases.
4. Final decision returns reason and escalation path.

SLA targets:
- first response: <= 4 hours
- resolution: 24-48 hours
- manager escalation: <= 72 hours

### 4.4 Post-review model feedback

Confirmed false positives are fed into threshold tuning and model calibration to reduce repeated friction for genuine users.

## 5. Risk Scoring Framework

| Category | Max points |
|---|---|
| GPS checks | 30 |
| Sensor fusion | 30 |
| Network mismatch | 25 |
| Behavioral anomalies | 25 |
| Device linkage | 40 |
| Payment linkage | 35 |
| Cluster and burst checks | 40 |

Decision routing uses normalized risk score plus ring-alert overrides.

## 6. Compliance, Audit, and Explainability

- Every deny/hold includes machine + rule reason codes.
- Every decision path is audit-logged for disputes and compliance.
- No single weak signal can permanently ban a worker.
- Human override is available for contested outcomes.

## 7. Phase 2 Enhancements

- Aadhaar/KYC strengthening at onboarding
- advanced account takeover defenses
- fraud operations dashboard and queue tooling
- compliance-grade incident reporting and exports

---

**Created:** March 19, 2026  
**For:** Guidewire DEVTrails 2026 - Phase 1 Submission  
**Team:** GigGuard AI
