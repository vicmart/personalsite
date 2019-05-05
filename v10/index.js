const blockSize = 30;
let blockMargin = 5;

$(document).ready(function() {
  let amount = (window.innerWidth + blockMargin) / (blockSize + blockMargin);
  let leftover =  (window.innerWidth + blockMargin) % (blockSize + blockMargin);
  blockMargin += leftover / (amount * 1.0);

  for (let x = 0; x < (window.innerWidth + blockMargin) / (blockSize + blockMargin); x++) {
    for (let y = 0; y < (window.innerHeight + blockMargin) / (blockSize + blockMargin); y++) { 
      let block = document.createElement('div');
      block.classList.add('Block');
      block.style.width = blockSize + 'px';
      block.style.height = blockSize + 'px';
      block.style.marginTop = blockMargin;
      block.style.marginLeft = blockMargin;
      block.style.left = (x * (blockMargin + blockSize) - blockMargin) + "px";
      block.style.top = (y * (blockMargin + blockSize) - blockMargin) + "px";
      document.body.appendChild(block);
    }
  }
});