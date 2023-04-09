const tablero = [["", "", ""], ["", "", ""], ["", "", ""]];

let jugadorActual = "X";
let turnosJugador1 = 3;
let turnosJugador2 = 3;


const cambiarVentas = (id) => {

    let pantallas = document.querySelectorAll(".pantalla");
    let idPantalla = document.getElementById(id);

    for (let i = 0; i < pantallas.length; i++) {

        pantallas[i].classList.add("none");
    }

    idPantalla.classList.remove("none");
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

    const nombreJugador1 = document.getElementById("nombreJugador1").value;
    const nombreJugador2 = document.getElementById("nombreJugador2").value;

    if (nombreJugador1 == "" && nombreJugador2 == "") {
        document.querySelector(".boton").disabled = true;
    } else {
        document.querySelector(".boton").disabled = false;
    }

    place1 = document.getElementById("host1").innerHTML = nombreJugador1;
    place2 = document.getElementById("host2").innerHTML = nombreJugador2;
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

// const colocarFichas = (id, fila, columna) => {

//     const casillaTablero = document.querySelector(id);
//     let infoTurnosJugador = informacionTurnosJugadores();
//     let comprobar = comprobarPosicionGanadora();

//     if (infoTurnosJugador > 0) {

//         if (casillaTablero.innerHTML == "" && casillaTablero.innerHTML !== jugadorActual) {

//             comprobarPosicionGanadora();
//             casillaTablero.innerHTML = jugadorActual;
//             tablero[fila][columna] = jugadorActual;
//             // makeAIMove();

//             if (comprobar) {
//                 alert('Ha ganado')
//             }

//             turnosJugadores();
//         }

//         jugadorActual == "X" ? (jugadorActual = "O") : (jugadorActual = "X");

//     } else {

//         if (casillaTablero.innerHTML !== "" && casillaTablero.innerHTML == jugadorActual) {

//             casillaTablero.innerHTML = "";
//             turnosJugadores();
//         }
//     }

    
// };

const movementia = (id, row, colum) => {

    const casillaTablero = document.querySelector(id);
    let infoplayer = informacionTurnosJugadores();
    if (infoplayer > 0) {
      if (
        casillaTablero.innerHTML == "" &&
        casillaTablero.innerHTML !== jugadorActual
      ) {
        casillaTablero.innerHTML = jugadorActual;
        tablero[row][colum] = jugadorActual;
        let check = comprobarPosicionGanadora();

       
        generateRandomPosition();
        if (check) {
          alert(`ganador `);
          return;
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
  };

const contadorTurnos = () => {

    document.getElementById("contadorJugador1").innerHTML = turnosJugador1;
    document.getElementById("contadorJugador2").innerHTML = turnosJugador2;

};






const generateRandomPosition = () => {
    if(turnosJugador2>0)
    {const chipMovement = document.querySelectorAll(".yellow");
    const na = [];
    let row, col;
    for (let i = 0; i < chipMovement.length; i++) {
      na.push(chipMovement[i]);
    }
    let twoDimensionalArr = [];
    for (let i = 0; i < 3; i++) {
      twoDimensionalArr.push(na.slice(i * 3, (i + 1) * 3));
    }
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (tablero[row][col] !== "");
    tablero[row][col] = "O";
    twoDimensionalArr[row][col].innerHTML = "O";
    turnosJugador2--;
    }
    else{
      const chipMovement = document.querySelectorAll(".yellow");
      const na = [];
      let row, col;
      for (let i = 0; i < chipMovement.length; i++) {
        na.push(chipMovement[i]);
      }
      let twoDimensionalArr = [];
      for (let i = 0; i < 3; i++) {
        twoDimensionalArr.push(na.slice(i * 3, (i + 1) * 3));
      }
    console.log(twoDimensionalArr)
      do {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
      } while (tablero[row][col] !== "O");
      tablero[row][col] = "";
      twoDimensionalArr[row][col].innerHTML = "";
      turnosJugador2++
    generateRandomPosition()
    }
  }







