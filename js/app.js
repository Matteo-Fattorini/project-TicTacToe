/**
 * @title Tic Tac Toe Game
 * @author Matteo Fattorini
 * @date 03/11/2020
 */

//! VARIABILI
$(document).ready(function () {
  const playerOne = 0;
  const playerTwo = 1;
  var counter = 0;
  var gameOver = false;
  var boardBoxClassEl = $(".board-box");
  var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  var currentPlayer = playerOne;

  //! FUNZIONI
  let checker = (arr, target) => target.every((v) => arr.includes(v));
  /**
   * Funzione che serve per controllare la tabella e vedere se c'è un vincitore
   */
  function checkWinner() {
    winarrEcs = [];
    winarrCircle = [];
    for (var i = 0; i < boardBoxClassEl.length; i++) {
      if ($(boardBoxClassEl[i]).children().attr("class") != undefined) {
        if ($(boardBoxClassEl[i]).children().attr("class").includes("ecs")) {
          winarrEcs.push(i);
        } else if (
          $(boardBoxClassEl[i]).children().attr("class").includes("circle")
        ) {
          winarrCircle.push(i);
        }
      }
    }
    if (winarrEcs.length >= 3) {
      for (var i = 0; i < winCombos.length; i++) {
        if (checker(winarrEcs, winCombos[i])) {
          $(".title").text("HA VINTO GIOCATORE 1!");
          $(".info-text").text("R.I.P giocatore 2");
          $(".board").css("opacity", "0.4");
          gameOver = true;
        }
      }
    }
    if (winarrCircle.length >= 3) {
      for (var i = 0; i < winCombos.length; i++) {
        if (checker(winarrCircle, winCombos[i])) {
          $(".title").text("HA VINTO GIOCATORE 2!");
          $(".info-text").text("R.I.P giocatore 1");
          $(".board").css("opacity", "0.4");
          gameOver = true;
        }
      }
      
    }
  }

  //!fine funzioni

  //! Game Play
  boardBoxClassEl.click(function (event) {
    if (gameOver) {
      $(".info-text").text("Partita Finita, refresha per rigiocare!");
      $(".board").css("opacity", "0.4");
    } else {
      if (currentPlayer == playerOne) {
        counter += 1;
        if ($(this).children().length == 0) {
          $(".info-text").text("Vai giocatore due!");
          var ecsGen = document.createElement("i");
          ecsGen.className = "fa fa-times fa-10x ecs";
          $(this).append(ecsGen);
          currentPlayer = playerTwo;
        }
      } else {
        if ($(this).children().length == 0) {
          counter += 1;
          $(".info-text").text("Vai giocatore uno!");
          var circleGen = document.createElement("i");
          circleGen.className = "fa fa-circle fa-8x circle";
          $(this).append(circleGen);
          currentPlayer = playerOne;
        }
      }
      

      checkWinner();
      if (counter == 9) {
        gameOver = true;
      }
    }
  });

  $("#restart").click(function () {
    $(".board-box").empty();
    gameOver = false;
    $(".board").css("opacity", "1");
    counter = 0;
  });
});
