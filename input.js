var state = "";
function changeState(string){
    state = string;
}

function startButton(){
    state = "Change Start Position";
}

function endButton(){
    state = "Change End Position";
}

function drawObstacle(){
    state = "Draw Obstacles";
}

function deleteAllButton(){
    obstacle = [];
}

function eraseObstacle(){
    state = "Erase Obstacles";
}

function startSearchButton(){
    restState = false;
    search = true;
    endDraw = false;
    vectorPathDrawIndex = 0;
    vectorPath = []
    vectorArray = [startPos];
    nodeArray = [new node(null,0,Vector.dist(startPos,endPos))];
    frameRate(10);
}

function pauseSearchButton(){
    if(!endDraw){
        restState = true;
        search = false;
        frameRate(100);
    }
}

function resumeSearchButton(){
    restState = false;
    search = true;
    frameRate(10);
}

function clearAllNodesButton(){
    vectorPathDrawIndex = 0;
    vectorPath = []
    vectorArray = [startPos];
    nodeArray = [new node(null,0,Vector.dist(startPos,endPos))];
}

function createButtons(){
    var changeStartPosButton = createButton("Change Start Position");
    changeStartPosButton.mousePressed(startButton);
    changeStartPosButton.position(0, 0)
    var changeEndPosButton = createButton("Change End Position");
    changeEndPosButton.mousePressed(endButton);
    changeEndPosButton.position(0,30);
    var drawObstacleButton = createButton("Draw Obstacles");
    drawObstacleButton.mousePressed(drawObstacle);
    drawObstacleButton.position(0,60);
    var deleteAllObstacleButton = createButton("Delete All Obstacles");
    deleteAllObstacleButton.mousePressed(deleteAllButton);
    deleteAllObstacleButton.position(0,90);
    var eraseObstacleButton = createButton("Erase Obstacles");
    eraseObstacleButton.mousePressed(eraseObstacle);
    eraseObstacleButton.position(0,120);
    var searchButton = createButton("Start");
    searchButton.mousePressed(startSearchButton);
    searchButton.position(0,150);
    var pauseButton = createButton("Pause");
    pauseButton.mousePressed(pauseSearchButton);
    pauseButton.position(0,180);
    var resumeButton = createButton("Resume");
    resumeButton.mousePressed(resumeSearchButton);
    resumeButton.position(0,210);
    var clearNodesButton = createButton("Clear All Nodes");
    clearNodesButton.mousePressed(clearAllNodesButton);
    clearNodesButton.position(0,240);
}

