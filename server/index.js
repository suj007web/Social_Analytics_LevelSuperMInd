import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({
  path:"./.env"
});

const app = express();
const PORT = process.env.PORT || 3001;
console.log('PORT:', process.env.PORT);
console.log('ASTRA_TOKEN:', process.env.ASTRA_TOKEN);
app.use(cors());
app.use(express.json());

const LANGFLOW_BASE_URL = 'https://api.langflow.astra.datastax.com';

app.post('/api/analyze', async (req, res) => {
  console.log("hi")
  const { message, platform, postType, targetAudience} = req.body;
  const token = process.env.ASTRA_TOKEN;
  try {
    const response = await axios.post(
      `${LANGFLOW_BASE_URL}/lf/c3bd2701-3d93-473a-8e46-844b7dac03a2/api/v1/run/ddae7380-a6b7-48ed-beb8-fccc3bef1700`,
      {
        input_value: `
        You are a social media analyst. Analyze the given dataset of social media posts, which includes metrics such as engagement, likes, comments, shares, impressions, and platform type.


Based on this data, provide insights under the following headings with up to two points each, including percentages and comparisons to highlight better-performing elements ( (I have given what to include in each)):

1. Insightful Analysis (this should be based on User’s input). inputs are : ${targetAudience} ${postType} ${platform}

. Recommended Actions (give some practical Steps Based on Insights for user to improve engagement).
Finally, answer the user's question in a concise, human-readable format within 50 words:
      ${message}}
        `,
        output_type: 'chat',
        tweaks: {
          "ChatInput-FPWXb": {},
          "TextInput-jeMwJ": {},
          "Prompt-5GUiC": {},
          "OpenAIModel-0DMgc": {},
          "ChatOutput-JIu5G": {},
          "AstraDB-gq0Ix": {},
          "File-3szBO": {},
          "OpenAIEmbeddings-vqlQz": {},
          "ParseData-IbiSi": {}
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to analyze message',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});