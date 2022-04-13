//Selecciona todos las celdas del HTML creadas
let cells = Array.prototype.slice.apply(document.querySelectorAll(".cell"));

//Se crea el array con 9 pocisiones
let array = new Array(9);

// variables para manipular el DOM
let pX = document.getElementById("playerUno");
let pO = document.getElementById("playerDos");
let tX = document.getElementById("turnX");
let tO = document.getElementById("turnO");
let wX = document.getElementById("winsX");
let wO = document.getElementById("winsO");

let turn = 1;
let winner = false;
let modal = document.getElementById("modal");
let btnClose = document.getElementById("close");
let btnReset = document.getElementById("reset");
let result = document.getElementById("result");

//Iconos para cada turno de juego
let iconX = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill: rgb(24, 91, 129);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>`;
let iconO = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>`;

//funcion para asignar turno al jugador 1 y 2
const setTurno = (turn) => {
  if (winner === false) {
    if (turn === 1 || turn === 3 || turn === 5 || turn === 7 || turn === 9) {
      tX.style.visibility = "visible";
      tO.style.visibility = "hidden";
      pX.classList.add("actual");
      pO.classList.remove("actual");
    } else {
      tO.style.visibility = "visible";
      tX.style.visibility = "hidden";
      pO.classList.add("actual");
      pX.classList.remove("actual");
    }
  }
};

//funcion para verificar quien fue el ganador
const setWinner = (index, letter) => {
  array[index] = letter;
  if (
    (array[0] === letter && array[1] === letter && array[2] === letter) ||
    (array[3] === letter && array[4] === letter && array[5] === letter) ||
    (array[6] === letter && array[7] === letter && array[8] === letter) ||
    (array[0] === letter && array[3] === letter && array[6] === letter) ||
    (array[1] === letter && array[4] === letter && array[7] === letter) ||
    (array[2] === letter && array[5] === letter && array[8] === letter) ||
    (array[0] === letter && array[4] === letter && array[8] === letter) ||
    (array[2] === letter && array[4] === letter && array[6] === letter)
  ) {
    winner = true;
    modal.style.display = "block";

    //optenemos el nombre del competidos para asignar al modal de ganador
    const name_ganador = document.getElementById("oponente_name").innerHTML;
    letter === "X"
      ? (result.innerHTML = `Ganador ${name_ganador}`)
      : (result.innerHTML = `Ganador Maquina`);

    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", tresEnRaya);
    }
  }
};

//mostrar el icono en donde se dio el click
const tresEnRaya = (e) => {
  let indexCell = cells.indexOf(e.target);
  if (turn % 2 === 1) {
    cells[indexCell].innerHTML = iconX;
    setWinner(indexCell, "X");
  } else {
    cells[indexCell].innerHTML = iconO;
    setWinner(indexCell, "O");
  }
  cells[indexCell].removeEventListener("click", tresEnRaya);
  if (turn === 9 && winner === false) {
    modal.style.display = "block";
    result.innerHTML = "Empate";
  } else {
    turn++;
    setTurno(turn);
  }
};

//funcion para cada iteracion del juego
const ready = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", tresEnRaya);
  }
  btnReset.addEventListener("click", reset);
  btnClose.addEventListener("click", closeModal);
  setTurno(turn);
};

//funcion para limpiar las celdas
const reset = () => {
  for (let i = 0; i < cells.length; i++) {
    array[i] = "";
    cells[i].innerHTML = "";
  }
  turn = 1;
  winner = false;
  ready();
};

//funcion para cerrar el modal
const closeModal = () => {
  modal.style.display = "none";
};

window.addEventListener("load", ready);
