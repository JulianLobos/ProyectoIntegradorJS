let agregarDineroBtn = document.getElementById('agregarBtn');
let agregarAhorroBtn = document.getElementById('agregarAhorroBtn');
let saldoHtml = document.getElementById('saldo');
let ahorroHtml = document.getElementById('ahorros')
let tabla = document.getElementById('table');
let opt1 = document.getElementById('opt1')
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');
let opt5 = document.getElementById('mov');
let opt6 = document.getElementById('opt6');
let buttonNo = document.getElementById('buttonNo');
let buttonSi = document.getElementById('buttonSi');
let dolarOficialCompra = document.getElementById('dolarOficialCompra');
let dolarOficialVenta = document.getElementById('dolarOficialVenta');
let dolarBlueCompra = document.getElementById('dolarBlueCompra');
let dolarBlueVenta = document.getElementById('dolarBlueVenta');
let pesoADolarValor = document.getElementById('pesoADolar');
let dolarAPesoValor = document.getElementById('dolarAPeso');
let fromPesosArgentinos = document.getElementById('fromPesosArgentinos');
let toDolares = document.getElementById('toDolares');
let fromDolares = document.getElementById('fromDolares');
let toPesosArgentinos = document.getElementById('toPesosArgentinos');
let pesoADolarBtn = document.getElementById('pesoADolarBtn');
let dolarAPesoBtn = document.getElementById('dolarAPesoBtn');
let cerrarConversor = document.getElementById('cerrarConversor');
let cotizadorDolar = document.getElementById('cotizadorDolar');
let salirAlert = document.getElementById('salirAdvertencia');
let dolarInfo;
let usdOficialCompra;
let usdOficialVenta;
let usdBlueCompra;
let usdBlueVenta;
let saldo = 0;
let ahorro = 0;
let movimientos = [];
let result = localStorage.getItem('CuentaAbierta');
let current = JSON.parse(result);
if(current[0].movimientos != []){
    movimientos = current[0].movimientos;
}
if(current[0].saldo != 0){
    saldo = current[0].saldo;
    saldoHtml.innerHTML = saldo;
}
if(current[0].ahorro != 0){
    ahorro = current[0].ahorro;
    ahorroHtml.innerHTML = ahorro;
}

function cotizarDolar(){
    dolarOficialCompra.innerHTML = dolarInfo[0].casa.compra;
    dolarOficialVenta.innerHTML = dolarInfo[0].casa.venta;
    dolarBlueCompra.innerHTML = dolarInfo[1].casa.compra;
    dolarBlueVenta.innerHTML = dolarInfo[1].casa.venta;
}

///////////////////     Funcion para cambiar la coma por un punto en los string de la api     /////////////////////

function coma(x){
    let numeroParseado = '';
    for(let letter of x){
        if(letter == ','){
            numeroParseado += '.'
        }else{
            numeroParseado += letter;
        }
    }
    return parseFloat(numeroParseado);
}


///////////////////     traigo los precios del dolar desde una api     ///////////////////
fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then((response) => response.json())
    .then((data) => {
        dolarInfo = data;
        cotizarDolar();
        usdOficialCompra = coma(dolarInfo[0].casa.compra);
        usdOficialVenta = coma(dolarInfo[0].casa.venta);
        usdBlueCompra = coma(dolarInfo[1].casa.compra);
        usdBlueVenta = coma(dolarInfo[1].casa.venta);
    });

///////////////////     Funciones de cálculo para el conversor     ///////////////////

function pesoADolar(){
    if(pesoADolarValor.value == 'DolarOficialCompra'){
        let resultado = fromPesosArgentinos.value / usdOficialCompra;
        toDolares.value = resultado;
    } else if(pesoADolarValor.value == 'DolarOficialVenta'){
        let resultado = fromPesosArgentinos.value / usdOficialVenta;
        toDolares.value = resultado;
    } else if(pesoADolarValor.value == 'DolarBlueCompra'){
        let resultado = fromPesosArgentinos.value / usdBlueCompra;
        toDolares.value = resultado;
    } else if(pesoADolarValor.value == 'DolarBlueVenta'){
        let resultado = fromPesosArgentinos.value / usdBlueVenta;
        toDolares.value = resultado;
    }
}

