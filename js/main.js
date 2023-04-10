// Declaración de variables y el tablero que contendrá nuestas fichas
const tablero = [["", "", ""], ["", "", ""], ["", "", ""]];

let jugadorActual = "X";
let turnosJugador1 = 3;
let turnosJugador2 = 3;
let nombreJugador1;
let nombreJugador2;

// Funcion que cambia de ventas cada vez que pulsamos un boton o ganamos la partida como es el caso de la última ventana
const cambiarVentanas = (id) => {

    let pantallas = document.querySelectorAll(".pantalla");
    let idPantalla = document.getElementById(id);

    for (let i = 0; i < pantallas.length; i++) {

        pantallas[i].classList.add("none");
    }

    idPantalla.classList.remove("none");

    limpiar();
};

// Funcion que se encanga de recoger los nombres de los inputs y sacarlos a la siguiente ventana
const nombreJugadores = () => {

  nombreJugador1 = document.querySelector("#jugador1").value;
  nombreJugador2 = document.querySelector("#jugador2").value;

  document.getElementById("nJugador1").innerHTML = nombreJugador1;
  document.getElementById("nJugador2").innerHTML = nombreJugador2;
};

// Esta funcion recogerá si el checkbox está seleecionado o no para saber si jugamos contra la CPU
const cpuSeleccionada = () =>{

  const checkbox = document.querySelector('#vsCPU');
  if (checkbox.checked) {

    return true;
  } 
  else {

    return false;
  }

}

// Funcion que comprueba dentro de la array las combinaciones ganadoras
const comprobarPosicionGanadora = () => {

    for (let i = 0; i < tablero.length; i++) {

        if (tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {

            return tablero[i[0]];
        }

        if (tablero[0][i] && tablero[0][i] === tablero[1][i] && tablero[0][i] === tablero[2][i]) {

            return tablero[0][i];
        }

    }
    if (tablero[0][0] && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) {

        return tablero[0][0];
    }

    if (tablero[0][2] && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0]) {

        return tablero[0][2];
    }

    return null;
};

// Funcion que recoge los turnos segun quien es el jugador que esta jugando y resta y suma según coloque
const turnosJugadores = () => {

    if (jugadorActual == "X") {

        if (turnosJugador1 > 0) {
            turnosJugador1--;

        } else {
            turnosJugador1++;

        }
    }

    if (jugadorActual == "O") {

        if (turnosJugador2 > 0) {

            turnosJugador2--;
        }
        else {

            turnosJugador2++;
        }
    }

    contadorTurnos();
};

// Recoge los turnos de los jugadores y los imprime por pantalla
const contadorTurnos = () => {

  document.getElementById("contadorJugador1").innerHTML = turnosJugador1;
  document.getElementById("contadorJugador2").innerHTML = turnosJugador2;

};

// Funcion que nos permite saber cuantos turnos tiene cada jugador en la partida
const informacionTurnosJugadores = () => {

    if (jugadorActual == "X") {

        return turnosJugador1;
    }
    else {

        return turnosJugador2;
    }
};

