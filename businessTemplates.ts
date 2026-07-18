import type { BusinessType, Channel, OutreachTemplate } from "../types";

export const BUSINESS_TYPES: { id: BusinessType; label: string; icon: string }[] = [
  { id: "furniture", label: "Furniture Shop", icon: "🛋️" },
  { id: "optical", label: "Optical Shop", icon: "👓" },
  { id: "electronics", label: "Electronics Shop", icon: "🔌" },
  { id: "interior-design", label: "Interior Designer", icon: "🎨" },
  { id: "real-estate", label: "Real Estate Agency", icon: "🏠" },
  { id: "restaurant", label: "Restaurant", icon: "🍽️" },
  { id: "gym", label: "Gym", icon: "🏋️" },
  { id: "salon", label: "Salon", icon: "💇" },
  { id: "school", label: "School", icon: "🏫" },
  { id: "hotel", label: "Hotel", icon: "🏨" },
];

export const CHANNELS: { id: Channel; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
  { id: "instagram", label: "Instagram DM" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
];

const PAIN_POINT: Record<BusinessType, string> = {
  furniture: "showcase your catalog online so customers can browse pieces before visiting",
  optical: "let customers book eye tests and browse frames online",
  electronics: "list live stock and prices so people stop calling just to ask availability",
  "interior-design": "showcase a project gallery that actually does your work justice",
  "real-estate": "list properties with photos, filters, and instant inquiry forms",
  restaurant: "show your menu, take reservations, and get found on Google",
  gym: "let people see class schedules and sign up for memberships online",
  salon: "let clients book appointments without calling",
  school: "give parents a clean way to find admission info and contact you",
  hotel: "let guests check availability and book directly, without commission fees",
};

/** Base copy — sent to the backend as a starting structure, then personalized per-lead by the AI. */
export function getBaseTemplate(type: BusinessType, channel: Channel): OutreachTemplate {
  const pain = PAIN_POINT[type];
  const businessLabel = BUSINESS_TYPES.find((b) => b.id === type)?.label ?? "business";

  switch (channel) {
    case "whatsapp":
    case "instagram":
    case "facebook":
      return {
        channel,
        body: `Hi! I'm Sahil, a freelance web developer. I noticed [Business Name] doesn't have a website yet — I build fast, mobile-friendly sites that could help you ${pain}. I'd love to send over a quick free mockup if you're open to it. No pressure either way!`,
      };
    case "linkedin":
      return {
        channel,
        body: `Hi [Name], I'm Sahil, a freelance web developer working with local businesses like yours. I'd love to help [Business Name] ${pain} with a modern website. Open to a quick chat this week?`,
      };
    case "email":
      return {
        channel,
        subject: `A website idea for ${businessLabel.toLowerCase()} like [Business Name]`,
        body: `Hi [Name],\n\nI'm Sahil, a freelance web developer. I came across [Business Name] and thought a modern website could really help you ${pain}.\n\nI'd be happy to put together a free mockup so you can see exactly what it'd look like — no obligation.\n\nWould you be open to a quick chat this week?\n\nBest,\nSahil Sarki\nWeb Developer`,
      };
  }
}
