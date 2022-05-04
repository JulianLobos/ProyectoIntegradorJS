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