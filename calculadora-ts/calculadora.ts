type Operacion = '+' | '-' | '*' | '/';

class Calculadora {
  sumar(a: number, b: number): number { return a + b; }
  restar(a: number, b: number): number { return a - b; }
  multiplicar(a: number, b: number): number { return a * b; }
  dividir(a: number, b: number): number {
    if (b === 0) throw new Error('Error: Div / 0');
    return a / b;
  }

  calcular(a: number, b: number, operacion: Operacion): number {
    switch (operacion) {
      case '+': return this.sumar(a, b);
      case '-': return this.restar(a, b);
      case '*': return this.multiplicar(a, b);
      case '/': return this.dividir(a, b);
      default: throw new Error('Operación no válida');
    }
  }
}

// Lógica de la interfaz
const calc = new Calculadora();
const display = document.getElementById('display') as HTMLDivElement;

let valorActual = '0';
let primerOperando: number | null = null;
let operacionPendiente: Operacion | null = null;
let reiniciarPantalla = false;

function actualizarPantalla(valor: string) {
  display.textContent = valor;
}

document.querySelectorAll('.btn-num').forEach(boton => {
  boton.addEventListener('click', () => {
    const num = (boton as HTMLButtonElement).dataset.num!;
    if (valorActual === '0' || reiniciarPantalla) {
      valorActual = num === '.' ? '0.' : num;
      reiniciarPantalla = false;
    } else {
      if (num === '.' && valorActual.includes('.')) return;
      valorActual += num;
    }
    actualizarPantalla(valorActual);
  });
});

document.querySelectorAll('.btn-op').forEach(boton => {
  boton.addEventListener('click', () => {
    const op = (boton as HTMLButtonElement).dataset.op as Operacion;
    if (primerOperando === null) {
      primerOperando = parseFloat(valorActual);
    } else if (operacionPendiente && !reiniciarPantalla) {
      ejecutarCalculo();
    }
    operacionPendiente = op;
    reiniciarPantalla = true;
  });
});

document.getElementById('btnEquals')?.addEventListener('click', ejecutarCalculo);

function ejecutarCalculo() {
  if (primerOperando === null || operacionPendiente === null) return;
  const segundoOperando = parseFloat(valorActual);

  try {
    const resultado = calc.calcular(primerOperando, segundoOperando, operacionPendiente);
    valorActual = resultado.toString();
    actualizarPantalla(valorActual);
    primerOperando = resultado;
    operacionPendiente = null;
  } catch (error) {
    if (error instanceof Error) actualizarPantalla(error.message);
    primerOperando = null;
    operacionPendiente = null;
  }
  reiniciarPantalla = true;
}

document.getElementById('btnClear')?.addEventListener('click', () => {
  valorActual = '0';
  primerOperando = null;
  operacionPendiente = null;
  reiniciarPantalla = false;
  actualizarPantalla('0');
});

document.getElementById('btnBack')?.addEventListener('click', () => {
  if (valorActual.length > 1) {
    valorActual = valorActual.slice(0, -1);
  } else {
    valorActual = '0';
  }
  actualizarPantalla(valorActual);
});