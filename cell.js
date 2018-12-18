class Cell {
    constructor(c, r){
        this.c = c;
        this.r = r;
        this.visited = false;
        this.right = false;
        this.down = false;
    }
    render(...color){
        const w = Cell.w + Wall.w;
        const x = this.c * w;
        const y = this.r * w;
        const wall = walls[this.c][this.r];
        noStroke();
        fill(...color)
        rect(x, y, Cell.w, Cell.w);
        if(this.right){
            wall.vertical.render(...color);
        } 
        if(this.down){
            wall.horizontal.render(...color);
        }
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
// Cell.w = 40;