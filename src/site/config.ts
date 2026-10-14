export const SITE_ROUTES = {
  home: "index.html",
  menu: "menu.html",
  story: "story.html",
  visit: "visit.html",
} as const;

export type SiteRoute = keyof typeof SITE_ROUTES;

export const EXPERIENCE_ORDER = [
  {
    id: "gelato",
    label: "Premium Gelatos",
    shortLabel: "Gelato",
    menuAnchor: "gelato",
  },
  {
    id: "woodfire",
    label: "Woodfire Pizza",
    shortLabel: "Woodfire",
    menuAnchor: "woodfire",
  },
  {
    id: "brews",
    label: "Brews",
    shortLabel: "Brews",
    menuAnchor: "brews",
  },
  {
    id: "waffles",
    label: "Waffles",
    shortLabel: "Waffles",
    menuAnchor: "waffles",
  },
  {
    id: "savoury",
    label: "Savoury Bites",
    shortLabel: "Savoury",
    menuAnchor: "savoury",
  },
] as const;

export const BRAND = {
  name: "Krushna's Heaven",
  heroHeadline: "Five cravings. One address.",
  primaryAction: "Plan your visit",
  secondaryAction: "Explore the menu",
} as const;

export const PROVISIONAL_BUSINESS_DETAILS = {
  locality: "Wanwadi / Wanowrie, Pune",
  phoneNumbers: ["+91 91566 00883", "+91 91566 00884"],
  email: "krushnasaiicecream@gmail.com",
  hours: "8:00 AM–1:30 AM",
  status: "owner-confirmation-required",
} as const;
