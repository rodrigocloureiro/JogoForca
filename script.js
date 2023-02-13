const palavras = [
  "macaco", "elefante", "baleia", "cachorro", "ganso", "gato", "girafa", "zebra", "leão", "tigre", "mamute", "guepardo", "jacaré", "urso", "porco", "coelho"
];

const btnNovaPalavra = document.querySelector('#btnNovaPalavra');
const btnVerificarPalavra = document.querySelector('#btnVerificarPalavra');
const spPalavraSecreta = document.querySelector('#spPalavraSecreta');
const spLetrasJogadas = document.querySelector('#spLetrasJogadas');
const spLetrasContidas = document.querySelector('#spLetrasContidas');
const input = document.querySelector('#ipPalavraResposta');
const img = document.querySelector('#imgForca');
const jogo = {
  palavra: '',
  pSecreta: '',
  letrasJogadas: [],
  letrasContidas: [],
  erros: 0
};

// Destructuring
let {palavra} = jogo;
let {pSecreta} = jogo; // pSecreta é palavra secreta
let {letrasJogadas} = jogo;
let {letrasContidas} = jogo;
let {erros} = jogo;

// Função refatorada com 5 sentenças
btnNovaPalavra.addEventListener('click', () => {
  reseta();
  palavra = palavras[Math.ceil(Math.random() * palavras.length - 1)];
  spLetrasContidas.textContent = underscore();
  destrava();
});

btnVerificarPalavra.addEventListener('click', verifica);

// Função refatorada com 5 sentenças
input.addEventListener('keyup', () => {
  if(letrasJogadas.includes(input.value)) {
      alert('Letra já foi jogada!');
      input.value = null;
  }
});

// Função refatorada com 5 sentenças
function underscore() {
  for(let i = 0; i < palavra.length; i++) {
      pSecreta += '_ ';
  }
  return pSecreta;
}

// Função refatorada com 5 sentenças
function limpaImput() {
  input.value = null;
  input.focus();
}

// Função refatorada com 5 sentenças
function reseta() {
  erros = 0;
  pSecreta = '';
  letrasJogadas = [];
  spPalavraSecreta.textContent = '';
  spLetrasJogadas.textContent = '';
}

// Função refatorada com 5 sentenças
function trava() {
  spPalavraSecreta.textContent = palavra;
  input.setAttribute('disabled', 'true');
  btnVerificarPalavra.setAttribute('disabled', 'true');
}

// Função refatorada com 5 sentenças
function destrava() {
  img.src = 'img/Forca00.png';
  btnVerificarPalavra.removeAttribute('disabled');
  input.removeAttribute('disabled');
}

// Função refatorada com 5 sentenças
function esgotouTentativas() {
  input.value = null;
  img.src = `img/Forca0${erros}.png`;
  trava();
}

// Função refatorada com 5 sentenças
function novaChance() {
  limpaImput();
  img.src = `img/Forca0${erros}.png`;
}

// Função refatorada com 5 sentenças
function erro() {
  erros++;
  erros === 6 ? esgotouTentativas() : novaChance();
}

// Função refatorada com 5 sentenças
function revela(indices) {
  for(let i = 0; i < indices.length; i++) {
      for(let j = 0; j < letrasContidas.length; j++) {
          pSecreta = pSecreta.substring(indices[i], 0) + `${letrasContidas[j]}` + pSecreta.substring(indices[i]+1);
      }
  }
  spLetrasContidas.textContent = pSecreta;
}

// Função refatorada com 5 sentenças
function indexLetras(indices, letra) {
  for(let i = 0; i < palavra.length; i++) {
      palavra[i] === letra ? indices.push(i*2) : null; // * 2 considerando espaços entre _ _
  }
  revela(indices);
}

// Função refatorada com 5 sentenças
function contidas(indices, letra) {
  if(palavra.includes(letra)) {
      letrasContidas.push(letra);
      indexLetras(indices, letra);
  } else
      erro();
}

// Função refatorada com 5 sentenças
function digitou(indices, letra) {
  letrasJogadas.push(letra);
  spLetrasJogadas.textContent = letrasJogadas.join(', ');
  contidas(indices, letra);
  limpaImput();
}

// Função refatorada com 5 sentenças
function verifica() {
  let indices = [];
  const letra = input.value.toLowerCase();
  letra === '' ? alert('Digite alguma letra antes de verificar') : digitou(indices, letra);
  spLetrasContidas.textContent.replaceAll(' ', '') === palavra ? trava() : null;
}