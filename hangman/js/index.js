import { hintsAndAnswers } from "./hints_and_answers.js";

window.onload = function(){
  document.body.prepend(generatePage(true));
  console.log("Dear User, please change the language to English. Also your layout should be QWERTY. Good luck!");
}

let arr = hintsAndAnswers.slice();

const generatePage = (isReload) => {

  document.body.classList.remove("disable-scroll");
  //wrapper
  let wrapperMain = document.createElement("div");

  //main
  let mainElement = document.createElement("main");

  //title
  let titleOfPage = document.createElement("h1");
  titleOfPage.innerText = "Hangman";

  //container
  let container = document.createElement("div");
  //\\-------------------------------------------------Children-of-container
  //gallows
  let gallows = document.createElement("div");

  //\\------------------------------------------Children-of-gallows

  //gallows__top-element
  let gallowsTopElement = document.createElement("div");

  //gallows__left-element
  let gallowsLeftElement = document.createElement("div");
  
  //gallows__right-element
  let gallowsRightElement = document.createElement("div");

  //head
  let headOfHangman = document.createElement("div");

  //upper-body
  let upperBody = document.createElement("div");

  //\\---------------------------------Children-of-upperBody
  //upperBodyLeftArm
  let upperBodyLeftArm = document.createElement("div");

  //torso
  let torso = document.createElement("div");

  //upperBodyRightArm
  let upperBodyRightArm = document.createElement("div");

  //\\---------------------------------
  //lower-body
  let lowerBody = document.createElement("div");

  //\\---------------------------------Children-of-lower-body
  //left leg
  let leftLeg = document.createElement("div");

  //right leg
  let rightLeg = document.createElement("div");

  //\\----------------------------------
  //bottom-element
  let gallowsBottomElement = document.createElement("div");
  //\\-------------------------------------------------------
  //interactive-part
  let interactivePart = document.createElement("div");

  //\\--------------------------------------Children-of-interactivePart
  //guessing-word
  let guessingWord = document.createElement("div");

  //hint
  let hint = document.createElement("div");
  let res;
  if (isReload) {
    res = chooseHint();
  } else {
    res = chooseHintReloadFalse();
  }
  console.log(`Answer: ${res[0]}`);
  let arrRes = toUnderScore();

  guessingWord.innerText = `${arrRes}`;
  hint.innerText = `Hint: ${res[1]}`;

  //count
  let count = document.createElement("div");
  let counter = 0;
  count.innerText = `Incorrect guesses: ${counter} / 6`;

  //keyboard
  let keyboard = document.createElement("div");
  //\\-------------------------------------------------------
  //\\----------------------------------------------------------------
  //\\---------------------------------------------------------------------
  //\\-------------------------------------------------------------------------

  wrapperMain.className = "wrapper";

  mainElement.className = "main";

  titleOfPage.className = "title";

  container.className = "container";

  gallows.className = "gallows";

  gallowsTopElement.className = "gallows__top-element";

  gallowsLeftElement.className = "gallows__left-element";

  gallowsRightElement.className = "gallows__right-element";

  headOfHangman.className = "head";

  upperBody.className = "upper-body";

  upperBodyLeftArm.className = "upper-body__left-arm";

  torso.className = "upper-body__torso";

  upperBodyRightArm.className = "upper-body__right-arm";

  //for upperBody
  upperBody.append(upperBodyLeftArm);
  upperBody.append(torso);
  upperBody.append(upperBodyRightArm);

  lowerBody.className = "lower-body";

  leftLeg.className = "lower-body__left-leg";

  rightLeg.className = "lower-body__right-leg";

  //for lower-body
  lowerBody.append(leftLeg);
  lowerBody.append(rightLeg);

  gallowsBottomElement.className = "gallows__bottom-element";

  interactivePart.className = "interactive-part";

  guessingWord.className = "guessing-word";

  hint.className = "hint";

  count.className = "count";

  keyboard.className = "keyboard";
  keyboard = generateKeyboard(keyboard, res[0]);

  //for interactive-part block:
  interactivePart.append(guessingWord);
  interactivePart.append(hint);
  interactivePart.append(count);
  interactivePart.append(keyboard);

  //--appending

  //for gallows
  gallows.append(gallowsTopElement);
  gallows.append(gallowsLeftElement);
  gallows.append(gallowsRightElement);
  gallows.append(headOfHangman);
  gallows.append(upperBody);
  gallows.append(lowerBody);
  gallows.append(gallowsBottomElement);

  //for container
  container.append(gallows);
  container.append(interactivePart);

  //for main
  mainElement.append(titleOfPage);
  mainElement.append(container);

  //for wrapper
  wrapperMain.append(mainElement);

  function generateKeyboard(keyboard) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (let i = 0; i < alphabet.length; i++) {
      let text = alphabet[i];
      let letter = document.createElement("button");
      letter.className = "button";
      letter.innerText = `${text}`;
      letter.disabled = false;
      keyboard.append(letter);
      doLetterListener(letter);
    }
    return keyboard;
  }
  
  function doLetterListener(letter) {
    letter.addEventListener('click', () => {
      letter.className = "button button_disabled";
      letter.disabled = true;
      compareWithWord(letter.innerText);
    })
    document.addEventListener('keydown', (e) => {
      if (letter.disabled === false) {
        if (e.code === `Key${letter.innerText}`) {
          letter.className = "button button_disabled";
          letter.disabled = true;
          compareWithWord(letter.innerText);
        };
      }
    })
  }
  
  function chooseHint(word, question) {
    let randomNum = Math.floor(Math.random() * (hintsAndAnswers.length));
    word = hintsAndAnswers[randomNum].answer;
    question = hintsAndAnswers[randomNum].hint;
    return [word, question];
  }

  function chooseHintReloadFalse(word, question) {
    if (arr.length === 0) {
      arr = hintsAndAnswers.slice();
    }
    let randomNum = Math.floor(Math.random() * (arr.length));
    word = arr[randomNum].answer;
    question = arr[randomNum].hint;
    arr.splice(randomNum, 1);
    return [word, question];
  }
  
  function toUnderScore() {
    let array = res[0].split('');
    let arrRes = [];
    for (let i = 0; i < array.length; i++) {
      arrRes.push('_');
    }
    return arrRes.join(' ');
  }

  let arrAfterClick = [];

  function compareWithWord(inner) {
    let arr = res[0].split('');
    let found = false;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === inner) {
            arrAfterClick[i] = inner;
            found = true;
        }
        else if (typeof arrAfterClick[i] === 'undefined') {
            arrAfterClick[i] = '_';
        }
    }

    guessingWord.innerText = arrAfterClick.join(' ');

    if (!arrAfterClick.includes("_")) {
      wrapperMain.append(callModal('you win!'));
    }

    if (!found) {
        counter++;
        count.innerText = `Incorrect guesses: ${counter} / 6`;
        makeVisible(counter);
    }
  }
  
  function makeVisible(counter) {
    if (counter === 1) {
      headOfHangman.classList.add("visible");
    } else if (counter === 2) {
      torso.classList.add("visible");
    } else if (counter === 3) {
      upperBodyLeftArm.classList.add("visible");
    } else if (counter === 4) {
      upperBodyRightArm.classList.add("visible");
    } else if (counter === 5) {
      leftLeg.classList.add("visible");
    } else if (counter === 6) {
      rightLeg.classList.add("visible");
      wrapperMain.append(callModal('you lose!'));
    }
  }

  function callModal(outcomeOfGame) {
    for (let i = 0; i < keyboard.childNodes.length; i++) {
      keyboard.childNodes[i].className = "button button_disabled";
      keyboard.childNodes[i].disabled = true;
    };

    document.body.classList.add("disable-scroll");
    let wrapperModal = document.createElement("div");

    wrapperModal.className = "wrapper-modal";
    
    let modal = document.createElement("div");

    modal.className = "modal";

    let outcome = document.createElement("div");

    outcome.className = "outcome";
    outcome.innerText = `${outcomeOfGame}`;

    let secretWord = document.createElement("div");

    secretWord.className = "secret-word";
    secretWord.innerText = `Word: ${res[0]}`;

    let playAgain = document.createElement("div");

    playAgain.className = "play-again";
    playAgain.innerText = "Play again";
    playAgain.addEventListener('click', () => {
      document.body.prepend(generatePage(false));
      wrapperMain.remove();
    })

    modal.append(outcome);
    modal.append(secretWord);
    modal.append(playAgain);

    wrapperModal.append(modal);

    return wrapperModal;
  }

  return wrapperMain;
}