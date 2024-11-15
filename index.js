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

  const categorias = await fazerPergunta("Me fale as categorias que deseja visualizar sobre um determinado destino: ")
  const prompt = await fazerPergunta("Me falo sobre o destino que deseja conhecer: ");

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, estado, pais ou até ponto turístico diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponde a viagens, informe que não pode responder a respeito. Caso o usuário pergunte sobre lugares fictícios, você não deve passar informações sobre, pois o seu proposito é falar sobre viagem do mundo real.\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre devem conter apenas as categorias que forem solicitadas no momento da pergunta.\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos, culinária, clima, dicas, como chegar, curiosidades."},
    {text: "input: Me fale sobre flamengo, bairro tradicional do rio de janeiro"},
    {text: "output: **Flamengo, Rio de Janeiro**\n\n**Localização:** Zona Sul do Rio de Janeiro, à beira da Baía de Guanabara.\n\n**História:**\n* Fundado em 1892, originalmente uma área residencial de classe alta.\n* Tornou-se um bairro badalado nos anos 1950 e 1960, com a construção de hotéis e prédios luxuosos.\n\n**Principais Destaques:**\n\n* **Praia do Flamengo:** Uma das mais populares praias urbanas do Rio, com 2 km de extensão e vista panorâmica da cidade.\n* **Parque do Flamengo:** Um enorme parque urbano com 1,2 milhão de m², ideal para caminhadas, ciclismo e piqueniques.\n* **Museu de Arte Moderna (MAM):** Abriga uma vasta coleção de arte moderna e contemporânea do Brasil e do exterior.\n* **Marina da Glória:** Um ponto turístico icônico com uma marina que oferece passeios de barco.\n* **Clube de Regatas do Flamengo:** Um dos clubes de futebol mais famosos do Brasil, com um estádio que recebe grandes jogos e eventos.\n\n**Cultura e Vida Noturna:**\n* O Flamengo é conhecido por sua vida noturna agitada, com bares e restaurantes badalados ao longo da Avenida Atlântica.\n* O bairro também abriga centros culturais e galerias de arte.\n\n**Onde Ficar:**\n* Pestana Rio Atlântica\n* JW Marriott Hotel Rio de Janeiro\n* Miramar Hotel by Windsor\n\n**Como Chegar:**\n* Metrô (estação Flamengo)\n* Ônibus (várias linhas passam pelo bairro)\n* Táxi ou Uber"},
    {text: "input: Me fale sobre gotham"},
    {text: "output: Gotham é uma cidade fictícia, então não tenho informações sobre ela. Posso te ajudar com informações sobre destinos reais para sua próxima viagem! Para onde você gostaria de ir? 😊"},
    {text: "input: Me fale sobre Piltover"},
    {text: "output: Piltover é uma cidade fictícia do universo de League of Legends, então não tenho informações sobre ela. 😊 \n\nPosso te ajudar com informações sobre destinos reais para sua próxima viagem! Para onde você gostaria de ir? 🌎"},
    {text: `input: me fale sobre ${categorias} do destino: ${prompt}`},
    {text: "output: "},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }]
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();