# RallyCut

AI-powered tennis highlight generation. Export in 4K. Half the price.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Payments:** Stripe
- **Database:** Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)
- Supabase account (for database)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rallycut-web
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp environment.example.txt .env.local
```

4. Fill in your environment variables in `.env.local`:

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Create a product with a $99/year price
4. Copy the Price ID to your environment variables

### Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to the SQL Editor
3. Run the schema from `supabase/schema.sql`
4. Copy your project URL and anon key to environment variables

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Stripe Webhook Setup (Local Development)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
```bash
stripe login
```
3. Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
4. Copy the webhook secret to your `.env.local`

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

For Stripe webhooks in production:
1. Add your production webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
2. Select events: `checkout.session.completed`, `customer.subscription.deleted`
3. Copy the webhook secret to your Vercel environment variables

### Build

```bash
npm run build
```

The static export will be in the `dist` folder.

## Project Structure

```
rallycut-web/
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── checkout/route.ts  # Stripe checkout session
│   │       └── webhook/route.ts   # Stripe webhook handler
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                   # Landing page
│   └── success/
│       └── page.tsx               # Post-checkout success page
├── components/
│   ├── ui/                        # shadcn components
│   ├── faq.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── pricing.tsx
│   └── upload-form.tsx
├── lib/
│   ├── stripe.ts                  # Stripe client
│   ├── supabase.ts                # Supabase clients
│   └── utils.ts
├── supabase/
│   └── schema.sql                 # Database schema
├── environment.example.txt
└── next.config.ts
```

## Features

- 🎾 AI-powered tennis highlight detection
- 📹 4K video export
- 💳 Stripe subscription with 7-day free trial
- 📊 Match statistics dashboard
- 🔐 Secure user authentication
- 📱 Responsive design

## Database Schema

### Users Table
- `id`: UUID primary key
- `email`: User email
- `stripe_customer_id`: Stripe customer reference
- `stripe_subscription_id`: Stripe subscription reference
- `trial_status`: pending | active | cancelled | expired
- `video_count`: Number of videos processed
- `created_at`, `updated_at`: Timestamps

### Videos Table
- `id`: UUID primary key
- `user_id`: Foreign key to users
- `video_name`: Video filename
- `original_url`: Storage URL
- `status`: uploading | processing | ready | failed
- `highlights`: JSON array of highlight timestamps
- `created_at`, `updated_at`: Timestamps

## License

MIT
