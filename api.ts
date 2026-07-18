import { supabase } from "../lib/supabaseClient";
import type { Lead, Channel, Profile } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeader()),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data as T;
}

// ----- Chat -----
export function sendChatMessage(messages: { role: string; content: string }[], conversationId?: string) {
  return request<{ reply: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages, conversationId }),
  });
}

// ----- Leads -----
export function fetchLeads() {
  return request<{ leads: Lead[] }>("/api/leads");
}
export function createLead(payload: Partial<Lead>) {
  return request<{ lead: Lead }>("/api/leads", { method: "POST", body: JSON.stringify(payload) });
}
export function updateLead(id: string, payload: Partial<Lead>) {
  return request<{ lead: Lead }>(`/api/leads/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}
export function deleteLead(id: string) {
  return request<void>(`/api/leads/${id}`, { method: "DELETE" });
}

// ----- Templates -----
export function generateOutreachMessage(payload: {
  businessType: string;
  businessName?: string;
  channel: Channel;
  tone?: string;
  extraContext?: string;
  baseTemplate?: string;
  leadId?: string;
}) {
  return request<{ message: string }>("/api/templates/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ----- Profile -----
export function fetchProfile() {
  return request<{ user: { id: string; email: string }; profile: Profile }>("/api/auth/me");
}
export function updateProfile(payload: Partial<Profile>) {
  return request<{ profile: Profile }>("/api/auth/me", { method: "PATCH", body: JSON.stringify(payload) });
}
