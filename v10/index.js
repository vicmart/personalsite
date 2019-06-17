let blockSize = 15;

$(document).ready(function() {
  let amount = window.innerWidth / blockSize;
  let leftover =  window.innerWidth % blockSize;
  blockSize += leftover / (amount * 1.0);

  for (let x = 0; x < window.innerWidth / blockSize; x++) {
    for (let y = 0; y < window.innerHeight / blockSize; y++) { 
      let block = document.createElement('div');
      block.classList.add('Block');
      block.id = `js-b-${x}-${y}`;
      block.style.width = blockSize + 'px';
      block.style.height = blockSize + 'px';
      block.style.left = (x * blockSize) + "px";
      block.style.top = (y * blockSize) + "px";
      document.body.appendChild(block);
    }
  }

  document.addEventListener('mouseover', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    let blockX = Math.floor(mouseX / blockSize);
    let blockY = Math.floor(mouseY / blockSize);
    
    let target = document.querySelector(`#js-b-${blockX}-${blockY}`);
    console.log(`#js-b-${blockX}-${blockY}`);
  });
});