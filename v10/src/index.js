window.onload = () => {
  let section1 = document.querySelector('.js-section-1');
  let section2 = document.querySelector('.js-section-2');

  document.addEventListener('mousemove', (e) => {
    let newWidth1 = Math.max(0, e.clientX);
    let newWidth2 = Math.max(0, window.innerWidth - newWidth1);
    section1.style.width = `${newWidth1}px`;
    section2.style.width = `${newWidth2}px`;
  });
}