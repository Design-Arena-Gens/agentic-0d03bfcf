import type { ReactNode } from 'react';

export function IntegrationSteps() {
  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 className="section-title">Twilio WhatsApp Integration</h3>
      <p className="section-description">
        Connect the concierge to your WhatsApp Business number. The webhook uses deterministic replies focused on diamond discovery, consultations, and conversions.
      </p>
      <div className="grid" style={{ gap: '1.25rem' }}>
        <Step
          index={1}
          title="Activate WhatsApp in Twilio"
          description={
            <>
              Join the <strong>Twilio WhatsApp Sandbox</strong> or connect your approved WhatsApp Business number. Copy the inbound webhook URL:{' '}
              <code>https://agentic-0d03bfcf.vercel.app/api/whatsapp</code>.
            </>
          }
        />
        <Step
          index={2}
          title="Configure Environment Secrets"
          description={
            <>
              Add <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, and (optionally) <code>TWILIO_WHATSAPP_NUMBER</code> to Vercel Project Settings → Environment Variables if you plan to send proactive messages.
            </>
          }
        />
        <Step
          index={3}
          title="Optional proactive outreach"
          description={
            <>
              Use the <code>/api/whatsapp/broadcast</code> endpoint with a POST request containing <code>to</code> and <code>message</code> to send catalog drops or appointment reminders. Twilio handles compliance rate limits automatically.
            </>
          }
        />
        <Step
          index={4}
          title="Monitor & iterate"
          description={
            <>
              Track conversation transcripts via Twilio Console. Tune the <code>playbooks/diamondAdvisor.ts</code> file to update offers, availability, and upsell logic without redeploying core APIs.
            </>
          }
        />
      </div>
    </div>
  );
}

function Step({
  index,
  title,
  description
}: {
  index: number;
  title: string;
  description: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '999px',
          background: 'var(--accent)',
          color: '#101010',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700
        }}
      >
        {index}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <p style={{ margin: 0, color: 'var(--muted)' }}>{description}</p>
      </div>
    </div>
  );
}
