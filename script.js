const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const operacionEl = document.getElementById('operacion');
const resultadoEl = document.getElementById('resultado');
const cajaProcedimiento = document.getElementById('cajaProcedimiento');
const btnCalcular = document.getElementById('btnCalcular');

function calcular() {
  const n1 = parseFloat(num1El.value);
  const n2 = parseFloat(num2El.value);
  const op = operacionEl.value;

  if (isNaN(n1) || isNaN(n2)) {
    mostrarError('Faltan datos');
    return;
  }

  let resultado;
  switch (op) {
    case '+': resultado = n1 + n2; break;
    case '-': resultado = n1 - n2; break;
    case '*': resultado = n1 * n2; break;
    case '/':
      if (n2 === 0) {
        mostrarError('Div. entre 0');
        return;
      }
      resultado = n1 / n2;
      break;
  }

  resultado = Math.round(resultado * 10000) / 10000;

  resultadoEl.textContent = resultado;
  resultadoEl.classList.remove('error');

  cajaProcedimiento.innerHTML = `
    <span class="procedimiento">${n1} ${op} ${n2}</span>
    <span class="flecha">=</span>
    <span class="resultado-final">${resultado}</span>
  `;
}

function mostrarError(msg) {
  resultadoEl.textContent = msg;
  resultadoEl.classList.add('error');
  cajaProcedimiento.innerHTML = `<span class="error">${msg}</span>`;
}

btnCalcular.addEventListener('click', calcular);

[num1El, num2El].forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') calcular();
  });
});