const features = [
  {
    title: 'Guided Diamond Discovery',
    description:
      'Surface hand-picked solitaires by budget, carat, cut, and certification. Upsell matching wedding bands or halo settings using conversational cues.'
  },
  {
    title: 'Concierge Availability Layer',
    description:
      'Offer virtual or in-store consultations synced with your CRM calendar. Auto-capture preferred times and email confirmations.'
  },
  {
    title: 'After-Sale Nurture',
    description:
      'Automated follow-ups for resizing, anniversary upgrades, and complimentary cleaning scheduling to drive lifetime value.'
  }
];

export function FeatureHighlights() {
  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 className="section-title">Luxury-grade capabilities</h3>
      <p className="section-description">Each interaction feels bespoke while maintaining instant response times.</p>
      <div className="grid grid-2">
        {features.map((feature) => (
          <div key={feature.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ margin: 0 }}>{feature.title}</h4>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
