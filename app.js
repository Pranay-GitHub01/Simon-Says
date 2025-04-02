let btns = ["btn1", "btn2", "btn3", "btn4"];
let gameSeq = [];
let userSeq = [];

/*   xxxxxxxxxxxxxxxxxxxxxxxxxxx          step 1 : start the game, by pressing any key over the document .....     xxxxxxxxxxxxxxxxxxxxxxxxxx */
let started = false;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started...");
    started = true;
    //calling this levelup function when game is started ....
    levelup();
  }
});

/*xxxxxxxxxxxxxxxxxxxxx          step 2 : on pressing any coloured button we have to flash it , and level value gets updated to h2      xxxxxxxxxxxxxxxxxxxxxxxxxx              */

let h2 = document.querySelector("h2");
let level = 0;

/*   _________________________________"level up"    this is for game/computer  sequence__________________________________________                        */

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level : ${level}`;

  let rndIdx = Math.floor(Math.random() * 4);
  let rndClr = btns[rndIdx];
  let rndBtn = document.querySelector(`.${rndClr}`);
  gameSeq.push(rndClr);
  console.log("game seq", gameSeq);
  gameFlash(rndBtn);
}

/*_________________________________creating button gameFlash & userFlash... adding a flash class to it _________________________________________________________________________*/
function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");

  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

/* xxxxxxxxxxxxxxxxxxxxxxxxxx               STEP 3 : Tackling gameSeq and userSeq            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx    */

// user part

function btnPress() {
  let btn = this;

  // flashing the button when it was clicked...
  userFlash(btn);
  userColour = btn.getAttribute("id");
  console.log("userColour", userColour);
  userSeq.push(userColour);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(`.btn`);
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 150);
    }
  } else {
    h2.innerHTML = `Game over !!<br><b> Score : ${level}<b> <br>Press any key to Start `;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor=" rgb(157, 255, 255)";
    }, 150);
    reset();
  }
}

function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
}
