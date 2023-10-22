let sqrs = document.querySelectorAll(".sqrs");
//Get all the squares one by one
let sqr1 = document.getElementById("1");
let sqr2 = document.getElementById("2");
let sqr3 = document.getElementById("3");
let sqr4 = document.getElementById("4");
let sqr5 = document.getElementById("5");
let sqr6 = document.getElementById("6");
let sqr7 = document.getElementById("7");
let sqr8 = document.getElementById("8");
let sqr9 = document.getElementById("9");
let player1Name = "";
let player2Name = "";
let selectedSquares = [];
let formSect = document.querySelector(".form-sect");
let gameboard = document.querySelector(".game-board");
let formEl = document.querySelector("form");
let displayInfo = document.querySelector(".display-info");

//Player object
//Takes in every instance of a player
//Controls the flow, checks win and most of the game fundamentals

const Player = (player) => {
  //Initialize type of player so we can use later to locate the current player and change turns.
  let playerNumber = player;

  //Change turn function changes the current player to another player after each move.

  changeTurn = function () {
    if (playerNumber == "player1") {
      playerNumber = "player2";
    } else if (playerNumber == "player2") {
      playerNumber = "player1";
    }
  };

  /*     ==============form el====================
   */

  //Main function and most important
  //Keeps track of everything that goes in on the game board and responds accordingly

  gameData = function () {
    //console.log(playerNumber);

    sqrs.forEach((sqr) => {
      sqr.addEventListener("click", () => {
        sqr.classList.add("selected");
        selectedSquares.push(sqr.id);
        //Changes sign on the squares when clicked, to  either X or O
        if (playerNumber == "player1") {
          sqr.innerHTML = "X";

          if (checkWin() === "X") {
            displayInfo.style.display = "block";
            gameboard.style.display = "none";
            displayInfo.innerHTML += `
            <div class="display"><h2> ${player1Name} has won</h2>
            <button class="restart">Restart</button>
            </div>
            
            `;

            //Restart button

            document.querySelector(".restart").addEventListener("click", () => {
              location.reload();
            });
          } else if (selectedSquares.length == 9 && checkWin() == false) {
            displayInfo.style.display = "block";
            gameboard.style.display = "none";
            displayInfo.innerHTML += `<div class="display">
            <h2> It is a draw!</h2>
            <button class="restart">Restart</button>
            </div>`;

            //Restart button

            document.querySelector(".restart").addEventListener("click", () => {
              location.reload();
            });
          }

          changeTurn();
        } else if (playerNumber == "player2") {
          sqr.innerHTML = "O";
          if (checkWin() === "O") {
            displayInfo.style.display = "block";
            gameboard.style.display = "none";
            displayInfo.innerHTML += `<div class="display">
            <h2> ${player2Name} has won</h2>
            <button class="restart">Restart</button>
            </div>`;

            //Restart button

            document.querySelector(".restart").addEventListener("click", () => {
              location.reload();
            });
          } else if (selectedSquares.length == 9 && checkWin() == false) {
            displayInfo.style.display = "block";
            gameboard.style.display = "none";
            displayInfo.innerHTML += `<div class="display"><h2> It is a draw!</h2>
             <button class="restart">Restart</button>
            </div>`;

            //Restart button

            document.querySelector(".restart").addEventListener("click", () => {
              location.reload();
            });
          }

          changeTurn();
        }
      });
    });
  };

  return { gameData };
};

//This checkWin function displays relevant message if either of the players win or there is a draw.
//It is invoked in the ReadScore function when it is either true or false

const checkWin = () => {
  if (sqr1.innerHTML == sqr2.innerHTML && sqr2.innerHTML == sqr3.innerHTML) {
    return sqr1.innerHTML;
  }
  if (sqr1.innerHTML == sqr4.innerHTML && sqr4.innerHTML == sqr7.innerHTML) {
    return sqr1.innerHTML;
  }
  if (sqr1.innerHTML == sqr5.innerHTML && sqr5.innerHTML == sqr9.innerHTML) {
    return sqr1.innerHTML;
  }
  if (sqr2.innerHTML == sqr5.innerHTML && sqr5.innerHTML == sqr8.innerHTML) {
    return sqr2.innerHTML;
  }
  if (sqr3.innerHTML == sqr6.innerHTML && sqr6.innerHTML == sqr9.innerHTML) {
    return sqr3.innerHTML;
  }
  if (sqr3.innerHTML == sqr5.innerHTML && sqr5.innerHTML == sqr7.innerHTML) {
    return sqr3.innerHTML;
  }
  if (sqr4.innerHTML == sqr5.innerHTML && sqr5.innerHTML == sqr6.innerHTML) {
    return sqr4.innerHTML;
  }
  if (sqr7.innerHTML == sqr8.innerHTML && sqr8.innerHTML == sqr9.innerHTML) {
    return sqr7.innerHTML;
  }

  //If all of the above conditions are not met, then the game continues or a draw  is displayed

  return false;
};

/* ==========================Form info================= */

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;
  console.log(player1Name);

  //Random player to start

  let randomNumber = Math.round(Math.random() * 1);
  let selectedPlayer = "";
  randomNumber == 0
    ? (selectedPlayer = "player1")
    : (selectedPlayer = "player2");

  formSect.style.display = "none";
  displayInfo.style.display = "block";

  selectedPlayer === "player1"
    ? (displayInfo.innerHTML = `<div class="display"><h2>${player1Name} to start</h2></div>`)
    : (displayInfo.innerHTML = `<div class="display"><h2>${player2Name} to start</h2></div>`);

  setTimeout(function () {
    displayInfo.innerHTML = "";
    displayInfo.style.display = "none";
    gameboard.style.display = "grid";
  }, 1500);

  let player = Player(selectedPlayer);
  player.gameData();
});
