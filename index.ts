export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export type LeadStatus = "new" | "contacted" | "replied" | "negotiating" | "client" | "lost";

export type BusinessType =
  | "furniture"
  | "optical"
  | "electronics"
  | "interior-design"
  | "real-estate"
  | "restaurant"
  | "gym"
  | "salon"
  | "school"
  | "hotel";

export type Channel = "whatsapp" | "email" | "instagram" | "facebook" | "linkedin";

export interface Lead {
  id: string;
  business_name: string;
  business_type: BusinessType | null;
  contact: string | null;
  status: LeadStatus;
  notes: string | null;
  follow_up_at: string | null;
  value: number | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  voice_name: string;
  language: "en" | "ne" | "auto";
  theme: "dark" | "light";
  memory_enabled: boolean;
}

export interface OutreachTemplate {
  channel: Channel;
  subject?: string;
  body: string;
}
