var elem = document.getElementById('draw-shapes');
var two = new Two({ width: window.innerWidth, height: window.innerHeight }).appendTo(elem);

var circle = two.makeCircle(-70, 0, 50);
var rect = two.makeRectangle(70, 0, 100, 100);
circle.fill = '#FF8000';
rect.fill = 'rgba(0, 200, 255, 0.75)';

var group = two.makeGroup(circle, rect);
group.translation.set(two.width / 2, two.height / 2);

// Bind a function to scale and rotate the group
// to the animation loop.
two.bind('update', move).play();  // Finally, start the animation loop
