// IDEA DE PROYECTO FINAL: Aplicación que al ingresar tu sueldo te organiza la plata y te ayuda a ahorrar.
let tabla = document.getElementById('table');
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
}