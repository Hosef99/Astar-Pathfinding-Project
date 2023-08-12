var gridWidth = 20;
var gridHeight = 20;

var startPos = new Vector(0,0);
var endPos = new Vector(gridWidth-1,gridHeight-1);
var search = true;

var vectorArray = [startPos];
var nodeArray = [new node(null,0,Vector.dist(startPos,endPos))];
var lastCallNodeArrayLength;
var vectorPath = [];

var directions = [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1), new Vector(1,1), new Vector(1,-1), new Vector(-1,1), new Vector(-1,-1)]; //four directions only = [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1)] 8 dir : [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1), new Vector(1,1), new Vector(1,-1), new Vector(-1,1), new Vector(-1,-1)]
var obstacle = [];

function FindParent(child){
    
    //find index
    var index;
    for(var i = 0; i < nodeArray.length; i++){
        if(child.id == nodeArray[i].id){
            index = i;
            break;
        }
    }

    if(child.parent != null){
        FindParent(child.parent);
    }
    vectorPath.push(vectorArray[index]);
}

function OpenNode(){
    var minVal = Number.MAX_SAFE_INTEGER;
    var index = -1;
    for(var i = 0; i < nodeArray.length ; i++){
        if(nodeArray[i].f< minVal && !nodeArray[i].opened){
            minVal = nodeArray[i].f;
            index = i;
        }
    }
    if(index == -1){
        console.log()
        search = false;
        return;
    }

    nodeArray[index].opened = true;

    for(var i = 0; i < directions.length; i++){
        var finalVector = Vector.add(directions[i],vectorArray[index]);
        var hitObstcacle = false;
        for(var j = 0; j < obstacle.length ; j++){
            if(Vector.equals(finalVector,obstacle[j])){
                hitObstcacle = true;
                break;
            }
        }

        if(finalVector.x < 0 || finalVector.y < 0 || finalVector.x > gridWidth-1 || finalVector.y > gridHeight-1 || hitObstcacle){
            
        }
        else{
            console.log()
            var findVectorIndex = -1;
            for(var j = 0 ; j < vectorArray.length ; j++){
                if(Vector.equals(finalVector,vectorArray[j])){
                    findVectorIndex = j;
                    break;
                }
            }
            if( findVectorIndex != -1){
                var newGCost = nodeArray[index].g + Vector.dist(directions[i], new Vector(0,0))
                var hCost = nodeArray[findVectorIndex].h
                var newFCost = newGCost + hCost
                
                if (nodeArray[findVectorIndex].g > newGCost) {
                    nodeArray[findVectorIndex].g = newGCost;
                }
                if (nodeArray[findVectorIndex].f > newFCost) {
                    nodeArray[findVectorIndex].f = newFCost;
                    nodeArray[findVectorIndex].parent = nodeArray[index]
                }

            }
            else{
                vectorArray.push(finalVector);
                nodeArray.push(new node(nodeArray[index],nodeArray[index].g+Vector.dist(finalVector,vectorArray[index]),Vector.dist(endPos,finalVector)));
            }
        }

        if(Vector.equals(finalVector,endPos)){
            FindParent(nodeArray[nodeArray.length-1]);
            console.table(vectorPath);
            search = false;
            break;
        }
    }
}
