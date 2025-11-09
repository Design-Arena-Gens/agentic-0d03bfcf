import { FeatureHighlights } from './components/FeatureHighlights';
import { ChatPreview } from './components/ChatPreview';
import { IntegrationSteps } from './components/IntegrationSteps';
import { AgentPlaybook } from './components/AgentPlaybook';

export default function Home() {
  return (
    <main className="gradient" style={{ padding: '4rem 1.5rem' }}>
      <section
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        <Hero />
        <div className="grid" style={{ gap: '2rem' }}>
          <ChatPreview />
          <FeatureHighlights />
        </div>
        <IntegrationSteps />
        <AgentPlaybook />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <div className="card" style={{ padding: '3rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '320px', height: '320px', background: 'rgba(212,175,55,0.2)', filter: 'blur(140px)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        <span className="badge">WhatsApp Concierge for Diamond Retailers</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', margin: 0 }}>
          Meet LuxeGems — your always-on WhatsApp sales stylist
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', maxWidth: '620px', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Capture high-intent shoppers the moment they message. LuxeGems qualifies needs, curates certified diamonds, schedules consultations, and keeps clients delighted long after the proposal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="https://www.twilio.com/whatsapp" target="_blank" rel="noreferrer">
            <button>Connect to Twilio WhatsApp</button>
          </a>
          <a href="#playbook" style={{ alignSelf: 'center', color: 'var(--muted)' }}>
            See conversation playbook →
          </a>
        </div>
        <div className="callout" style={{ marginTop: '1rem' }}>
          <span role="img" aria-hidden style={{ fontSize: '1.4rem' }}>
            💎
          </span>
          <div>
            <strong>Tailored for luxury retail pipelines.</strong>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              Instantly responds 24/7, nurtures leads, and hands off to live stylists when human warmth matters most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
