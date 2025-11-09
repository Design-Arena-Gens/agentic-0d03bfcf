import { NextResponse } from 'next/server';
import twilio from 'twilio';

type BroadcastBody = {
  to?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body: BroadcastBody = await request.json();
    const to = body.to;
    const message = body.message;

    if (!to || !message) {
      return NextResponse.json({ error: 'Missing `to` or `message` in body.' }, { status: 400 });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { error: 'Server missing Twilio credentials. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER.' },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    const formattedFrom = fromNumber.startsWith('whatsapp:') ? fromNumber : `whatsapp:${fromNumber}`;

    const result = await client.messages.create({
      from: formattedFrom,
      to: formattedTo,
      body: message
    });

    return NextResponse.json({ sid: result.sid, status: result.status, to: result.to });
  } catch (error) {
    console.error('Broadcast failed', error);
    return NextResponse.json({ error: 'Failed to dispatch broadcast.' }, { status: 500 });
  }
}
