// IDEA DE PROYECTO FINAL: Aplicación que al ingresar tu sueldo te organiza la plata y te ayuda a ahorrar.
let inicio = parseInt(prompt("Qué operación desea hacer?\n 1. Agregar dinero. \n 2. Retirar dinero. \n 3. Ver saldo \n 4. Ver ahorros \n 5. Agregar dinero en ahorros. \n 6. Quitar dinero de ahorros \n 7. Salir"))

let saldo = 0
let ahorros = 0
while (inicio != 7){
    let num = 0
    let option = 0
    let valor = 0
    let porcentaje = true
    function calc(porcentajeNum){
        ahorros += num * porcentajeNum;
        saldo -= num * porcentajeNum;
    }
    switch(inicio){
        case 1:
            num = parseInt(prompt("Actualmente su saldo es de " + saldo + " Pesos." + " Ingrese la cantidad de dinero que quiere ingresar: "));
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
                                porcentaje = false
                            }else{
                                alert("Por favor ingrese un valor entre 1 y 100.")
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
            alert('Ahora su saldo disponible es de: ' + saldo + " Pesos.")
            break;
        case 2:
            num = parseInt(prompt("Cuánto dinero quiere retirar del saldo? \n Disponible para retirar: "+ saldo + ' Pesos.'));
            if (num <= saldo && num > 0){
                saldo -= num;
            }else{
                alert('Usted no tiene esa cantidad.')
            }
            break;

        case 3:
            alert("Su saldo disponible es: "+ saldo);
            break;
        case 4:
            alert("Esto tiene en ahorros: "+ ahorros);
            break;
        case 5:
            num = parseInt(prompt("Cuánto quiere ingresar a ahorros? \n Disponible: " + saldo + " Pesos."));
            if (num <= saldo && num > 0){
                ahorros += num;
                saldo -= num;
            }else{
                alert('Usted no tiene esa cantidad.')
            }
            break;
        case 6:
            num = parseInt(prompt('Cuanto dinero quiere sacar de ahorros? \n Disponible para retirar: '+ ahorros + ' Pesos.'))
            if (num <= ahorros && num > 0){
                saldo += num;
                ahorros -= num;
            }else{
                alert('Usted no tiene esa cantidad en ahorros.')
            }
            break
        case 7:
            break
    }
    inicio = parseInt(prompt("Qué operación desea hacer?\n 1. Agregar dinero. \n 2. Retirar dinero. \n 3. Ver saldo \n 4. Ver ahorros \n 5. Agregar dinero en ahorros. \n 6. Quitar dinero de ahorros \n 7. Salir"))
}
