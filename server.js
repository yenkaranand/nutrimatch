const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent({ prompt });
        res.json({ text: result.response.text() });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