function dolarAPeso(){
    if(dolarAPesoValor.value == 'DolarOficialCompra'){
        let resultado = fromDolares.value * usdOficialCompra;
        toPesosArgentinos.value = resultado;
    } else if(dolarAPesoValor.value == 'DolarOficialVenta'){
        let resultado = fromDolares.value * usdOficialVenta;
        toPesosArgentinos.value = resultado;
    } else if(dolarAPesoValor.value == 'DolarBlueCompra'){
        let resultado = fromDolares.value * usdBlueCompra;
        toPesosArgentinos.value = resultado;
    } else if(dolarAPesoValor.value == 'DolarBlueVenta'){
        let resultado = fromDolares.value * usdBlueVenta;
        toPesosArgentinos.value = resultado;
    }
}

///////////////////     Funciones de la librería toastify     ///////////////////
function alertaExito(){
        Toastify({
            text: "Operación realizada con éxito!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "#008000",
            },
            onClick: function(){}
            }).showToast();
}

function alertaErr(){
    Toastify({
        text: "Error! Verifique los datos ingresados",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#d00000",
        },
        onClick: function(){} 
        }).showToast();
}

function generadorFecha(){
    const now = new Date().toLocaleString();
    return now;
}

//  Hago la desestructuración del objeto current para sacar el nombre y apellido de la persona que ingresó
//  para despues mostrarlos en el dashboard
const {nombre, apellido} = current[0];

function infoContacto(){
    let infoCont = document.getElementById('userName');
    infoCont.innerHTML = '<p>'+nombre+ ' ' +apellido+'</p>';
}

function guardarDatos(){
    let datosLocalJSON = localStorage.getItem('usuarios');
    let datosLocal = JSON.parse(datosLocalJSON);
    for(let i=0; i < datosLocal.length; i++){
        if(current[0].username == datosLocal[i].username){
            datosLocal[i].saldo = current[0].saldo;
            datosLocal[i].ahorro = current[0].ahorro;
            datosLocal[i].movimientos = current[0].movimientos;
            datosLocal[i].series = current[0].series
            datosLocal[i].series2 = current[0].series2
        }
    }
    datosString = JSON.stringify(datosLocal);
    localStorage.setItem('usuarios', datosString);
}

function ultMovimientos(){
    if (movimientos == ''){
        document.getElementById('div5').style.display='none';
        document.getElementById('ceroMovimientos').style.display='flex'
    }
    function listaMovimientos(movimientos){
        tabla.innerHTML = "<tr><th>Fecha</th><th>Tipo</td><th>Monto</th><td>Categoría</th><th>Detalle</th></tr>";
        for(let i of movimientos) {
            tabla.innerHTML += "<tr><td>" + i.fecha + "</td><td>" + i.tipo + "</td><td>" + i.monto + "</td><td>" + i.categoria + "</td><td>"+ i.detalle +"</td></tr>";
                
        }
    }
    listaMovimientos(movimientos);
}

