const startButton = document.querySelector('.start-btn');
startButton.addEventListener('click',startGame)


function startGame(){
  const userNum = document.querySelector('.user-num').value;
  const pcNum = getRandomNumber(1,6);

  checkNums(userNum,pcNum)
}

function checkNums(userNum,pcNum){
  const output = document.querySelector('.output-text');

  if (userNum > pcNum) {
    output.innerHTML = `
    Complimenti hai sceglto un numero maggiore del pc, gioca ancora </br>
    User: ${userNum} </br>
    Pc: ${pcNum}
    `
  }else if (userNum < pcNum) {
    output.innerHTML = `
    Peccato hai sceglto un numero inferiore del pc, gioca ancora </br>
    User: ${userNum} </br>
    Pc: ${pcNum}
    `
  }else{
    output.innerHTML = `
    Avete scelto lo stesso numero ritenta </br>
    User: ${userNum} </br>
    Pc: ${pcNum}
    `
  }
}


function getRandomNumber(min,max){
  return  Math.floor(Math.random() * (max - min + 1)) + min;
};