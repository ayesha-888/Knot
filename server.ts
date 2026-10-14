import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini client if API key is available
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Endpoint: Generate personalized Campus Window match explanation
app.post('/api/explain-match', async (req, res) => {
  const { eventTitle, eventDuration, minutesAvailable, interests, vibe, studentName, matchingStudents } = req.body;

  // Fallback default explanation
  const studentNames = (matchingStudents || []).map((s: any) => s.name).join(', ') || 'other students';
  const sharedInterests = (interests || []).slice(0, 2).join(' and ') || 'campus activities';
  const fallbackExplanation = `You have ${minutesAvailable} minutes before your next class. ${studentNames} share your passion for ${sharedInterests} and want to attend ${eventTitle}. It easily fits inside your available window without stressing your schedule.`;

  if (!ai) {
    return res.json({ explanation: fallbackExplanation, source: 'deterministic' });
  }

  try {
    const prompt = `You are the matching intelligence behind "Knot", a friendship and event matching platform for CUNY commuter students.
Explain in 2 conversational, warm, and motivating sentences WHY this campus activity is a great fit for the student.

Context:
- Student: ${studentName || 'Maya'}
- Available Campus Window: ${minutesAvailable} minutes until next class
- Event: "${eventTitle}" (${eventDuration} mins)
- Student's Interests: ${(interests || []).join(', ')}
- Today's Social Energy: "${vibe || 'open to meeting people'}"
- Compatible Students Going: ${studentNames}

Requirements:
- Emphasize the exact time fit (${minutesAvailable} min window) so they won't be late to class.
- Highlight common ground with the other students.
- Respect their social energy (${vibe}).
- Keep it natural, friendly, and under 45 words. No hashtags, no quotes, no markdown headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const explanation = response.text?.trim() || fallbackExplanation;
    return res.json({ explanation, source: 'gemini' });
  } catch (error) {
    console.warn('Gemini explanation error, returning fallback:', error);
    return res.json({ explanation: fallbackExplanation, source: 'fallback' });
  }
});

// Endpoint: Generate friendly, non-awkward conversation starters
app.post('/api/conversation-starter', async (req, res) => {
  const { eventTitle, sharedInterests, groupMembers, vibe } = req.body;

  const primaryInterest = (sharedInterests && sharedInterests[0]) || 'this event';
  const fallbackStarters = [
    `"Hey! Are you guys heading over to the ${eventTitle}? Mind if I walk over with you?"`,
    `"Hey everyone! I saw you're also into ${primaryInterest} — have you checked out this meetup before?"`,
    `"Hi! I had about 40 minutes between classes and saw this group — excited to catch a breather and say hi!"`,
  ];

  if (!ai) {
    return res.json({ starter: fallbackStarters[0], source: 'deterministic' });
  }

  try {
    const prompt = `You are Knot's friendly social assistant for CUNY college commuters.
Write ONE natural, respectful, zero-pressure icebreaker for a commuter student joining a small group of 2-3 peers for "${eventTitle}".
Shared interests: ${(sharedInterests || []).join(', ')}.
Social vibe: "${vibe || 'open to meeting people'}".
The starter should feel casual and easy to say in person or text. Wrap the starter in quotation marks. Output ONLY the quotation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const starter = response.text?.trim() || fallbackStarters[0];
    return res.json({ starter, source: 'gemini' });
  } catch (error) {
    console.warn('Gemini conversation starter error, returning fallback:', error);
    return res.json({ starter: fallbackStarters[0], source: 'fallback' });
  }
});

// Setup dev server with Vite or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Knot CUNY Commuter App server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
