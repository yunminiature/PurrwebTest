let first = document.querySelector('.first-item');
let clone = first.cloneNode(true);
document.querySelector('.slider-track').appendChild(clone);

let position = 0;
let dotPosition = 0;
const slidesToShow = 2;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const dots = document.querySelectorAll('.slide-dot');
const itemsCout = items.length;
const itemWidth = document.querySelector('.slider-item').offsetWidth;
const movePosition = slidesToScroll * itemWidth;
const prev = document.querySelector('.button-prev');
const next = document.querySelector('.button-next');

dots[dotPosition].className += " active";
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

  dots[dotPosition].className = dots[dotPosition].className.replace(" active", "");
  if (dotPosition==dots.length-1){
    dotPosition=0
  }
  else{
    dotPosition++;
  }
  dots[dotPosition].className += " active";

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

  dots[dotPosition].className = dots[dotPosition].className.replace(" active", "");
  if (dotPosition==0){
    dotPosition=dots.length-1;
  }
  else{
    dotPosition--;
  }
  dots[dotPosition].className += " active";

  setPosition(position-itemWidth,position);
}

function itemCur(x){
  if (animationFlag) return false;

  if (x==0 && position==-1*(itemsCout-1)*itemWidth){
    x+=1;
  }

  dots[dotPosition].className = dots[dotPosition].className.replace(" active", "");
  dotPosition=x;
  dots[dotPosition].className += " active";

  setPosition(position,-500*x);
  position = -500*x;
}

const setPosition = (startPosition,endPosition) => {
  animationFlag = true;
  let fps = 50;
  let time = 1000;
  let steps = time / (1000 / fps);
  let posintime = (endPosition - startPosition) / steps;

  const timer = setInterval(function(){
    startPosition += posintime;
    track.style.left = startPosition + 'px';
    steps--;

    if(steps <= 0){
      clearInterval(timer);
      animationFlag = false;
    }
  }, (1000 / fps));
}
