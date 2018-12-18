var grid = [];
var walls = [];
var stack = [];
var current;
const advance = [0, 0, 255];
const backtrack = 255;
const widthRatio = 0.65;

function setup(){
    createCanvas(900, 900);
    background(51);
    // Set framerate
    // frameRate(20);
    // Find out cols rows and widths
    const cols = 30;
    const rows = 30;
    grid.cols = cols;
    grid.rows = rows;
    let w = floor(width / cols);
    Cell.w = floor(w * widthRatio);
    Wall.w = w - Cell.w;
    // Set up grid of cells and walls
    for(let c = 0; c < cols; c++){
        grid.push([]);
        walls.push([]);
        for(let r = 0; r < rows; r++){
            grid[c].push(new Cell(c, r));
            let vertical = new Wall(c, r, 'vertical');
            let horizontal = new Wall(c, r, 'horizontal');
            walls[c].push({vertical, horizontal});
        }
    }
    // Render all cells and walls

    /* for(let c = 0; c < cols; c++){
        for(let r = 0; r < rows; r++){
            grid[c][r].render();
            walls[c][r].vertical.render();
            walls[c][r].horizontal.render();
        }
    } */
    current = grid[0][0];
}

function draw(){
    current.visited = true;
    let next = current.getRandNeighbor();
    if(next != undefined){
        stack.push(current);
        if (current.r > next.r) {
            next.down = true;
        } else if (current.r < next.r) {
            current.down = true;
        } else if (current.c > next.c) {
            next.right = true;
        } else {
            current.right = true;
        }
        current.render(advance);
        next.render(advance);
        current = next;
    } else if(stack.length > 0) {
        current.render(backtrack);
        current = stack.pop();
        current.render(backtrack);
    } else {
    //    console.log('there is a problem');
    }
}