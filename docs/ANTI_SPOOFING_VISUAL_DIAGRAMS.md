# GigGuard AI - Anti-Spoofing Architecture Visual Diagrams

## Diagram 1: Multi-Layer Fraud Detection Flow

```text
[Claim Submitted During Disruption]
      |
      v
[Layer 1: GPS Validation]
  - speed check
  - acceleration plausibility
  - dropout consistency
      |
      v
[Layer 2: Sensor Fusion]
  - accelerometer vs GPS motion
  - gyroscope orientation consistency
      |
      v
[Layer 3: Network Verification]
  - cell-tower triangulation
  - WiFi geolocation cross-check
  - IP/ASN consistency
      |
      v
[Layer 4: Behavioral Analysis]
  - session integrity
  - request-rate anomalies
  - historical claim behavior
      |
      v
[Layer 5: Coordinated Fraud Checks]
  - device linkage
  - payment linkage
  - geographic clustering
  - timing burst detection
      |
      v
[Compute Risk Score + Ring Score]
      |
      +--> [0-30 Low]     -> Auto Payout
      +--> [31-70 Medium] -> Conditional Flow + Evidence
      +--> [71-100 High]  -> Hold + Manual Review
```

## Diagram 2: Device Fingerprinting and Ring Detection

```text
[New Account Registration]
      |
      v
[Collect Signals: model, ID, integrity flags, app signature]
      |
      v
[Generate Fingerprint Hash]
      |
      v
[Lookup Across Existing Accounts]
      |
      +--> [Unique fingerprint]        -> normal risk baseline
      +--> [Fingerprint collision]     -> linked-account risk
      +--> [Same UPI across accounts]  -> payment-link risk
      |
      v
[Ring Score by Linked Count]
  - 1-2 accounts: low
  - 3-5 accounts: medium
  - 6+ accounts: high
      |
      v
[Disruption Event Claims]
      |
      v
[Synchronized linked claims?]
      |
      +--> no  -> continue with risk routing
      +--> yes -> hold all linked payouts, freeze if repeated, manual review
```

## Diagram 3: Risk Scoring Model

```text
Initialize risk = 0

GPS checks           : +0 to +30
Sensor fusion        : +0 to +30
Network mismatch     : +0 to +25
Behavior anomalies   : +0 to +25
Device linkage       : +0 to +40
Payment linkage      : +0 to +35
Cluster/timing burst : +0 to +40

normalized_score = clamp(0, 100, weighted_total)

0-30   -> approve
31-70  -> conditional
71-100 -> manual review

Example:
  speed fail                +30
  backgrounded app          +20
  linked device (3 accts)   +25
  linked UPI (2 accts)      +10
  local cluster anomaly     +20
  timing burst              +10
  total                     =115 -> high risk
```

## Diagram 4: Worker Appeal and Recovery Flow

```text
[Claim Flagged as High Risk]
      |
      v
[Notify Worker with Reason + Deadline + Options]
      |
      +--> [Route A: Upload evidence]
      +--> [Route B: GPS log export]
      +--> [Route C: Chat support]
      +--> [Route D: Escalation request]
      |
      v
[Auto Verification Pass?]
      +--> yes -> payout released + trust restored
      +--> no  -> human review (24-48h)
                    |
                    +--> approved -> payout + apology + optional whitelist
                    +--> denied   -> clear reason + manager escalation path
```

## Diagram 5: Rate Limiting and Payout Caps

```text
[Disruption Event]
      |
      v
[Collect Zone Claims]
      |
      +--> per-account check (max 3/week)
      +--> per-device check  (max 10/week)
      +--> per-UPI check     (max INR 5000/week)
      +--> burst check       (>10x baseline)
      |
      v
[Route]
  approve | queue for review | hold/freeze/investigate

Example progression:
  Account A  -> approved (1/3)
  Account B  -> approved (2/3)
  Account C  -> approved (3/3, next claim manual)
  Account D  -> queued (medium risk)
  Account E  -> held (linked-device cap exceeded)
```

## Layered Defense Summary

```text
Incoming Claims
  -> Layer 1 GPS Validation
  -> Layer 2 Sensor Fusion
  -> Layer 3 Network Validation
  -> Layer 4 Behavioral Analysis
  -> Layer 5 Linkage + Cluster Detection
  -> Layer 6 Rate Limiting + Burst Guard
  => Target: strong fraud capture with worker-safe false-positive controls
```

---

**Created:** March 19, 2026  
**For:** Guidewire DEVTrails 2026 - Phase 1 Submission  
**Team:** GigGuard AI
