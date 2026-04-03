export type PlanTier = "Basic" | "Standard" | "Pro";

export type RegistrationData = {
  name: string;
  contact: string;
  upi: string;
  plan: PlanTier;
};

export type TriggerResponse = {
  trigger: boolean;
  payout: number;
  reason: string;
  rainfall: number;
};

export type TriggerType = "rain" | "aqi" | "heat";

export const PLANS: Record<PlanTier, { premium: number; coverage: number }> = {
  Basic: { premium: 20, coverage: 200 },
  Standard: { premium: 40, coverage: 400 },
  Pro: { premium: 60, coverage: 700 },
};

export const REGISTRATION_STORAGE_KEY = "gigguard-registration";
export const REGISTRATION_SESSION_KEY = "gigguard-registration-session";

export function saveRegistration(data: RegistrationData) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(data));
  sessionStorage.setItem(REGISTRATION_SESSION_KEY, "1");
}

export function loadRegistration(): RegistrationData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(REGISTRATION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as RegistrationData;
  } catch {
    return null;
  }
}

export function hasActiveRegistrationSession(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(REGISTRATION_SESSION_KEY) === "1";
}

export function clearRegistration() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(REGISTRATION_STORAGE_KEY);
  sessionStorage.removeItem(REGISTRATION_SESSION_KEY);
}

export function isRegistrationComplete(data: RegistrationData | null): data is RegistrationData {
  if (!data) {
    return false;
  }

  const hasName = data.name.trim().length > 0;
  const hasContact = data.contact.trim().length > 0;
  const hasUpi = data.upi.trim().includes("@");

  return hasName && hasContact && hasUpi;
}