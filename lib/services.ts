export const capabilities = [
  {
    "slug": "creative",
    "label": "Ad creative",
    "navLabel": "Video & ad creative",
    "verb": "Give people a reason to notice you.",
    "short": "Get noticed.",
    "benefit": "Show what you offer and why it matters with video ads, promotional videos, and social content. Make it easier for someone to recognize that your business has something they need.",
    "detail": "Video ads, promotional videos, and social content that explain your offer.",
    "cta": "Explore video & ad creative",
    "inquiry": "Video & ad creative"
  },
  {
    "slug": "websites",
    "label": "Website",
    "navLabel": "Websites & landing pages",
    "verb": "Help visitors decide to contact you.",
    "short": "Turn visits into inquiries.",
    "benefit": "Give people clear answers, relevant examples, and an easy way to request a quote or book a conversation. Capture the information your team needs to respond.",
    "detail": "Websites and landing pages with useful inquiry forms and connected customer information.",
    "cta": "Explore websites",
    "inquiry": "Websites & landing pages"
  },
  {
    "slug": "crm",
    "label": "Customer management",
    "navLabel": "CRM & customer management",
    "verb": "Keep track of every opportunity.",
    "short": "Know who needs what.",
    "benefit": "Bring customer details, conversations, quotes, and next steps into a CRM: a system your team uses to manage customers and sales. See who needs attention and who is responsible.",
    "detail": "Existing CRM setup or a custom system to organize customers, conversations, and sales.",
    "cta": "Explore CRM setups",
    "inquiry": "Sales tools & integrations"
  },
  {
    "slug": "follow-up",
    "label": "Follow-up",
    "navLabel": "Follow-up",
    "verb": "Stay in touch after the first inquiry.",
    "short": "Keep conversations moving.",
    "benefit": "Use email, text, reminders, and AI-assisted replies to help your team respond and follow through. Agree on what happens automatically and when a person takes over.",
    "detail": "Email and text sequences, reminders, and AI-assisted replies for your team.",
    "cta": "Explore follow-up",
    "inquiry": "Funnels & follow-up"
  },
  {
    "slug": "connected-system",
    "label": "Sale",
    "navLabel": "The connected system",
    "verb": "Give your team what they need to close.",
    "short": "Support the sale.",
    "benefit": "By the time a customer is ready to decide, your team should know what they need, what has been discussed, and what happens next. The connected system supports that conversation.",
    "detail": "Creative, website, customer management, and follow-up planned to work together.",
    "cta": "Explore the connected system",
    "inquiry": "Connected system"
  }
] as const;
export type ServiceSlug = typeof capabilities[number]['slug'];
export const serviceHref = (slug:string) => `/services/${slug}`;
export const inquiryHref = (slug:string) => `/?service=${slug}#contact`;
