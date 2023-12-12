insertingBoxes();

function insertingBoxes(){
  const contBoxes = document.querySelector('.cont-boxes');
  
  for (let i = 0; i < 100; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = i + 1;

    contBoxes.append(box)
    checkFizzBuzz(i,box);
  }
}

function checkFizzBuzz(i,box){
  if (!(i % 15)) {
    box.innerHTML = "FizzBuzz"
    box.classList.add('fizz-buzz')
  }else if (!(i % 3)) {
    box.innerHTML = "Fizz"
    box.classList.add('fizz')
  }else if (!(i % 5)) {
    box.innerHTML = "Buzz"
    box.classList.add('buzz')
  }
}