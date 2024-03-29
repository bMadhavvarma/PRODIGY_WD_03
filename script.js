document.addEventListener("DOMContentLoaded", function () {
  let boxes = document.querySelectorAll(".box");
  let restartBtn = document.querySelector(".restart-btn");
  let turno = true; 
  const winpatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
  ];

  function display(id) {
      document.querySelectorAll(".container, .winpage").forEach((element) => {
          if (element.id === id) {
              element.style.display = "block";
          } else {
              element.style.display = "none";
          }
      });
  }
  display("sectiongame");

  document.querySelector(".start").addEventListener("click", function () {
      display("sectiongame");
  });

  function checkWinner() {
      for (let pattern of winpatterns) {
          let pos1 = boxes[pattern[0] - 1].innerText;
          let pos2 = boxes[pattern[1] - 1].innerText;
          let pos3 = boxes[pattern[2] - 1].innerText;
          if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
              if (pos1 === pos2 && pos2 === pos3) {
                  document.getElementById("win-message").innerHTML = "Congratulations " + pos1 + "! You win!";
                  document.getElementById("winning-image").style.display = "block"; 
                  document.getElementById("draw-image").style.display = "none"; 
                  return true;
              }
          }
      }
      return false;
  }

  function checkDraw() {
      for (let box of boxes) {
          if (box.innerText === "") {
              return false;
          }
      }
      return true;
  }

  boxes.forEach((box) => {
      box.addEventListener("click", () => {
          if (!box.textContent.trim()) {
              if (turno) {
                  box.innerHTML = "X";
                  turno = false;
              } else {
                  box.innerHTML = "O";
                  turno = true;
              }
              box.disabled = true;
              if (checkWinner()) {
                  display("winningpage");
              } else if (checkDraw()) {
                  document.getElementById("win-message").innerHTML = "It's a draw!";
                  document.getElementById("winning-image").style.display = "none"; 
                  document.getElementById("draw-image").style.display = "block"; 
                  display("winningpage");
              }
          }
      });
  });

  restartBtn.addEventListener("click", function () {
      turno = true; 
      boxes.forEach((box) => {
          box.innerHTML = "";
          box.disabled = false;
      });
      display("sectiongame");
  });

  document.querySelector(".winpage .start").addEventListener("click", function () {
      turno = true;
      boxes.forEach((box) => {
          box.innerHTML = "";
          box.disabled = false;
      });
      display("sectiongame");
  });
});
