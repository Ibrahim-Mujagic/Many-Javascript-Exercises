init();

function init(){
  const planetImages = ['pic1.jpeg','pic2.png','pic3.jpeg','pic4.jpeg','pic5.jpeg'];
  const contImg = document.querySelector('.carousel-cont');
  let counterImage = 0;

  planetImages.forEach(pic =>{
    contImg.innerHTML += `<img class="planet-image" src="img/${pic}" alt="Planet">`
  })
  getFirstPic(counterImage);
}

function getFirstPic(index){
  const planetPics = document.querySelectorAll('.planet-image');
  planetPics.forEach(pic =>{
    pic.classList.add('d-none')
  })
  planetPics[index].classList.remove('d-none');

  nextPrevPic(index,planetPics)
}

function nextPrevPic(index,planets){
  const nextBtn = document.querySelector('.btn-right');
  const prevBtn =  document.querySelector('.btn-left');

  nextBtn.addEventListener('click',nextPic)
  function nextPic(){
      planets[index].classList.add('d-none');
      index++
      if (index > planets.length -1) index = 0
      planets[index].classList.remove('d-none');
  }

  prevBtn.addEventListener('click',prevPic)
  function prevPic(){
    planets[index].classList.add('d-none');
    index--
    if (index < 0) index = planets.length -1
    planets[index].classList.remove('d-none');
  }

  controlAutoPlay(prevPic,nextPic); 
}

function controlAutoPlay(prevPic,nextPic){
  const backAuto = document.querySelector('.back-auto');
  const frontAuto = document.querySelector('.front-auto');
  const stopAuto = document.querySelector('.stop-auto');

  let autoPlay = '';
  autoPlay = setInterval(nextPic,2500)

  frontAuto.addEventListener('click',function(){
    clearInterval(autoPlay);
    autoPlay = setInterval(nextPic,2500)
  });

  backAuto.addEventListener('click',function(){
    clearInterval(autoPlay);
    autoPlay = setInterval(prevPic,2500)
  })

  stopAuto.addEventListener('click',function(){
    clearInterval(autoPlay);
  })
}



