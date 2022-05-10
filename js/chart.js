let tablas = document.getElementById('table');
let datos;

//traigo los datos del JSON y los inserto en la tabla de movimientos.
fetch('http://localhost:5500/datos.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      datos = data;
      function datosTabla(){
        datos.forEach(element => 
            tablas.innerHTML += "<tr><td>" + element.fecha + "</td><td>" + element.tipo + "</td><td>" + element.monto + "</td><td>" + element.categoria + "</td><td>"+ element.detalle +"</td></tr>");
      }
      datosTabla()
    });

// Chart

var options = {
    series: [0, 0, 0, 0, 0, 0],
    chart: {
        width: 380,
        type: 'pie',
        foreColor: '#000',
  },
  labels: ['Compras', 'Alquiler', 'Educación', 'Suscripciones', 'Impuestos', 'Otros'],
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

  var chart = new ApexCharts(document.querySelector("#chart1"), options2);
  chart.render();

  // tooltips

  const mediaQuery = window.matchMedia('(min-width: 657px)')

  if (mediaQuery.matches) {
    tippy('#opt1', {
      content: 'Agregar dinero',
      placement: 'right',
    });
  
    tippy('#opt2', {
      content: 'Retirar dinero',
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
  } else {
    tippy('#opt1', {
      content: 'Agregar dinero',
      placement: 'top',
    });
  
    tippy('#opt2', {
      content: 'Retirar dinero',
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
  }