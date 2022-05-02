var options = {
    series: [0, 0, 0, 0, 0, 0],
    chart: {
        width: 380,
        type: 'pie',
        foreColor: '#fff',
  },
  labels: ['Compras', 'Alquiler', 'Educación', 'Suscripciones', 'Impuestos', 'Otros'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();