// Funcion que colocará fichas de los jugadores, si no seleccionamos el checkbox jugaremos nosotros solos como podemos ver en las comprobaciones de los IFs
const colocarFichas = (id, fila, columna) => {
    const casillaTablero = document.querySelector(id);
    let infoTurnosJugador = informacionTurnosJugadores();
    let comprobar = comprobarPosicionGanadora();

    let seleccionadoCPU = cpuSeleccionada();
    console.log(seleccionadoCPU);

    if(seleccionadoCPU == false){
      
      if (infoTurnosJugador > 0) {

        if (casillaTablero.innerHTML == "" && casillaTablero.innerHTML !== jugadorActual) {

            comprobarPosicionGanadora();
            casillaTablero.innerHTML = jugadorActual;
            tablero[fila][columna] = jugadorActual;
            let check = comprobarPosicionGanadora();

            if (check) {
              document.querySelector("#pantalla3").classList.add("none");
              document.querySelector("#pantalla4").classList.remove("none");
    
              if(check == "X"){
                document.querySelector("#ganador").innerHTML = nombreJugador1;
              }
              else{
                document.querySelector("#ganador").innerHTML = nombreJugador2;
              }
            }

            turnosJugadores();
        }

        jugadorActual == "X" ? (jugadorActual = "O") : (jugadorActual = "X");

    } 
      else {

          if (casillaTablero.innerHTML !== "" && casillaTablero.innerHTML == jugadorActual) {

              casillaTablero.innerHTML = "";
              turnosJugadores();
          }
      }

    }

    if(seleccionadoCPU==true){

      if (infoTurnosJugador > 0) {

        if (casillaTablero.innerHTML == "" && casillaTablero.innerHTML !== jugadorActual) {

          casillaTablero.innerHTML = jugadorActual;
          tablero[fila][columna] = jugadorActual;

          let ganar = comprobarPosicionGanadora();
          setTimeout(()=>{colocarFichaRandom()},500);

          comprobarPosicionGanadora();

          if (ganar) {

            document.querySelector("#pantalla3").classList.add("none");
            document.querySelector("#pantalla4").classList.remove("none");
  
            if(ganar == "X"){

              document.querySelector("#ganador").innerHTML = nombreJugador1;
            }
            else{
              
              document.querySelector("#ganador").innerHTML = nombreJugador2;
            }
          }
          
          turnosJugadores();
        }
      } 
      
      else {

        if (casillaTablero.innerHTML !== "" && casillaTablero.innerHTML == jugadorActual) {

          casillaTablero.innerHTML = "";
          turnosJugadores();
        }
      }

    }
};

// Funcion que se usa para la IA ya que la llamaremos con la CPU para que coloque fichas de manera aleatoria por el tablero
const colocarFichaRandom = () => {

  const casillaTablero = document.querySelectorAll(".fichas");
  const arayNuevo = [];
  let arrayBidimensional = [];
  let filas;
  let columnas;

    if(turnosJugador2>0){

        for (let i = 0; i < casillaTablero.length; i++) {

          arayNuevo.push(casillaTablero[i]);
        }

        for (let i = 0; i < 3; i++) {

          arrayBidimensional.push(arayNuevo.slice(i * 3, (i + 1) * 3));
        }
        do {

          filas = Math.round(Math.random() * 3);
          columnas = Math.round(Math.random() * 3);
        } while (tablero[filas][columnas] !== "");

        tablero[filas][columnas] = "O";
        arrayBidimensional[filas][columnas].innerHTML = "O";
        turnosJugador2--;
    }

    else{

        for (let i = 0; i < casillaTablero.length; i++) {
          
          arayNuevo.push(casillaTablero[i]);
        }

        for (let i = 0; i < 3; i++) {
          arrayBidimensional.push(arayNuevo.slice(i * 3, (i + 1) * 3));
        }
        do {

          filas = Math.floor(Math.random() * 3);
          columnas = Math.floor(Math.random() * 3);
        } while (tablero[filas][columnas] !== "O");

        tablero[filas][columnas] = "";
        arrayBidimensional[filas][columnas].innerHTML = "";
        turnosJugador2++
        colocarFichaRandom()
    }
  }

  // Por ultimo, la funcion de limpiar, que se usará al final de la partida para volver atrás y que nos limpie todo el tablero y el array de datos
const limpiar = ()=>{

  turnosJugador1 = 3;
  turnosJugador2 = 3;
  
  let borrar = document.querySelectorAll(".fichas");

  borrar.forEach((e)=>{

    e.innerHTML = "";
  });

  for (let i = 0; i < tablero.length; i++) {
    
    for (let x = 0; x < tablero.length; x++) {

        tablero[i][x] = "";
    }
    
  }
  contadorTurnos();
};





