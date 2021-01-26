var nodeCount = 0;

class node{
    constructor(parent,g,h){
        this.g = g;
        this.h = h;
        this.f = g+h;
        this.opened = false;
        this.parent = parent;
        this.id = nodeCount;
        nodeCount++;
    }
}