'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const customerPrompts = [
  'Do you have any lab-grown diamonds?',
  'What financing options can I use?',
  'Can I book a virtual consultation this weekend?',
  'How long does resizing usually take?'
];

const agentReplies: Record<string, string> = {
  'Do you have any lab-grown diamonds?':
    'Absolutely. Our Nova Aurora lab-grown collection offers GIA-certified stones from 1.0ct to 4.5ct. Would you like me to share our best-sellers or curate options within your budget?',
  'What financing options can I use?':
    'You can split your purchase with 0% APR over 12 months with Sezzle or 24 months with Klarna. Orders above $3,000 also qualify for concierge financing. Should I send you a pre-approval link?',
  'Can I book a virtual consultation this weekend?':
    'Yes! I have a gem expert available Saturday at 11:00 AM EST or Sunday at 1:30 PM EST. Which slot works best? I can also share a calendar link if you prefer another time.',
  'How long does resizing usually take?':
    'Complimentary resizing takes 4-6 business days, including insured shipping. If you need it sooner, we offer a 48-hour express service for $95. Would you like me to schedule that?' 
};

const avatarUrls = {
  customer: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=80&h=80&q=80',
  agent: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=80&h=80&q=80'
};

export function ChatPreview() {
  const [index, setIndex] = useState(0);

  const prompt = useMemo(() => customerPrompts[index], [index]);
  const reply = useMemo(() => agentReplies[prompt], [prompt]);

  return (
    <div className="card" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
      <span className="badge" style={{ marginBottom: '1.5rem' }}>
        Live WhatsApp Preview
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <Bubble
          role="customer"
          name="Alexandra"
          message={prompt}
          timestamp="10:27"
        />
        <Bubble
          role="agent"
          name="LuxeGems Concierge"
          message={reply}
          timestamp="10:28"
        />
        <button
          onClick={() => setIndex((prev) => (prev + 1) % customerPrompts.length)}
          style={{ alignSelf: 'flex-start' }}
        >
          Show another scenario
        </button>
      </div>
    </div>
  );
}

function Bubble({
  role,
  name,
  message,
  timestamp
}: {
  role: 'customer' | 'agent';
  name: string;
  message: string;
  timestamp: string;
}) {
  const isAgent = role === 'agent';

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        flexDirection: isAgent ? 'row' : 'row-reverse'
      }}
    >
      <Image
        src={isAgent ? avatarUrls.agent : avatarUrls.customer}
        alt={name}
        width={48}
        height={48}
        style={{ borderRadius: '999px', objectFit: 'cover' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxWidth: '70%' }}>
        <div
          style={{
            alignSelf: isAgent ? 'flex-start' : 'flex-end',
            background: isAgent ? 'var(--accent)' : '#e6e6e6',
            color: isAgent ? '#101010' : '#101010',
            padding: '0.85rem 1rem',
            borderRadius: isAgent ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            fontSize: '0.95rem',
            lineHeight: 1.45
          }}
        >
          {message}
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', alignSelf: isAgent ? 'flex-start' : 'flex-end' }}>
          {name} · {timestamp}
        </span>
      </div>
    </div>
  );
}
