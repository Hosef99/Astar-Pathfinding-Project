function setup() {
  createCanvas(400, 400);
  frameRate(0.5);

}
function draw() {
  OpenNode();
  if(!search){
    if(vectorPath.length == 0){
      console.log("Couldn't get to the EndPos");
    }
    else{
      console.table(vectorPath);
    }
    frameRate(0);
  }
}
