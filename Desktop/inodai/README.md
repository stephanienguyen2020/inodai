# Inodai Disaster Resilience Platform

Welcome to the official repository for the Inodai Disaster Resilience Platform. Inodai is designed to enhance disaster preparedness and response through advanced AI technologies. Our platform offers predictive alerts, accessible disaster preparation information, mitigation strategies, and streamlined coordination to help communities, especially the underprivileged, better handle natural disasters.

## Features

- **Predictive Alerts:** Leverage real-time data to provide early warnings about potential disasters.
- **Disaster Preparation:** Access comprehensive guidelines and tips for disaster readiness.
- **Mitigation Strategies:** Implement effective strategies to reduce potential damage and ensure safety.
- **Resource Mapping:** Utilize dynamic maps to locate evacuation sites and essential resources like food and shelters.
- **AI Chatbot:** Get instant advice on disaster response through our AI-powered chatbot.


## Creating a KV Database Instance

Update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).
