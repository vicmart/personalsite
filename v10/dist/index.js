window.onload = () => {
  let section1 = document.querySelector('.js-section-1');
  let section2 = document.querySelector('.js-section-2');

  document.addEventListener('mousemove', (e) => {
    let newWidth1 = (window.innerWidth/2) + (1.15 * (e.clientX - 15 - (window.innerWidth/2)));
    let newWidth2 = window.innerWidth - newWidth1 - 30;
    section1.style.width = `${newWidth1}px`;
    section2.style.width = `${newWidth2}`;
  });
}