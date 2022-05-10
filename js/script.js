let saldoHtml = document.getElementById('saldo');
let ahorroHtml = document.getElementById('ahorros')
let tabla = document.getElementById('table');
let opt1 = document.getElementById('opt1')
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');
let opt5 = document.getElementById('mov');
let saldo = 0;
let ahorro = 0;
let fecha;
let categoria;
let detalleGasto;
let detalleIngreso;
let detalleAhorro;
let detalleAhorroRetiro;
let movimientos = [];
let result = localStorage.getItem('CuentaAbierta');
let current = JSON.parse(result);
let fechaGenerada = [];

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
    fechaGenerada = [];
    let generador = new Date;
    fechaGenerada += generador.getDate() + "/";
    fechaGenerada += generador.getMonth()+1 + "/";
    fechaGenerada += generador.getFullYear();
    fechaGenerada += " ";
    fechaGenerada += generador.getHours() + ":";
    fechaGenerada += generador.getMinutes() + " hs";
    return fechaGenerada;
}

//  Hago la desestructuración del objeto current para sacar el nombre y apellido de la persona que ingresó
//  para despues mostrarlos en el dashboard
const {nombre, apellido} = current[0];

function infoContacto(){
    let infoCont = document.getElementById('userName');
    infoCont.innerHTML = '<p>'+nombre+ ' ' +apellido+'</p>';
}

function ultMovimientos(){
    if (movimientos == ''){
        document.getElementById('div5').style.display='none';
        document.getElementById('ceroMovimientos').style.display='flex'
    }
    function listaMovimientos(movimientos){
        for(let i of movimientos) {
            if (i.estado == false) {
                tabla.innerHTML += "<tr><td>" + i.fecha + "</td><td>" + i.tipo + "</td><td>" + i.monto + "</td><td>" + i.categoria + "</td><td>"+ i.detalle +"</td></tr>";
                // el estado es para que declarar que ya está visible en la tabla de movimientos y para que no se muestre repetidamente.
                i.estado = true;
            }
        }
    }
    listaMovimientos(movimientos);
}

function retirar(){
    categoria = document.getElementById('tipoGasto').value;
    number = +document.getElementById('retirarSaldo').value;
    detalleGasto = document.getElementById('detalleGasto').value;
    if(number <= saldo && number > 0){
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        document.getElementById('retirarSaldo').value = "";
        fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: categoria,
            tipo: 'Gasto',
            monto: "$"+number,
            detalle: detalleGasto,
            estado: false,
        })
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
    detalleAhorro = document.getElementById('detalleAhorro').value;
    if(number <= saldo && number > 0){
        ahorro += number;
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('sumarAhorros').value = 0;
        fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: "Ahorro",
            tipo: 'Aumento de ahorros',
            monto: "$"+number,
            detalle: detalleAhorro,
            estado: false,
        })
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
    detalleAhorroRetiro = document.getElementById('detalleAhorroRetiro').value;
    number = +document.getElementById('restarAhorros').value;
    if(number <= ahorro && number > 0){
        saldo += number;
        ahorro -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('restarAhorros').value = 0;
        fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: "Ahorro",
            tipo: 'Retiro de ahorros',
            monto: "$"+number,
            detalle: detalleAhorroRetiro,
            estado: false,
        })
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

document.getElementById('agregarBtn').onclick = function(e){
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

document.getElementById('agregarAhorroBtn').onclick = function(e){
    e.preventDefault()
    let ahorros = +document.getElementById('agregarAhorros').value;
    categoria = document.getElementById('tipoIngreso').value;
    detalleIngreso = document.getElementById('detalleIngreso').value;
    if(ahorros >= 0 && ahorros <= 100){
        ahorro += number * (ahorros/100);
        saldo += number - (number * (ahorros/100));
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('agregarAhorros').value = "";
        document.getElementById('agregarSaldo').value = "";
        document.getElementById('detalleIngreso').value = "";
        document.getElementById('agregarForm2').style.display= "none";
        fecha = generadorFecha();
        movimientos.unshift({
            fecha: fecha,
            categoria: categoria,
            tipo: 'Ingreso',
            monto: "$"+ (number - (number * (ahorros/100))),
            detalle: detalleIngreso,
            estado: false,
        })
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
        if (ahorros > 0){
            movimientos.unshift({
                fecha: fecha,
                categoria: "Ahorro",
                tipo: 'Ingreso',
                monto: "$"+ (number * (ahorros/100)),
                detalle: "Porcentaje de ahorro ingresado desde "+ categoria,
                estado: false,
            })
        }
        alertaExito() 
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