import { GoogleGenerativeAI } from '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';
import dotenv from 'dotenv';

dotenv.config();


// Set up your API key as an environment variable
const geminiKey = process.env.GEMINI_API_KEY;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(geminiKey);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  let prompt = "Você é um site de viagens e deve responder somente sobre esse assunto."+
  "Caso o usuario pergunte sobre algo diferente. Diga que não pode reponder sobre esse assunto."+
  "O usuario respondeu: ";
  prompt += await fazerPergunta("Me falo sobre o destino que deseja conhecer: ");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();