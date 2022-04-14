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
let movimientos = [];

function ultMovimientos(){
    movimientos.forEach(element => 
        tabla.innerHTML += "<tr><td>" + element.fecha + "</td><td>"+ element.movimiento +"</td></tr>");
}

function retirar(){
    number = +document.getElementById('retirarSaldo').value;
    if(number <= saldo && number > 0){
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        document.getElementById('retirarSaldo').value = 0;
        fecha = Date();
        movimientos.unshift({
            fecha: fecha,
            movimiento: "Retiró $"+ number +" pesos de su saldo."
        })
        document.getElementById('mensajeError3').style.display= "none";
        document.getElementById('retirarSaldo').style.border= "unset"
    }else{
        document.getElementById('mensajeError3').style.display= "flex";
        document.getElementById('retirarSaldo').style.border= "3px solid red"
    }
}

function ahorros(){
    number = +document.getElementById('sumarAhorros').value;
    if(number <= saldo && number >= 0){
        ahorro += number;
        saldo -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('sumarAhorros').value = 0;
        fecha = Date();
        movimientos.unshift({
            fecha: fecha,
            movimiento: "Transfirió $"+ number +" pesos de su saldo a ahorros."
        })
        document.getElementById('mensajeError4').style.display= "none";
        document.getElementById('sumarAhorros').style.border= "unset"
    }else{
        document.getElementById('mensajeError4').style.display= "flex";
        document.getElementById('sumarAhorros').style.border= "3px solid red"
    }
}

function restarAhorros(){
    number = +document.getElementById('restarAhorros').value;
    if(number <= ahorro && number > 0){
        saldo += number;
        ahorro -= number;
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('restarAhorros').value = 0;
        fecha = Date();
        movimientos.unshift({
            fecha: fecha,
            movimiento: "Transfirió $"+ number +" pesos de sus ahorros a saldo."
        })
        document.getElementById('mensajeError5').style.display= "none";
        document.getElementById('restarAhorros').style.border= "unset"
    }else{
        document.getElementById('mensajeError5').style.display= "flex";
        document.getElementById('restarAhorros').style.border= "3px solid red"
    }
}

function mostrarDiv(num){
    document.getElementById('div1').style.display='none';
    document.getElementById('div2').style.display='none';
    document.getElementById('div3').style.display='none';
    document.getElementById('div4').style.display='none';
    document.getElementById('div5').style.display='none';
    document.getElementById('div'+num).style.display='flex'
    if(num == 5){
        tabla.innerHTML = "";
        tabla.innerHTML += "<tr><th>Fecha</th><th>Movimiento</th></tr>"
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
        document.getElementById('agregarSaldo').style.border= "unset"
    }else{
        document.getElementById('agregarForm2').style.display= "none";
        document.getElementById('mensajeError').style.display= "flex";
        document.getElementById('agregarSaldo').style.border= "3px solid red"
    }
}

document.getElementById('agregarAhorroBtn').onclick = function(e){
    e.preventDefault()
    let ahorros = +document.getElementById('agregarAhorros').value;
    if(ahorros >= 0 && ahorros <= 100){
        ahorro += number * (ahorros/100);
        saldo += number - (number * (ahorros/100));
        saldoHtml.innerHTML = saldo;
        ahorroHtml.innerHTML = ahorro;
        document.getElementById('agregarAhorros').value = 0;
        document.getElementById('agregarSaldo').value = 0;
        document.getElementById('agregarForm2').style.display= "none";
        fecha = Date();
        movimientos.unshift({
            fecha: fecha,
            movimiento: "Depositó $"+ (number - (number * (ahorros/100))) +" pesos en su saldo y $"+ (number * (ahorros/100))+" pesos en ahorros"
        })        
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