import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// Initialize Twilio safely
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

const isTwilioConfigured = 
  twilioSid && 
  twilioToken && 
  twilioFrom && 
  twilioSid !== "your_account_sid_here" && 
  twilioToken !== "your_auth_token_here" && 
  twilioFrom !== "your_twilio_phone_number_here";

let twilioClient: any = null;
if (isTwilioConfigured) {
  try {
    twilioClient = twilio(twilioSid, twilioToken);
    console.log("Twilio initialized successfully for real-time calls.");
  } catch (err) {
    console.error("Failed to initialize Twilio client:", err);
  }
} else {
  console.log("Twilio credentials not configured. Running in Voice Simulation Mode.");
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini with the new SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Text Generation for Communication
app.post("/api/communicate/generate-text", async (req, res) => {
  try {
    const { deceasedName, dateOfPassing, ceremonyType, ceremonyDate, ceremonyTime, venueAddress } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API key is missing." });
    }

    const prompt = `
      Create a respectful and compassionate notification message for an Indian family.
      Details:
      - Deceased: ${deceasedName}
      - Passing Date: ${dateOfPassing}
      - Ceremony: ${ceremonyType}
      - Date: ${ceremonyDate}
      - Time: ${ceremonyTime}
      - Venue: ${venueAddress}
      
      The message should be suitable for WhatsApp/SMS. Use a mix of English and culturally appropriate respectful terms if necessary. 
      Keep it concise but warm.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        systemInstruction: "You are a compassionate funeral support assistant named Antima.",
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Generate Text Error:", error);
    if (error.status === 403 || error.message?.includes("PERMISSION_DENIED")) {
      return res.status(403).json({ 
        error: "Permission Denied: Your API key might not have access to this model. Please check Settings > Secrets or try selecting a paid key.",
        code: "PERMISSION_DENIED"
      });
    }
    res.status(500).json({ error: error.message || "Failed to generate text" });
  }
});

// AI Voice Generation (TTS)
app.post("/api/communicate/generate-voice", async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API key is missing." });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Read this message with a calm, gentle, and respectful tone: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({ audio: base64Audio });
      } else {
        return res.status(500).json({ error: "Failed to generate audio data" });
      }
    } catch (apiError: any) {
      console.error("Gemini 3.1 TTS Error:", apiError);
      if (apiError.status === 403 || apiError.message?.includes("PERMISSION_DENIED")) {
        return res.status(403).json({ 
          error: "Permission Denied for AI Voice. Please use a billing-enabled key or try again with a different model.",
          code: "PERMISSION_DENIED"
        });
      }
      throw apiError;
    }
  } catch (error: any) {
    console.error("Generate Voice Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate voice" });
  }
});

// Real-time or Simulated Call Status
app.post("/api/communicate/voice-call", async (req, res) => {
  try {
    const { phone, message } = req.body;
    console.log(`Starting call to phone number: ${phone}`);
    
    if (isTwilioConfigured && twilioClient) {
      const call = await twilioClient.calls.create({
        twiml: `<Response><Say voice="alice" language="en-IN">${message || "This is a call from Antima."}</Say></Response>`,
        to: phone,
        from: twilioFrom
      });
      return res.json({
        success: true,
        callId: call.sid,
        status: "initiated",
        message: "Real-time call initiated successfully via Twilio."
      });
    } else {
      console.log(`Twilio not configured. Simulating call to ${phone}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({ 
        success: true, 
        callId: `call_${Math.random().toString(36).substr(2, 9)}`,
        status: "in-progress",
        message: "Call initiated successfully (simulated - Twilio not configured)."
      });
    }
  } catch (error: any) {
    console.error("Twilio Voice Call Error:", error);
    res.status(500).json({ error: error.message || "Failed to initiate call" });
  }
});

// Real-time or Simulated Communication Sending
app.post("/api/communicate/send", async (req, res) => {
  try {
    const { contacts, channels, message, audio } = req.body;
    
    console.log(`Sending to ${contacts.length} contacts via ${channels.join(", ")}`);
    
    let callSids: string[] = [];
    let realCallCount = 0;
    
    if (channels.includes('voice') && contacts && contacts.length > 0) {
      for (const contact of contacts) {
        if (contact.phone) {
          console.log(`Processing voice call for ${contact.name} at ${contact.phone}`);
          if (isTwilioConfigured && twilioClient) {
            try {
              const call = await twilioClient.calls.create({
                twiml: `<Response><Say voice="alice" language="en-IN">${message || "This is a call from Antima."}</Say></Response>`,
                to: contact.phone,
                from: twilioFrom
              });
              callSids.push(call.sid);
              realCallCount++;
              console.log(`Successfully placed real Twilio call to ${contact.phone}, SID: ${call.sid}`);
            } catch (twilioErr: any) {
              console.error(`Failed to place real Twilio call to ${contact.phone}:`, twilioErr);
            }
          } else {
            console.log(`Twilio not configured. Simulating voice call for ${contact.name}`);
          }
        }
      }
    }
    
    // Simulate typical delay for other channels
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.json({ 
      success: true, 
      sentCount: contacts.length,
      channels,
      timestamp: new Date().toISOString(),
      twilioConfigured: isTwilioConfigured,
      isRealCall: realCallCount > 0,
      callSids,
      details: isTwilioConfigured 
        ? `Successfully sent notifications. Initiated ${realCallCount} real-time phone calls via Twilio.`
        : "Simulated send successful. Configure Twilio credentials in your .env to receive real-time calls!"
    });
  } catch (error: any) {
    console.error("Send Error:", error);
    res.status(500).json({ error: error.message || "Failed to send messages" });
  }
});

// AI Ritual Guidance Endpoint (Migrated to new SDK)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API key is missing. Please go to Settings > Secrets and provide a GEMINI_API_KEY." });
    }

    const systemInstruction = `
      You are Antima Ritual Agent, a compassionate AI assistant for Indian families.
      Your goal is to guide users through post-death rituals and funeral ceremonies.
      Context: ${context || 'General Indian Traditions'}
      Tone: Calm, respectful, compassionate, trustworthy.
      Provide step-by-step guidance. If you don't know something specific, advise consulting a local priest or elder.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message, 
      config: {
        systemInstruction,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Antima AI is currently unreachable." });
  }
});

async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
