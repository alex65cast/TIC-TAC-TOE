const tablero = [["", "", ""], ["", "", ""], ["", "", ""]];

let jugadorActual = "X";
let turnosJugador1 = 3;
let turnosJugador2 = 3;
let nombreJugador1;
let nombreJugador2;


const cambiarVentas = (id) => {

    let pantallas = document.querySelectorAll(".pantalla");
    let idPantalla = document.getElementById(id);

    for (let i = 0; i < pantallas.length; i++) {

        pantallas[i].classList.add("none");
    }

    idPantalla.classList.remove("none");

    limpiar();
};



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


const nombreJugadores = () => {

    nombreJugador1 = document.querySelector("#jugador1").value;
    nombreJugador2 = document.querySelector("#jugador2").value;

    document.getElementById("nJugador1").innerHTML = nombreJugador1;
    document.getElementById("nJugador2").innerHTML = nombreJugador2;
};

const contadorTurnos = () => {

  document.getElementById("contadorJugador1").innerHTML = turnosJugador1;
  document.getElementById("contadorJugador2").innerHTML = turnosJugador2;

};

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


const informacionTurnosJugadores = () => {

    if (jugadorActual == "X") {

        return turnosJugador1;
    }
    else {

        return turnosJugador2;
    }
};

const cpuSeleccionada = () =>{

  const checkbox = document.querySelector('#vsCPU');
  if (checkbox.checked) {
    console.log('El checkbox está marcado');
    return true;
  } else {
    return false;
    console.log('El checkbox no está marcado');
    
  }

}

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
          let check = comprobarPosicionGanadora();
          setTimeout(()=>{generateRandomPosition()},500);
  
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
      } else {
        if (
          casillaTablero.innerHTML !== "" &&
          casillaTablero.innerHTML == jugadorActual
        ) {
          casillaTablero.innerHTML = "";
          turnosJugadores();
        }
      }


    }

    
};

const generateRandomPosition = () => {
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
        filas = Math.floor(Math.random() * 3);
        columnas = Math.floor(Math.random() * 3);
      } while (tablero[filas][columnas] !== "");
      tablero[filas][columnas] = "O";
      arrayBidimensional[filas][columnas].innerHTML = "O";
      turnosJugador2--;
    }
    else{
      for (let i = 0; i < casillaTablero.length; i++) {
        arayNuevo.push(casillaTablero[i]);
      }
      let arrayBidimensional = [];
      for (let i = 0; i < 3; i++) {
        arrayBidimensional.push(arayNuevo.slice(i * 3, (i + 1) * 3));
      }
    console.log(arrayBidimensional)
      do {
        filas = Math.floor(Math.random() * 3);
        columnas = Math.floor(Math.random() * 3);
      } while (tablero[filas][columnas] !== "O");
      tablero[filas][columnas] = "";
      arrayBidimensional[filas][columnas].innerHTML = "";
      turnosJugador2++
    generateRandomPosition()
    }
  }

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





