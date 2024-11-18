import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const geminiKey = process.env.GEMINI_API_KEY;

export async function inicializaModelo(modelo) {

    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({ model: modelo });

    return model;   

}