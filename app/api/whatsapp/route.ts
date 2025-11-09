import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { diamondAdvisor, defaultFallback, ConciergeContext } from '../../../playbooks/diamondAdvisor';

const HUMAN_HANDOFF_THRESHOLD = 25000;

export async function POST(request: Request) {
  try {
    const textBody = await request.text();
    const params = new URLSearchParams(textBody);
    const incomingMessage = (params.get('Body') || '').trim();
    const profileName = params.get('ProfileName') || params.get('From') || undefined;
    const waId = params.get('WaId') || params.get('From') || undefined;

    const context: ConciergeContext = {
      customerName: profileName,
      message: incomingMessage
    };

    const reply = resolveReply(context);

    const twiml = new MessagingResponse();
    twiml.message(reply);

    const escalate = await maybeEscalate(context, reply, waId);

    if (!escalate.ok) {
      console.error('CRM webhook error', escalate.error);
    }

    return new Response(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' }
    });
  } catch (error) {
    console.error('Failed to process WhatsApp webhook', error);
    const twiml = new MessagingResponse();
    twiml.message(
      "I'm experiencing a brief outage but our gem stylists are on hand. A human will follow up shortly."
    );

    return new Response(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' },
      status: 200
    });
  }
}

function resolveReply(context: ConciergeContext) {
  if (!context.message) {
    return 'Hello! I am LuxeGems, here to guide you through diamonds, settings, and concierge services.';
  }

  const match = diamondAdvisor.find((rule) => rule.match.test(context.message));

  if (match) {
    return match.response(context);
  }

  return defaultFallback(context);
}

async function maybeEscalate(context: ConciergeContext, reply: string, waId?: string | null) {
  const webhook = process.env.CRM_WEBHOOK_URL;

  if (!webhook) {
    return { ok: true };
  }

  const needsHuman = shouldEscalate(context, reply);

  if (!needsHuman) {
    return { ok: true };
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: 'whatsapp',
        customerHandle: waId,
        message: context.message,
        response: reply,
        labels: ['needs-human', 'whatsapp', 'diamond'],
        metadata: {
          budgetMentioned: extractBudget(context.message)
        }
      })
    });

    return { ok: res.ok };
  } catch (error) {
    return { ok: false, error };
  }
}

function shouldEscalate(context: ConciergeContext, reply: string) {
  const message = context.message.toLowerCase();

  if (message.includes('agent') || message.includes('human') || message.includes('call me')) {
    return true;
  }

  const budget = extractBudget(context.message);

  if (typeof budget === 'number' && budget >= HUMAN_HANDOFF_THRESHOLD) {
    return true;
  }

  if (reply.toLowerCase().includes('senior stylist')) {
    return true;
  }

  return false;
}

function extractBudget(message: string) {
  const budgetMatch = message.match(/\$?([0-9]{2,3}(?:,[0-9]{3})?|[0-9]{4,6})/);

  if (!budgetMatch) {
    return undefined;
  }

  const raw = budgetMatch[1].replace(/,/g, '');
  const value = Number.parseInt(raw, 10);

  return Number.isNaN(value) ? undefined : value;
}
