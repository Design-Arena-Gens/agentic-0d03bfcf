import Link from 'next/link';

const playbook = [
  {
    title: 'Intent recognition',
    points: [
      'Classifies greetings, diamond discovery, pricing, financing, appointment booking, post-purchase care, and escalation.',
      'Keyword fallback ensures polite responses even for unsupported topics.'
    ]
  },
  {
    title: 'Product storytelling',
    points: [
      'Highlights brilliance, certification, and craftsmanship with upsell hooks.',
      'Offers curated recommendations with CTA links to PDPs or consultation booking.'
    ]
  },
  {
    title: 'White-glove service',
    points: [
      'Schedules virtual or in-boutique appointments and handles reminders.',
      'Captures payment preferences and syncs with CRM for follow-up tasks.'
    ]
  }
];

export function AgentPlaybook() {
  return (
    <div id="playbook" className="card" style={{ padding: '2rem' }}>
      <h3 className="section-title">Conversational playbook</h3>
      <p className="section-description">
        Update <code>playbooks/diamondAdvisor.ts</code> with collection releases, pricing tiers, or bespoke offers. The API route consumes the playbook at runtime.
      </p>
      <div className="grid" style={{ gap: '1.5rem' }}>
        {playbook.map((item) => (
          <div key={item.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--muted)' }}>
              {item.points.map((point) => (
                <li key={point} style={{ marginBottom: '0.4rem' }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: '2rem' }}>
        <span role="img" aria-hidden style={{ fontSize: '1.4rem' }}>
          📄
        </span>
        <div>
          <strong>Developer docs:</strong>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Detailed instructions live in <Link href="/docs">/docs</Link> with webhook payload samples and CRM integration tips.
          </p>
        </div>
      </div>
    </div>
  );
}
