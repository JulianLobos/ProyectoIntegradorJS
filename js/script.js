// IDEA DE PROYECTO FINAL: Aplicación que al ingresar tu sueldo te organiza la plata y te ayuda a ahorrar.
/*let tabla = document.getElementById('table');
// Login
ingreso = false;
menu = true;
let users = [
    {
        username: 'julian',
        password: 'lobos'
    },
    {
        username: 'baltazar',
        password: 'salomon'
    },
    {
        username: 'user',
        password: 'user'
    }
]

function login(){
    let username = prompt('Ingrese su usuario: ')
    let password = prompt('Ingrese su contraseña: ')
    console.log(users.some((el) => el.username === username && el.password === password));
    if(users.some((el) => el.username === username && el.password === password)){
        ingreso = true;
        alert('Bienvenido/a '+username+'!')
    }
}

function signUp(){
    let newUser = prompt('Ingrese su nuevo usuario: ');
    let newPass = prompt('Ingrese su nueva contraseña: ');
    users.unshift({
        username: newUser,
        password: newPass
    });
    alert('Usuario creado con éxito!');
}

while (menu){
    let inicio = parseInt(prompt('Elija una opción: \n 1. Iniciar Sesión \n 2. Crear nueva cuenta \n 3. Salir'))
    switch(inicio){
        case 1:
            login();
            menu = false;
            break;
        case 2:
            signUp();
            break;
        case 3:
            alert('Hasta luego!')
            menu = false;
            break;
    }
}

if (ingreso){
    let inicio = parseInt(prompt("Qué operación desea hacer?\n 1. Agregar dinero. \n 2. Retirar dinero. \n 3. Ver saldo \n 4. Ver ahorros \n 5. Agregar dinero en ahorros. \n 6. Quitar dinero de ahorros \n 7. Ver movimientos \n 8. Salir"));
    let saldo = 0;
    let ahorros = 0;
    let num = 0;

    // Agrego un array para llevar registro de los movimientos.
    const movimientos = [];

    function calc(porcentajeNum){
        ahorros += num * porcentajeNum;
        saldo -= num * porcentajeNum;
        fecha = Date();
        movimientos.push('✔ El '+fecha+' ingresó '+ (num - (num * porcentajeNum)) + ' pesos a su saldo.\n');
        movimientos.push('✔ El '+fecha+' ingresó '+ (num * porcentajeNum) + ' pesos a ahorros.\n');
        tabla.innerHTML += "<tr><td>"+fecha+"</td><td>Ingresó $"+ (num - (num * porcentajeNum)) +" pesos a su saldo y $" + (num * porcentajeNum) + " pesos a ahorros.</td></tr>"
    }
    while (inicio != 8){
        let fecha;
        let option = 0;
        let valor = 0;
        let porcentaje = true;
        switch(inicio){
            case 1:
                num = parseInt(prompt("Actualmente su saldo es de $" + saldo + " Pesos." + " Ingrese la cantidad de dinero que quiere ingresar: "));
                if (num > 0){
                    option = parseInt(prompt('Cuanto de ese dinero quiere destinar a los ahorros? \n 1. 10% \n 2. 20% \n 3. 30% \n 4. 40% \n 5. 50% \n 6. Otro Valor. \n 7. Salir'))
                    switch(option){
                        case 1:
                            calc(0.1);
                            break;
                        case 2:
                            calc(0.2);
                            break;
                        case 3:
                            calc(0.3);
                            break;
                        case 4:
                            calc(0.4);
                            break;
                        case 5:
                            calc(0.5);
                            break;
                        case 6:
                            while (porcentaje){
                                valor = parseInt(prompt('Que porcentaje de lo ingresado desea agregar a ahorros? '))
                                if (valor > 0 && valor <= 100){
                                    valor = valor / 100;
                                    calc(valor);
                                    porcentaje = false;
                                }else{
                                    alert("Por favor ingrese un valor entre 1 y 100.");
                                }
                            }
                            porcentaje = true;
                            break;
                        case 7:
                            break;
                    }
                    saldo += num;
                }else{
                    alert('Ingrese un valor.');
                }
                alert('Ahora su saldo disponible es de: $' + saldo + " Pesos.");
                break;
            case 2:
                num = parseInt(prompt("Cuánto dinero quiere retirar del saldo? \n Disponible para retirar: $"+ saldo + ' Pesos.'));
                if (num <= saldo && num > 0){
                    saldo -= num;
                    fecha = Date();
                    movimientos.push("✔ Retiró $" + num + " pesos de su saldo.\n");
                    tabla.innerHTML += "<tr><td>"+fecha+"</td><td>Retiró $"+num+" pesos de su saldo.</td></tr>";
                }else{
                    alert('Usted no tiene esa cantidad.');
                }
                break;

            case 3:
                alert("Su saldo disponible es: $"+ saldo);
                break;
            case 4:
                alert("Esto tiene en ahorros: $"+ ahorros);
                break;
            case 5:
                num = parseInt(prompt("Cuánto quiere ingresar a ahorros? \n Disponible: $" + saldo + " Pesos."));
                if (num <= saldo && num > 0){
                    ahorros += num;
                    saldo -= num;
                    fecha = Date();
                    movimientos.push('✔ Transfirió $' + num + ' pesos de su saldo hacia ahorros.\n');
                    tabla.innerHTML += "<tr><td>"+fecha+"</td><td>Transfirió $"+num+" pesos de su saldo hacia ahorros.</td></tr>";
                }else{
                    alert('Usted no tiene esa cantidad.');
                }
                break;
            case 6:
                num = parseInt(prompt('Cuanto dinero quiere sacar de ahorros? \n Disponible para retirar: $'+ ahorros + ' Pesos.'))
                if (num <= ahorros && num > 0){
                    saldo += num;
                    ahorros -= num;
                    fecha = Date();
                    movimientos.push('✔ Transfirió $' + num + ' pesos de ahorros hacia su saldo.\n');
                    tabla.innerHTML += "<tr><td>"+fecha+"</td><td>Transfirió $"+num+" pesos de sus ahorros hacia saldo.</td></tr>";
                }else{
                    alert('Usted no tiene esa cantidad en ahorros.');
                }
                break;
            
            case 7:
                alert(movimientos);
            case 8:
                break;
        }
        inicio = parseInt(prompt("Qué operación desea hacer?\n 1. Agregar dinero. \n 2. Retirar dinero. \n 3. Ver saldo \n 4. Ver ahorros \n 5. Agregar dinero en ahorros. \n 6. Quitar dinero de ahorros \n 7. Ver movimientos \n 8. Salir"));
    }
}*/

let saldoHtml = document.getElementById('saldo');
let ahorroHtml = document.getElementById('ahorros')
let tabla = document.getElementById('table');
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