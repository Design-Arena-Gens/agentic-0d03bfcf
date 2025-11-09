export type AgentReply = {
  match: RegExp;
  response: (context: ConciergeContext) => string;
};

export type ConciergeContext = {
  customerName?: string | null;
  message: string;
};

const currencyFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const productShowcase = [
  {
    name: 'Celestia 1.5ct Oval',
    price: 11850,
    highlights: 'GIA Excellent · Color F · VS1 clarity · Hidden halo'
  },
  {
    name: 'Aurelia 2.1ct Round',
    price: 19800,
    highlights: 'AGS Ideal · Color G · VS2 clarity · Platinum pave setting'
  },
  {
    name: 'Nova Aurora Lab-Grown 3.0ct',
    price: 8650,
    highlights: 'IGI Certified · Color E · VVS2 clarity · Sustainably grown'
  }
];

export const diamondAdvisor: AgentReply[] = [
  {
    match: /^(hi|hello|hey|good\s(morning|evening)|hola|bonjour|hallo)\b/i,
    response: ({ customerName }) =>
      `Hello${customerName ? ` ${customerName}` : ''}! I'm LuxeGems, your diamond concierge. Tell me about the proposal vision or your dream setting and I'll curate brilliant options straight away.`
  },
  {
    match: /(lab[-\s]?grown|sustainable|eco)/i,
    response: () =>
      `Our Nova Aurora lab-grown diamonds range from 1ct to 5ct, all IGI certified with excellent brilliance. They are up to 40% lighter on price while still delivering fire and scintillation. What carat or shape are you leaning toward?`
  },
  {
    match: /(budget|price|cost|how\s*much)/i,
    response: () =>
      'Share your ideal budget and I will pull certified diamonds within 5% of that range. For quick reference, curated favorites include:\n' +
      productShowcase
        .map((item) => `• ${item.name} — ${currencyFormatter.format(item.price)} (${item.highlights})`)
        .join('\n') +
      '\nWant me to send videos or a 360° view?'
  },
  {
    match: /(financing|payment|split|installment|klarna|affirm|sezzle)/i,
    response: () =>
      `We offer flexible plans: 0% APR for 12 months via Sezzle for orders under $8,000, 24-month Klarna plans, and concierge financing for purchases above $15,000. Prefer to pay securely today? I can send a hosted checkout link.`
  },
  {
    match: /(appointment|consult|book|schedule|virtual|in[-\s]?store)/i,
    response: () =>
      `I can reserve a private consultation with one of our gem stylists. Virtual slots available this weekend: Saturday 11:00 AM EST, Sunday 1:30 PM EST. In-boutique appointments at our Fifth Avenue salon open at 3:15 PM or 5:00 PM tomorrow. Which experience do you prefer?`
  },
  {
    match: /(custom|bespoke|design|sketch)/i,
    response: () =>
      `Custom design is our specialty. We typically deliver concept sketches within 48 hours and finished rings in 3-4 weeks. Share any inspiration photos or describe the halo/setting you imagine and I will loop in our atelier.`
  },
  {
    match: /(shipping|delivery|insurance|resize|resizing|exchange|return)/i,
    response: () =>
      `Every order includes overnight insured shipping, complimentary resizing within 60 days, and lifetime cleaning. Need a surprise proposal timeline? Let me know and I will align logistics.`
  },
  {
    match: /(yes|sure|sounds good|book it|confirm|let'?s do it)/i,
    response: () =>
      `Perfect — I just need the best email to send confirmation details and secure checkout. Share it here and everything will be in your inbox within minutes.`
  },
  {
    match: /(human|specialist|representative|someone|call me|speak to)/i,
    response: () =>
      `I'll bring in a senior stylist right away. Could you share the best time and contact number? I'll make sure they reach out within the hour.`
  }
];

export function defaultFallback(context: ConciergeContext) {
  return (
    "I'm here to help with diamonds, settings, financing, or concierge services." +
    " Tell me the carat, cut, or timeline you have in mind and I'll curate options instantly."
  );
}