function retirar(){
    let categoria = document.getElementById('tipoGasto').value;
    number = +document.getElementById('retirarSaldo').value;
    let detalleGasto = document.getElementById('detalleGasto').value;
    if(number <= saldo && number > 0){
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        document.getElementById('retirarSaldo').value = "";
        let fecha = generadorFecha();
        current[0].saldo -= number;
        movimientos.unshift({
            fecha: fecha,
            categoria: categoria,
            tipo: 'Gasto',
            monto: "$"+number,
            detalle: detalleGasto,
        })
        current[0].movimientos = movimientos;
        if(categoria == 'Compras'){
            options.series[0] += number;
        } else if(categoria == 'Alquiler'){
            options.series[1] += number;
        } else if(categoria == 'Educacion'){
            options.series[2] += number;
        } else if(categoria == 'Suscripciones'){
            options.series[3] += number;
        } else if(categoria == 'Impuestos'){
            options.series[4] += number;
        } else {
            options.series[5] += number;
        }
        current[0].series = options.series;
        guardarDatos();
        alertaExito();
        document.getElementById('mensajeError3').style.display= "none";
        document.getElementById('retirarSaldo').style.border= "1px solid rgb(165, 163, 163)"
        document.getElementById('detalleGasto').value = '';
    }else{
        alertaErr();
        document.getElementById('mensajeError3').style.display= "flex";
        document.getElementById('retirarSaldo').style.border= "3px solid red"
    }
}

function ahorros(){
    number = +document.getElementById('sumarAhorros').value;
    let detalleAhorro = document.getElementById('detalleAhorro').value;
    if(number <= saldo && number > 0){
        ahorro += number;
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('sumarAhorros').value = 0;
        let fecha = generadorFecha();
        current[0].ahorro += number;
        current[0].saldo -= number;
        movimientos.unshift({
            fecha: fecha,
            categoria: "Ahorro",
            tipo: 'Aumento de ahorros',
            monto: "$"+number,
            detalle: detalleAhorro,
        })
        current[0].movimientos = movimientos;
        guardarDatos();
        alertaExito()
        document.getElementById('mensajeError4').style.display= "none";
        document.getElementById('detalleAhorro').value = '';
        document.getElementById('sumarAhorros').style.border= "1px solid rgb(165, 163, 163)"
    }else{
        alertaErr()
        document.getElementById('mensajeError4').style.display= "flex";
        document.getElementById('sumarAhorros').style.border= "3px solid red"
    }
}

function restarAhorros(){
    let detalleAhorroRetiro = document.getElementById('detalleAhorroRetiro').value;
    number = +document.getElementById('restarAhorros').value;
    if(number <= ahorro && number > 0){
        saldo += number;
        ahorro -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        current[0].saldo += number;
        current[0].ahorro -= number;
        document.getElementById('restarAhorros').value = 0;
        let fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: "Ahorro",
            tipo: 'Retiro de ahorros',
            monto: "$"+number,
            detalle: detalleAhorroRetiro,
        })
        current[0].movimientos = movimientos;
        guardarDatos();
        alertaExito()
        document.getElementById('mensajeError5').style.display= "none";
        document.getElementById('restarAhorros').style.border= "1px solid rgb(165, 163, 163)"
        document.getElementById('detalleAhorroRetiro').value = '';
    }else{
        alertaErr()
        document.getElementById('mensajeError5').style.display= "flex";
        document.getElementById('restarAhorros').style.border= "3px solid red"
    }
}

///////////////////     Funciones para cambiar entre opciones en el menú     ///////////////////
function mostrarDiv(num){
    document.getElementById('div1').style.display='none';
    document.getElementById('div2').style.display='none';
    document.getElementById('div3').style.display='none';
    document.getElementById('div4').style.display='none';
    document.getElementById('div5').style.display='none';
    document.getElementById('ceroMovimientos').style.display='none'
    document.getElementById('div'+num).style.display='flex'
    if(num == 5){
        ultMovimientos();
    }
}

opt1.onclick = () => {
    mostrarDiv('1');
}
opt2.onclick = () => {
    mostrarDiv('2');
}
opt3.onclick = () => {
    mostrarDiv('3');
}
opt4.onclick = () => {
    mostrarDiv('4');
}
opt5.onclick = () => {
    mostrarDiv('5');
}
opt6.onclick = () => {
    salirAlert.style.display='flex';
}
buttonSi.onclick = () => {
    document.location.href = 'index.html';
}
buttonNo.onclick = () => {
    salirAlert.style.display='none';
}

