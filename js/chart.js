// Chart

var options = {
    series: [0, 0, 0, 0, 0, 0],
    chart: {
        width: 380,
        type: 'pie',
        foreColor: '#000',
  },
  labels: ['Compras', 'Alquiler', 'Educación', 'Suscripciones', 'Impuestos', 'Otros'],
  colors:['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#8ac926'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};
options.series = current[0].series
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// chart2

var options2 = {
  series: [0, 0, 0, 0, 0, 0, 0],
  chart: {
      width: 380,
      type: 'pie',
      foreColor: '#000',
},
labels: ['Sueldo', 'Freelance', 'Donación', 'Venta', 'Trabajo Extra', 'Préstamo', 'Otro'],
colors:['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#a8201a', '#4f772d'],
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 300
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};
options2.series = current[0].series2
var chart1 = new ApexCharts(document.querySelector("#chart1"), options2);
chart1.render();

// tooltips

const mediaQuery = window.matchMedia('(min-width: 657px)')

if (mediaQuery.matches) {
  tippy('#opt1', {
    content: 'Agregar dinero',
    placement: 'right',
  });

  tippy('#opt2', {
    content: 'Registrar gasto',
    placement: 'right',
  });

  tippy('#opt3', {
    content: 'Agregar ahorros',
    placement: 'right',
  });

  tippy('#opt4', {
    content: 'Retirar ahorros',
    placement: 'right',
  });

  tippy('#mov', {
    content: 'Últimos movimientos',
    placement: 'right',
  });

  tippy('#opt6', {
    content: 'Salir',
    placement: 'right',
  });
} else {
  tippy('#opt1', {
    content: 'Agregar dinero',
    placement: 'top',
  });

  tippy('#opt2', {
    content: 'Registrar gasto',
    placement: 'top',
  });

  tippy('#opt3', {
    content: 'Agregar ahorros',
    placement: 'top',
  });

  tippy('#opt4', {
    content: 'Retirar ahorros',
    placement: 'top',
  });

  tippy('#mov', {
    content: 'Últimos movimientos',
    placement: 'top',
  });

  tippy('#opt6', {
    content: 'Salir',
    placement: 'top',
  });
}