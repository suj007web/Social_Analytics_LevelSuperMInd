import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const langflowBaseUrl = process.env.LANGFLOW_BASE_URL;
const langflowEndpoint = process.env.LANGFLOW_ENDPOINT;

app.post('/api/analyze', async (req, res) => {
  const { message, platform, postType, targetAudience } = req.body;
  const token = process.env.ASTRA_TOKEN;
  try {
    const response = await axios.post(
      `${langflowBaseUrl}/${langflowEndpoint}`,
      {
        input_value: `
        You are a social media analyst. Analyze the given dataset of social media posts, which includes metrics such as engagement, likes, comments, shares, impressions, and platform type.

        Based on this data, provide insights under the following headings with up to two points each, including percentages and comparisons to highlight better-performing elements ( (I have given what to include in each)):

        1. Insightful Analysis (this should be based on Users input). inputs are : Target Audience: ${targetAudience} Post Type: ${postType} Platform: ${platform}
        2. Recommended Actions (give some practical Steps Based on Insights for user to improve engagement).

        Finally, answer the user's question in a concise, human-readable format within 50 words:
        Question: ${message}
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

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});