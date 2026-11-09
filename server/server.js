const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_CONTEXT = "You are Nitin Vedanand's portfolio AI assistant. Answer recruiter questions professionally based on his profile: M.E.M. student at NC State (3.9 GPA), former Software Engineer at Amdocs (+25% velocity), and holder of the CSPO certification. Keep answers concise, helpful, and focused on product management, AI builds, and leadership.";
app.get('/', (req, res) => {
  res.json({ status: "Nitin's Portfolio AI Backend is live and running!" });
});
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key not configured on server." });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: SYSTEM_CONTEXT + "\n\nUser Question: " + message }] }
        ]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that right now.";
    
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));