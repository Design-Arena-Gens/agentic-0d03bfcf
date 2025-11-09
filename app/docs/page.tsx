import Link from 'next/link';

export default function Docs() {
  return (
    <main style={{ padding: '4rem 1.5rem' }}>
      <article
        className="card"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <header style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/">← Back to overview</Link>
          <h1 style={{ margin: 0 }}>Implementation guide</h1>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Launch the LuxeGems WhatsApp concierge with Twilio. Customize the playbook, sync to your CRM, and route high-value leads to stylists instantly.
          </p>
        </header>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Webhook contract</h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Twilio sends <code>application/x-www-form-urlencoded</code> payloads with <code>Body</code>, <code>From</code>, and optional <code>WaId</code>. The concierge responds with TwiML. Example request:
          </p>
          <pre>
{`Body=I%20need%20a%201.5ct%20oval%20diamond&WaId=14155550123&ProfileName=Alexandra`}
          </pre>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Responses are sourced from <code>playbooks/diamondAdvisor.ts</code>. Update collections, pricing tiers, and consultation slots there.
          </p>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Proactive messaging</h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Use a server-side call to <code>POST /api/whatsapp/broadcast</code> when you want to send a new drop or appointment reminder. Payload:
          </p>
          <pre>
{`POST /api/whatsapp/broadcast
Content-Type: application/json

{
  "to": "+14155550123",
  "message": "✨ New Aurelia halo rings just dropped. Want a private viewing? Reply YES."
}`}
          </pre>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Escalation routing</h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            The concierge labels a conversation <strong>needs-human</strong> when budget exceeds $25k, when the user explicitly requests a stylist, or when sentiment is uncertain. The webhook returns a structured JSON payload to your CRM webhook (configure via environment variable <code>CRM_WEBHOOK_URL</code>).
          </p>
        </section>
      </article>
    </main>
  );
}
