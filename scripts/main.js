// Calculadora simples em JavaScript

const display = document.getElementById('display');

function adicionarNaTela(input) {
  display.value += input;
}

function apagarDisplay() {
  display.value = '';
}

function calcularResultado() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Erro';
  }
}
