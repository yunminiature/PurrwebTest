let first = document.querySelector('.first-item');
let clone = first.cloneNode(true);
document.querySelector('.slider-track').appendChild(clone);

let position = 0;
const slidesToShow = 2;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const itemsCout = items.length;
const itemWidth = document.querySelector('.slider-item').offsetWidth;
const movePosition = slidesToScroll * itemWidth;
const prev = document.querySelector('.button-prev');
const next = document.querySelector('.button-next');

let animationFlag = false;

setInterval(function() {
  itemNext();
}, 5000)

next.addEventListener('click', itemNext);
prev.addEventListener('click', itemPrev);

function itemNext() {
  if (animationFlag) return false;

  if (position == (1-itemsCout)*itemWidth){
    position = -itemWidth;
  }
  else{
    position -= itemWidth;
  }

  setPosition(position+itemWidth,position);
}

function itemPrev(){
  if (animationFlag) return false;

  if (position == 0){
    position = (2-itemsCout)*itemWidth;
  }
  else{
    position += itemWidth;
  }

  setPosition(position-itemWidth,position);
}

const setPosition = (startPosition,endPosition) => {
  animationFlag = true;
  var fps = 50;
  var time = 1000;
  var steps = time / (1000 / fps);
  var posintime = (endPosition - startPosition) / steps;

  var timer = setInterval(function(){
    startPosition += posintime;
    track.style.transform = `translateX(${startPosition}px)`;
    steps--;

    if(steps <= 0){
      clearInterval(timer);
      animationFlag = false;
    }
  }, (1000 / fps));
}

function itemCur(x){
  position = -500*x;
  track.style.transform = `translateX(${position}px)`;
}
