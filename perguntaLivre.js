import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';

const model = await inicializaModelo("gemini-1.5-pro-002");

export async function perguntar() {

  const prompt = await fazerPergunta("Me faça uma pergunta sobre um determinado destino: ");

  const parts = [
    { text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, estado, pais ou até ponto turístico diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponde a viagens, informe que não pode responder a respeito. Caso o usuário pergunte sobre lugares fictícios, você não deve passar informações sobre, pois o seu proposito é falar sobre viagem do mundo real.\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre devem conter apenas as categorias que forem solicitadas no momento da pergunta.\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos, culinária, clima, dicas, como chegar, curiosidades." },
    { text: "input: Me fale sobre gotham" },
    { text: "output: Gotham é uma cidade fictícia, então não tenho informações sobre ela. Posso te ajudar com informações sobre destinos reais para sua próxima viagem! Para onde você gostaria de ir? 😊" },
    { text: "input: Me fale sobre Piltover" },
    { text: "output: Piltover é uma cidade fictícia do universo de League of Legends, então não tenho informações sobre ela. 😊 \n\nPosso te ajudar com informações sobre destinos reais para sua próxima viagem! Para onde você gostaria de ir? 🌎" },
    { text: `input: me fale sobre o destino: ${prompt}` },
    { text: "output: " },
  ];

  const requisicao = ({
    contents: [{ role: "user", parts }]
  });

  const result = await model.generateContent(requisicao);
  // const totalTokensEntrada = await model.countTokens(requisicao);

  // console.log(`\nTotal tokens de entrada: ${totalTokensEntrada.totalTokens} tokens\n`);

  const response = await result.response;
  const text = response.text();
  console.log(text);

  // const totalTokensSaida = await model.countTokens(text);
  // console.log(`\nTotal tokens de saída: ${totalTokensSaida.totalTokens} tokens\n`);
}