agregarDineroBtn.onclick = function(e){
    e.preventDefault()
    number = +document.getElementById('agregarSaldo').value;
    if(number > 0){
        document.getElementById('agregarForm2').style.display= "flex";
        document.getElementById('mensajeError').style.display= "none";
        document.getElementById('agregarSaldo').style.border= "1px solid rgb(165, 163, 163)"
    }else{
        alertaErr()
        document.getElementById('agregarForm2').style.display= "none";
        document.getElementById('mensajeError').style.display= "flex";
        document.getElementById('agregarSaldo').style.border= "3px solid red"
    }
}

agregarAhorroBtn.onclick = function(e){
    e.preventDefault()
    let ahorros = +document.getElementById('agregarAhorros').value;
    let categoria = document.getElementById('tipoIngreso').value;
    let detalleIngreso = document.getElementById('detalleIngreso').value;
    if(ahorros >= 0 && ahorros <= 100){
        ahorro += number * (ahorros/100);
        saldo += number - (number * (ahorros/100));
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('agregarAhorros').value = "";
        document.getElementById('agregarSaldo').value = "";
        document.getElementById('detalleIngreso').value = "";
        document.getElementById('agregarForm2').style.display= "none";
        let fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: categoria,
            tipo: 'Ingreso',
            monto: "$"+ (number - (number * (ahorros/100))),
            detalle: detalleIngreso,
        })
        current[0].saldo += number - (number * (ahorros/100));
        let ingreso = number - (number * (ahorros/100));
        if(categoria == 'Sueldo'){
            options2.series[0] += ingreso;
        } else if (categoria == 'Freelance'){
            options2.series[1] += ingreso;
        } else if (categoria == 'Donación'){
            options2.series[2] += ingreso;
        } else if (categoria == 'Venta'){
            options2.series[3] += ingreso;
        } else if (categoria == 'Trabajo Extra'){
            options2.series[4] += ingreso;
        } else if (categoria == 'Préstamo'){
            options2.series[5] += ingreso;
        } else if (categoria == 'Otro'){
            options2.series[6] += ingreso;
        }
        current[0].series2 = options2.series;
        if (ahorros > 0){
            movimientos.unshift({
                fecha: fecha,
                categoria: "Ahorro",
                tipo: 'Ingreso',
                monto: "$"+ (number * (ahorros/100)),
                detalle: "Porcentaje de ahorro ingresado desde "+ categoria,
            })
            current[0].ahorro += number * (ahorros/100);
        }
        current[0].movimientos = movimientos;
        guardarDatos();
        alertaExito();
    }else{
        document.getElementById('mensajeError2').style.display= "flex";
        document.getElementById('agregarAhorros').style.border= "3px solid red"
    }
}

document.getElementById('retirarBtn').onclick = function(e){
    e.preventDefault();
    retirar();
}

document.getElementById('sumarAhorrosBtn').onclick = function(e){
    e.preventDefault();
    ahorros();
}

document.getElementById('restarAhorrosBtn').onclick = function(e){
    e.preventDefault();
    restarAhorros();
}

infoContacto();

///////////////     Funciones del conversor     ///////////////

fromPesosArgentinos.onchange = () => {
    pesoADolar();
}
pesoADolarValor.onchange = () => {
    pesoADolar();
}
fromDolares.onchange = () => {
    dolarAPeso();
}
dolarAPesoValor.onchange = () => {
    dolarAPeso();
}
pesoADolarBtn.onclick = () => {
    document.getElementById('cambio1').style.display="block";
    document.getElementById('cambio2').style.display="none";
}
dolarAPesoBtn.onclick = () => {
    document.getElementById('cambio2').style.display="block";
    document.getElementById('cambio1').style.display="none";
}
cerrarConversor.onclick = () => {
    document.getElementById('cotizadorVentana').style.display="none"
}
cotizadorDolar.onclick = () => {
    document.getElementById('cotizadorVentana').style.display="flex"
}
