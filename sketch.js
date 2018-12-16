class Cell {
    constructor(c, r){
        this.c = c;
        this.r = r;
        this.visited = false;
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
    }
    render(...color){
        const w = Cell.w;
        const x = this.c * w;
        const y = this.r * w;
        // let color = this.visited ? [255, 20, 20] : [51];
        noStroke();
        fill(...color)
        rect(x, y, w, w);
        stroke(51);
        strokeWeight(20);
        if (this.up) line(x, y, x + w, y);
        if (this.down) line(x, y+w, x+w, y+w);
        if (this.left) line(x, y, x, y+w);
        if (this.right) line(x+w, y, x+w, y+w);
    }
    get neighbors(){
        const {c, r} = this;
        let arr = [];
        if(c > 0) arr.push(grid[c - 1][r]);
        if(c < grid.cols - 1) arr.push(grid[c + 1][r]);
        if(r > 0) arr.push(grid[c][r - 1]);
        if(r < grid.rows - 1) arr.push(grid[c][r + 1]);
        return arr;
    }
    getRandNeighbor(){
        let neighbors = this.neighbors.filter(neighbor => !(neighbor.visited));
        let rand = floor(random() * neighbors.length);
        return neighbors[rand];
    }
}
Cell.w = 40;
var grid = [];
var stack = [];
var current;

function setup(){
    createCanvas(800, 800);
    // frameRate(15);
    background(51);
    const cols = floor(width / Cell.w);
    const rows = floor(height / Cell.w);
    grid.cols = cols;
    grid.rows = rows;
    for(let c = 0; c < cols; c++){
        grid.push([]);
        for(let r = 0; r < rows; r++){
            grid[c].push(new Cell(c, r));
        }
    }
    current = grid[0][0];
    current.render(255);
    // for(let col of grid){
    //     for(cell of col){
    //         cell.render(51);
    //     }
    // }
    // noLoop();
}

function draw(){
    current.visited = true;
    let next = current.getRandNeighbor();
    if(next != undefined){
        stack.push(current);
        if (current.r > next.r) {
            current.up = false;
            next.down = false;
        } else if (current.r < next.r) {
            current.down = false;
            next.up = false;
        } else if (current.c > next.c) {
            current.left = false;
            next.right = false;
        } else {
            current.right = false;
            next.left = false;
        }
        current.render(255);
        next.render(255);
        current = next;
    } else if(stack.length > 0) {
        current.render(0, 0, 255);
        current = stack.pop();
        current.render(0, 0, 255);
    } else {
        var start = grid[0][0];
        start.left = false;
        start.render(0, 0, 255);
        var end = grid[grid.cols - 1][grid.rows - 1];
        end.right = false;
        end.render(0, 0, 255);
    }
}