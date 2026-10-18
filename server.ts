import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load env for local development
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const { exercise, reps, correctReps, incorrectReps, formScore, duration, averageAngle, warningCount } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ 
          error: "Gemini API key is not configured.",
          feedback: "Gemini API is unavailable. Focus on maintaining a slow, controlled movement and keeping your joints aligned. Good effort overall!"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Based on this workout, provide:
1. What the user did well
2. Main form problem
3. One improvement suggestion
4. A short motivational message

Workout metrics:
- Exercise: ${exercise}
- Total Reps: ${reps}
- Correct Reps: ${correctReps}
- Incorrect Reps: ${incorrectReps}
- Form Score: ${formScore}/100
- Form Warnings Detected: ${warningCount || 0}
- Duration: ${duration}
- Average key joint angle: ${averageAngle}°

Provide the response in a concise, encouraging tone. Format it as plain text without Markdown asterisks or hashes, using line breaks to separate the 4 points clearly.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ feedback: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate feedback" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
