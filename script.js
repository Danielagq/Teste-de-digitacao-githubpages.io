const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
    "Exemplo de texto para digitar",
    "Outro exemplo de texto para digitar",
    "Mais um exemplo de texto para digitar",
    "Digite isso",
    "Você pode digitar isso aqui",
    "Essa é minha frase",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia",
    "A vida é curta demais para se arrepender. Viva intensamente!",
    "A felicidade está nas coisas simples da vida",
    "Acredite em si mesmo e tudo será possível",
    "O otimismo é a chave para superar qualquer desafio",
    "A imaginação é mais importante que o conhecimento",
    "A persistência é o caminho do êxito",
    "Aprenda com os erros e siga em frente",
    "A vida é uma aventura, aproveite cada momento",
    "A amizade verdadeira é um tesouro precioso",
];

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
}

function atualizarTeste() {
    iniciar();

    if (entrada.value.toLowerCase() === texto.textContent.toLowerCase()) {
        verificar();
    } 
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

    if (!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto);

    localStorage.setItem("testEmAndamento", false);
    entrada.value = "";
    novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement("p");

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo ${tempoGasto} segundos!`;

    historico.appendChild(itemHistorico);
}

function reiniciarTeste() {

    entrada.value = "";
    resultado.textContent = "";
    novoTexto();
    localStorage.setItem("testeEmAndamento", false);
    historico.innerHTML = "";
}

function alternarTema() {
    const body = document.body

    body.classList.toggle("claro");
    body.classList.toggle("escuro");
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);

alternarTemaBtn.addEventListener("click", alternarTema);

novoTexto();