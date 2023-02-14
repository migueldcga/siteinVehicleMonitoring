let cu = _.range(0,70);

let oi = 1;
function setup() {
  createCanvas(300, 300, WEBGL);
  console.log(cu);

  // describe('a white box rotating in 3D space');
}

function draw() {
  // oi = dedo[oi]
  background(200);

  
  // rotateX(0.01*frameCount);
  // rotateY(0.01*cu[oi]);
  rotateZ(0.01*cu[oi]);
  box(50, 30, 10);
  oi = oi + 1;
  if (oi == 70){oi =1};
  
  

}