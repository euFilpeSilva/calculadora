const display = document.getElementById('display');
// [id *=tecla] é usado pra referenciar varios elementos que tem parte do nome igual
// ex: id = 'tecla7',
//  id ='tecla8'
const numeros = document.querySelectorAll('[id *=tecla]');
const operadores = document.querySelectorAll('[id *=operador]');
// variaveis de controle, guardam os valores e operadores
let novoNumero = true;
let operador;
let numeroAnterior;

// verifica de o operador é diferente de undefined
const operacaoPendente = () => operador != undefined;

const calcular = () => {
  if(operacaoPendente()){
    // replace( troca um elemento por outro)
    // nesse caso estamos utilizando pra trocar as virgulas por ponto
    // para que a logica possa funcionar
    const numeroAtual = parseFloat(display.textContent.replace(',','.'));
    novoNumero = true;
    const resultado  = eval (`${numeroAnterior} ${operador} ${numeroAtual}`);
    atualizarDisplay(resultado);

    // forma mais complexa
    // if(operador == '+'){
    //   atualizarDisplay(numeroAnterior + numeroAtual);
    // }else if(operador == '-') {
    //   atualizarDisplay(numeroAnterior - numeroAtual)
    // }else if(operador == '*') {
    //   atualizarDisplay(numeroAnterior * numeroAtual)
    // }else if(operador == '/') {
    //   atualizarDisplay(numeroAnterior / numeroAtual)
    // }
  }
}

const atualizarDisplay = (texto) => {
  if(novoNumero){
    display.textContent = texto.toLocaleString('BR');
    novoNumero = false;
  }else{
    display.textContent += texto.toLocaleString('BR');
  }
}

const inserirNumero = (evento)=> atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

const selecionarOperador = (evento) => {
  if(!novoNumero){
    calcular();
  novoNumero = true;
  operador = evento.target.textContent;
  numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
  
  }
}
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () =>{
  calcular();
  operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent ='';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
  limparDisplay()
  operacao = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoCaractere = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('backspace').addEventListener('click', removerUltimoCaractere);

const inverterSinal =() => {
  novoNumero = true;
  atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
  if (!existeDecimal()){
    if (existeValor()){
      atualizarDisplay(',')
    }else{
      atualizarDisplay('0,')
    }
  }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

