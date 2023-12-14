const images = [
  {
   titolo: 'Svezia',
   desc: 'Temperature molto basse, Capitale: Stockholma',
   foto: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg'
  },
  {
   titolo: 'Peru',
   desc: 'Molto soleggiata, Capitale: Lima',
   foto: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg'
  },
  {
   titolo: 'Chile',
   desc: 'Grossa popolazione, Capitale : Santiago',
   foto: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c'
  },
  {
   titolo: 'Argentina',
   desc: 'Belle persone, Capitale: Buenos Aires',
   foto: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg'
  },
  {
   titolo: 'Colombia',
   desc: 'Molto caldo, Capitale : Bogotà ',
   foto: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop'
  }   
];

init();

function init(){
  let counterImages = 0;
  updateImage(counterImages)
  nextPrevImage(counterImages)
}

function updateImage(counterImages){
  const imageContainer = document.querySelector('.cont-image img');
  const textContainer = document.querySelector('.text-container');
  const imagePreview = document.querySelector('.images-preview');

  imageContainer.src = images[counterImages].foto;
  imageContainer.alt = images[counterImages].titolo;
  textContainer.querySelector('h3').innerText = images[counterImages].titolo;
  textContainer.querySelector('p').innerText = images[counterImages].desc;
  
  imagePreview.innerHTML = "";

  images.forEach(item =>{
    imagePreview.innerHTML += `
      <div class="box">
        <img src="${item.foto}" alt="${item.titolo}">
      </div>
    `
  })

  const boxes = imagePreview.querySelectorAll('.box')
  boxes.forEach((box, index) => {
    if (index === counterImages) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  })

  changeIndex(boxes)
}

function nextPrevImage(imageIndex){
  const btnPrev = document.querySelector('.btn-left');
  const btnNext = document.querySelector('.btn-right');

  btnPrev.addEventListener('click',prevImage)
  btnNext.addEventListener('click',nextImage)
  
  function prevImage(){
    imageIndex--
    if(imageIndex < 0) imageIndex = images.length -1
    updateImage(imageIndex)
  }

  function nextImage(){
    imageIndex++
    if (imageIndex > images.length -1) imageIndex = 0
    updateImage(imageIndex)
  }

  autoPlay(prevImage,nextImage);
}

function changeIndex(boxes){
  boxes.forEach((box,index)=>{
    box.addEventListener('click',function(){
      updateImage(index)
    })
  })
}

function autoPlay(prevImage,nextImage){
  let auto = setInterval(nextImage,1500);
  const imageContainer = document.querySelector('.carousel');
  imageContainer.addEventListener('mouseover',function(){
    clearInterval(auto)
  })
  imageContainer.addEventListener('mouseleave',function(){
    auto = setInterval(nextImage,1500)
  })
}