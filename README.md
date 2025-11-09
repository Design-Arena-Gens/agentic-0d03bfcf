# LuxeGems WhatsApp Concierge

Production-ready Next.js deployment of a WhatsApp chat assistant tailored for luxury diamond jewelry retailers.

## Stack
- Next.js 14 (App Router)
- React 18
- Twilio WhatsApp API webhook + broadcast endpoint
- TypeScript

## Local Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the product overview and implementation docs.

## WhatsApp Webhook
1. In the Twilio Console, enable the WhatsApp Sandbox (or connect your approved WhatsApp Business number).
2. Set the incoming message webhook to:
   ```text
   https://agentic-0d03bfcf.vercel.app/api/whatsapp
   ```
3. Conversations are handled via deterministic playbooks defined in `playbooks/diamondAdvisor.ts`.

## Proactive Broadcasts
`POST /api/whatsapp/broadcast`
```json
{
  "to": "+14155550123",
  "message": "✨ New Aurelia halo rings just dropped. Reply YES for a private viewing."
}
```
Environment variables required:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_NUMBER`

## CRM Escalations
Set `CRM_WEBHOOK_URL` to receive JSON payloads for high-touch leads. Escalations trigger when:
- Budget mentions exceed $25k
- Guests ask for a human stylist
- Responses recommend a senior stylist

## Deployment
```bash
npm run build
npm start
```
Deploy to Vercel per instructions:
```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-0d03bfcf
```

## Project Layout
```
app/
  page.tsx                 → marketing + feature overview
  docs/page.tsx            → implementation guide
  api/whatsapp/route.ts    → Twilio webhook handler
  api/whatsapp/broadcast   → proactive broadcast endpoint
playbooks/diamondAdvisor.ts → conversational responses
```
