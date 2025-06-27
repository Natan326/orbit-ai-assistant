const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/assistant', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('🔴 OpenAI error:', error.response?.status, error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.json({ reply: 'יותר מדי בקשות. נסה שוב מאוחר יותר.' });
    }

    res.status(500).json({ reply: 'שגיאה בשרת. נסה שוב מאוחר יותר.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ AI Assistant server running at http://localhost:${PORT}`);
});
