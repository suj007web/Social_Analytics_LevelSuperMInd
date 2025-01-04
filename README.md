# Social Analytics Dashboard

Live Link: [assignment.ishaanminocha.in](https://assignment.ishaanminocha.in)
Demo Video: [bit.ly/levelsuperminddemovideo](https://bit.ly/levelsuperminddemovideo)

### Assignment Objective:

Build a basic analytics module using Langflow and DataStax to analyze engagement data from mock social media accounts.

## Features

- Interactive Analysis:
  - Users can input various parameters and a question to retrieve tailored engagement metrics.
- Data-Driven Insights:
  - GPT-powered insights enable better decision-making for social media strategies.
- Efficient Database Operations:

  - DataStax Astra DB ensures fast and reliable querying.

- Langflow is used to generate the insights.

## Tech Stack

- Frontend:

  - React.js
  - Framer Motion
  - Tailwind CSS

- Backend:

  - Node.js/Express

- Tools Used:

  - Langflow
  - DataStax/Astra DB
  - OpenAI API

## Getting Started

1. Clone the repository
2. Install dependencies in both client and server:
   ```bash
   npm install
   ```
3. Set up environment variables in both client and server:

client/.env

```env
VITE_BACKEND_URL=
```

server/.env

```env
LANGFLOW_BASE_URL=
LANGFLOW_ENDPOINT=
```

4. Start the development server from root directory:
   ```bash
   npm run dev
   ```
