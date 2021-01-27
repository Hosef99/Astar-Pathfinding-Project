var gridWidth = 10;
var gridHeight = 10;

var startPos = new Vector(0,0);
var endPos = new Vector(9,9);
var search = true;

var vectorArray = [startPos];
var nodeArray = [new node(null,0,Vector.dist(startPos,endPos))];
var lastCallNodeArrayLength;
var vectorPath = [];

var directions = [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1)]; //four directions only = [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1)] 8 dir : [new Vector(1,0),new Vector(0,1),new Vector(-1,0),new Vector(0,-1), new Vector(1,1), new Vector(1,-1), new Vector(-1,1), new Vector(-1,-1)]
var obstacle = [new Vector(1,0),new Vector(1,1),new Vector(1,2),new Vector(1,3),new Vector(1,4),new Vector(1,5),new Vector(1,6),new Vector(1,7),new Vector(1,8),new Vector(2,7),new Vector(3,7),new Vector(3,0),new Vector(3,1),new Vector(3,3),new Vector(3,5),new Vector(4,0),new Vector(4,1),new Vector(4,3),new Vector(4,5),new Vector(5,0),new Vector(5,1),new Vector(5,3),new Vector(5,5),new Vector(5,6),new Vector(5,7),new Vector(5,8),new Vector(5,9),new Vector(6,0),new Vector(6,1),new Vector(6,3),new Vector(6,6),new Vector(6,7),new Vector(6,8),new Vector(6,9),new Vector(7,0),new Vector(7,1),new Vector(7,3),new Vector(7,4),new Vector(7,5),new Vector(7,6),new Vector(8,0),new Vector(8,1),new Vector(9,0),new Vector(9,1)];

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
            var findVectorIndex = -1;
            for(var j = 0 ; j < vectorArray.length ; j++){
                if(Vector.equals(finalVector,vectorArray[j])){
                    findVectorIndex = j;
                }
            }
            vectorArray.push(finalVector);
            nodeArray.push(new node(nodeArray[index],nodeArray[index].g+Vector.dist(finalVector,vectorArray[index]),Vector.dist(endPos,finalVector)));
            if( findVectorIndex != -1){
                vectorArray.pop(findVectorIndex);
                nodeArray.pop(findVectorIndex);
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
