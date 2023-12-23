const userAnswers = [];
const startButtons = document.querySelectorAll('.choice-difficulty .buttons button');
const htmlstartCounterCont = document.querySelector('.start-counter-cont');
const endGameMessageCont = document.querySelector('.output-message');
let gameTimer;
let counterInit = 5;
let maxNum = null;
let maxTime = null;

init();

function init(){
  
  startButtons.forEach(button=>{
    button.addEventListener('click',function(){

      startingCounterInit();
      disableButtons(startButtons);
      checkDifficulty(button);
      startGame();

    });
  });
};

function startingCounterInit(){
  let clock;
  
  htmlstartCounterCont.classList.remove('d-none');
  htmlstartCounterCont.querySelector('h2').innerHTML = counterInit;
  
  clock = setInterval(function(){
    counterInit--;
    htmlstartCounterCont.querySelector('h2').innerHTML = counterInit;

    if (counterInit === 0) {
      clearInterval(clock);
      htmlstartCounterCont.classList.add('d-none');
    }
  },1000);

}

function disableButtons(buttons){
  buttons.forEach(button=>{
    button.disabled = true;
    button.style.cursor = 'not-allowed';

  })
}

function checkDifficulty(button){
  if (button.innerText === 'Easy') {
    maxNum = 20;
    maxTime = 25;
  }else if (button.innerText === 'Medium') {
    maxNum = 35;
    maxTime = 35
  }else{
    maxNum = 50;
    maxTime = 20;
  }

}

function startGame(){
  
  const htmlCountDown = document.querySelector('.count-down h4');

  htmlCountDown.innerHTML = maxTime
  setTimeout(function(){

    insertInputforUser();
    const htmlInputs = document.querySelectorAll('.cont-user-input input')
    gameTimer = setInterval(function(){
      maxTime--
      htmlCountDown.innerHTML = maxTime
      if (maxTime === 0) {
        clearInterval(clock);

        htmlInputs.forEach(input =>{
          input.disabled = true;
        })

        if (confirm('E\' scaduto il tempo,gioca ancora')) {
          location.reload();
        }
      }
    },1000);  

  },counterInit * 1000);

}

function insertInputforUser(){
  const userInputsContainer = document.querySelector('.cont-user-input');
  const cardInput = `
    <div class="input-container">
      <input type="text" placeholder="Inserisci il numero">
      <div class="correction-cont"></div>
    </div>
  `;

  for (let i = 0; i < 5; i++) {
    userInputsContainer.innerHTML += cardInput;
  }

  checkUserNumber(userInputsContainer);
}

function checkUserNumber(countUserInput) {
  const numberToGuess = getRandomNumber(0,maxNum);
  const userNumber = countUserInput.querySelectorAll('.input-container input');
  const outputForNum = countUserInput.querySelectorAll('.input-container .correction-cont')

  userNumber.forEach((input,index)=>{

    input.addEventListener('focus',function(){
      this.addEventListener('change',function(e){

        if (parseInt(e.target.value) < numberToGuess ) {

          outputForNum[index].innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
          userAnswers.push(e.target.value);

        }else if(parseInt(e.target.value) > numberToGuess){

          outputForNum[index].innerHTML = `<i class="fa-solid fa-arrow-down"></i>`
          userAnswers.push(e.target.value);

        }else if(parseInt(e.target.value) === numberToGuess){
          
          outputForNum[index].innerHTML = `<i class="fa-regular fa-thumbs-up"></i>`
          userNumber.forEach(input => {
            input.disabled = true;
          });
          endGame(true);
        }

        this.disabled = true;
        const nextInput = userNumber[index +1];
        if (nextInput) {
          nextInput.focus();
        }

        if (userAnswers.length === userNumber.length) {
          endGame(false)
        }
      })
    })
  })
}

function endGame(bool){
  clearInterval(gameTimer);
  endGameMessageCont.classList.remove('d-none');

  if (bool) {
    endGameMessageCont.innerHTML = `<h3>Congratulazioni hai indovinato il numero </h3>`
  }else{
    endGameMessageCont.innerHTML = `<h3>Hai sbagliato tutti i numeri, Gioca ancora</h3>`;
  }
  endGameMessageCont.innerHTML += `<button onClick="location.reload()">Rigioca</button>`
}


function getRandomNumber(min,max){
  return  Math.floor(Math.random() * (max - min + 1)) + min;
};
