import { inicializaModelo } from './modelo.js';
import fs from 'fs';

const model = await inicializaModelo("gemini-1.5-flash");

function fileToGenerativePart(path, mimeType) {
    console.log(path);
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

export async function processarImagem(imagem) {

    const prompt = "Me fale tudo que puder sobre o destino mostrado nessa iamgem";

    const imageParts = [
        fileToGenerativePart(imagem, "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

