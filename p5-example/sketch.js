
let t1 = 0.1; // attack time in seconds
let l1 = 0.7; // attack level 0.0 to 1.0
let t2 = 0.3; // decay time in seconds
let l2 = 0.1; // decay level  0.0 to 1.0

let env;
let triOsc;

let title1 = "Hello P5-Expo";

let colors;
let color1,color2,color3,color4,color5,color6,color7;

let colorIndex = [0,1,2,3,4,5,6];

let palette = math.randomInt(1,7);
let font;

let trans = 0;

function preload() {
   colors = loadStrings('addons/dhPalette'+palette+'.txt');
   font = loadFont('addons/Philosopher-Bold.ttf')
}

let freqArray;
let colorArray1,colorArray2,colorArray3;

let vel = math.randomInt(20,40);
let counter = 0;
let c1,c2,c3;

function setup() {

  noLoop();

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(play);

  env = new p5.Envelope(t1, l1, t2, l2);
  triOsc = new p5.Oscillator('triangle');

  // Colors

  shuffle(colorIndex,true);

  color1 = colors[colorIndex[0]].substr(4,colors[colorIndex[0]].length-5).split(",");
  color2 = colors[colorIndex[1]].substr(4,colors[colorIndex[1]].length-5).split(",");
  color3 = colors[colorIndex[2]].substr(4,colors[colorIndex[2]].length-5).split(",");
  color4 = colors[colorIndex[3]].substr(4,colors[colorIndex[3]].length-5).split(",");
  color5 = colors[colorIndex[4]].substr(4,colors[colorIndex[4]].length-5).split(",");
  color6 = colors[colorIndex[5]].substr(4,colors[colorIndex[5]].length-5).split(",");
  color7 = colors[colorIndex[6]].substr(4,colors[colorIndex[6]].length-5).split(",");

  freqArray = new Array(7);

  for (let i = 0; i < 7; i++) {
    freqArray[i] = math.random(100.0,300.0);
  }

  colorArray1 = new Array(7);
  for (let i = 0; i < 7; i++) {
    colorArray1[i] = math.randomInt(0,6);
  }

  colorArray2 = new Array(7);
  for (let i = 0; i < 7; i++) {
    colorArray2[i] = math.randomInt(0,6);
  }

  colorArray3 = new Array(7);
  for (let i = 0; i < 7; i++) {
    colorArray3[i] = math.randomInt(0,6);
  }

}

function draw() {

  background(color1[0],color1[1],color1[2]);

  textAlign(CENTER);
  textFont(font);
  fill(color2[0],color2[1],color2[2],155);
  textSize(20);
  text(title1,width/2,(height/2));

  if(frameCount%vel == 0){

    counter++;

    playSound(freqArray[counter]);

    c1 = colorArray1[counter];
    c2 = colorArray2[counter];
    c3 = colorArray3[counter];

    if(counter == 6){

      counter = 0;

    }
  }

  push();

  noStroke();
  fill(color3[c1],color3[c2],color3[c3],trans);
  translate(width/2, height/2.5);
  rotate(1.5707963268);
  scale(0.75);
  polygon(0, 0, 175, 6);

  pop();



}

function play() {
  loop();
  userStartAudio();
  title1 = "";
  trans = 155;

}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playSound(freq) {
  triOsc.start();
  triOsc.freq(freq);
  env.play(triOsc);
}
