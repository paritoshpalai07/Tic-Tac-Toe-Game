let player1_turn = true;
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let count = 0;
let newGameBtn1 = document.querySelector(".newbtn1");
let newGameBtn2 = document.querySelector(".newbtn2");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player1_turn) {
      //playerO
      box.innerText = "O";
      player1_turn = false;
      box.style.color = "#3398db";
      box.style.fontSize = "133px";
    } else {
      //playerX
      box.innerText = "X";
      player1_turn = true;
      box.style.color = "#43d587";
      box.style.fontSize = "133px";
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}\nChal Aata Party De`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);

        return true;
      }
    }
  }
};

const resetGame = () => {
  player1_turn = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
newGameBtn1.addEventListener("click", resetGame);
newGameBtn2.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
