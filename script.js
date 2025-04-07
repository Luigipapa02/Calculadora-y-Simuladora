function calcularDividendos() {
  const cantidad = parseFloat(document.getElementById('cantidadCedears').value);
  const ratio = parseFloat(document.getElementById('ratioCedear').value);
  const dividendoAnual = parseFloat(document.getElementById('dividendoAnual').value);

  if (isNaN(cantidad) || isNaN(ratio) || isNaN(dividendoAnual)) return;

  const acciones = cantidad / ratio;
  const dividendoBruto = acciones * dividendoAnual;
  const dividendoNeto = dividendoBruto * 0.7 * 0.93;

  document.getElementById('resultadoCalculadora').textContent =
    `💵 Dividendo anual neto estimado: USD ${dividendoNeto.toFixed(2)}`;
}

function simularCrecimiento() {
  const cedearsIniciales = parseFloat(document.getElementById('cedearsIniciales').value);
  const precioAccion = parseFloat(document.getElementById('precioAccion').value);
  const usdMensuales = parseFloat(document.getElementById('usdMensuales').value);
  const dividendoNetoActual = parseFloat(document.getElementById('dividendoNetoActual').value);
  const crecimiento = parseFloat(document.getElementById('crecimientoAnual').value);
  const anios = parseInt(document.getElementById('anios').value);
  const ratio = parseFloat(document.getElementById('ratioCedear').value);

  if (isNaN(cedearsIniciales) || isNaN(precioAccion) || isNaN(usdMensuales) || isNaN(dividendoNetoActual) || isNaN(crecimiento) || isNaN(anios) || isNaN(ratio)) return;

  const precioCedear = precioAccion / ratio;
  const cedearsPorMes = usdMensuales / precioCedear;
  const accionesPorMes = cedearsPorMes / ratio;

  document.getElementById('infoCedearsAcciones').textContent =
    `🔎 Estás comprando aproximadamente ${cedearsPorMes.toFixed(2)} CEDEARs/mes (${accionesPorMes.toFixed(2)} acciones).`;

  let cedears = cedearsIniciales;
  let dividendo = dividendoNetoActual;
  let resultadoHTML = "📅 Proyección año a año:<br>";
  let labels = [];
  let data = [];

  for (let i = 1; i <= anios; i++) {
    const cedearsAnio = cedears + (cedearsPorMes * 12 * i);
    const accionesAnio = cedearsAnio / ratio;
    const dividendoAnual = accionesAnio * (dividendo * Math.pow(1 + crecimiento / 100, i));
    resultadoHTML += `Año ${i}: USD ${dividendoAnual.toFixed(2)}<br>`;
    labels.push(`Año ${i}`);
    data.push(dividendoAnual);
  }

  document.getElementById('resultadoSimulador').innerHTML = resultadoHTML;

  const ctx = document.getElementById('graficoProyeccion').getContext('2d');
  if (window.grafico) window.grafico.destroy();
  window.grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Dividendos Anuales Estimados (USD)',
        data,
        backgroundColor: '#39ff14'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#000' }
        }
      },
      scales: {
        x: { ticks: { color: '#000' } },
        y: { ticks: { color: '#000' } }
      }
    }
  });
}
