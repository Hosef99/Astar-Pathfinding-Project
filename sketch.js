//tileSpace : tileSize = 1:15
var tileSpace;
var tileSize;
var smallTextSize;
var endDraw = false;
var restState = true;

function setup() {
    tileSpace = (windowHeight / gridWidth) / 30;
    tileSize = (windowHeight / gridWidth) * (14 / 15);
    smallTextSize = (windowHeight / gridWidth) * (1 / 5);

    console.log((windowHeight / gridWidth));
    createCanvas(windowWidth, windowHeight);
    createButtons();
    frameRate(100);
}

function draw() {
    MousePositionInGrid();
    background(220);
    if (search && !restState) {
        OpenNode();
    } 
    else if(!search && !restState){
        if (vectorPath.length == 0) {
            alert("Couldn't reach end");
        }
        frameRate(40);
        endDraw = true;
    }
    DrawGrid();
    if (endDraw) {
        DrawVectorPath();
    }
    DrawStartAndEnd();
    DrawText();
    DrawObstacles();
}

function mouseDragged() {
    if (!outOfBounds && restState) {
        switch (state) {
            case "Draw Obstacles":
                var isBreak = false;
                for (var i = 0; i < obstacle.length; i++) {
                    if (Vector.equals(obstacle[i], new Vector(x, y))) {
                        isBreak = true;
                        break;
                    }
                }
                if (!isBreak) {
                    obstacle.push(new Vector(x, y))
                }
                break;
            case "Erase Obstacles":
                for (var i = 0; i < obstacle.length; i++) {
                    if (Vector.equals(obstacle[i], new Vector(x, y))) {
                        console.log("Erase Obstacle");
                        obstacle.splice(i, 1);
                        break;
                    }
                }
                break;
        }
    }
}

function mousePressed() {
    if (!outOfBounds && restState) {
        switch (state) {
            case "Change Start Position":
                startPos = new Vector(x, y);
                nodeArray = [new node(null,0,Vector.dist(startPos,endPos))];
                vectorArray = [startPos]
                break;
            case "Change End Position":
                endPos = new Vector(x, y);
                break;
            case "Draw Obstacles":
                var isBreak = false;
                for (var i = 0; i < obstacle.length; i++) {
                    if (Vector.equals(obstacle[i], new Vector(x, y))) {
                        isBreak = true;
                        break;
                    }
                }
                if (!isBreak) {
                    obstacle.push(new Vector(x, y))
                }
                break;
            case "Erase Obstacles":
                for (var i = 0; i < obstacle.length; i++) {
                    if (Vector.equals(obstacle[i], new Vector(x, y))) {
                        obstacle.splice(i, 1);
                        break;
                    }
                }
                break;
        }
    }
}

