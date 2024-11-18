import { fazerPergunta } from './pergunta.js';
import { perguntar } from './perguntaLivre.js';
import { consultar } from './consultaDestino.js';
import { processarImagem } from './processaimagem.js';
import { processaArquivoTexto } from './categorizador.js';

async function principal() {
  const escolha = await fazerPergunta(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  3. Ver informações com base em uma imagem;
  4. Fazer analise de sentimento do feedback dos usuarios com base no texto;
  \nOpção desejada: `);

  if (escolha === '1') {
    await perguntar();
  } else if (escolha === '2') {
    await consultar();
  } else if (escolha === '3') {
    const imagem = await fazerPergunta('\nEscolha uma imagem (informando caminho completo e nome da imagem): ');
    await processarImagem(imagem);
  } else if (escolha === '4') {
    await processaArquivoTexto();
  }
  else {
    console.log('Escolha inválida.');
  }
}

principal();