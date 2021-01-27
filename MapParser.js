
function MapToString(){
    var newString = "";
    
    for(var i =0;i<obstacle.length;i++){
        newString += obstacle[i].x.toString() + " " + (obstacle[i].y).toString() + ";";
    }
    newString = newString.slice(0,newString.length-1);
    console.log(newString);
}

function StringToMap(string){
    var stringArray = string.split(';');

    for(var i=0;i<stringArray.length;i++){
        var xyArr = stringArray[i].split(' ');
        
        var y = parseInt(xyArr[1]);
        var x = parseInt(xyArr[0]);

        obstacle.push(new Vector(x,y));
    }
}