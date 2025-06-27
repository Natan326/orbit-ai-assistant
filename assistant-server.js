const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/assistant', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Missing message' });

  try {
    const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'אתה עוזר באפליקציית ניהול. ענה תמיד במבנה JSON עם intent ונתונים. דוגמה: {"intent":"getEmployeeCount"}' },
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const gptReply = openaiRes.data.choices[0].message.content;
    const parsed = JSON.parse(gptReply);

    if (parsed.intent === 'getEmployeeCount') {
      // דוגמה לתשובה מדומה
      return res.json({ reply: 'יש לך 27 עובדים רשומים.' });
    }

    return res.json({ reply: 'לא הבנתי את הבקשה, נסה שוב.' });
  } catch (error) {
    console.error('Assistant Error:', error.message);
    return res.status(500).json({ reply: 'שגיאה בשרת, נסה שוב מאוחר יותר.' });
  }
});

app.listen(port, () => {
  console.log(`AI Assistant server running at http://localhost:${port}`);
});