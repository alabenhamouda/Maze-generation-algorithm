class Wall {
    constructor(c ,r, d){
        this.c = c;
        this.r = r;
        this.direction = d;
    }
    render(...color){
        const w = Cell.w + Wall.w;
        const x1 = this.c * w + Cell.w;
        const y1 = this.r * w;
        const y2 = this.r * w + Cell.w;
        const x2 = this.c * w;
        noStroke();
        if(color.length === 0) noFill();
        else fill(...color);
        if (this.direction === 'vertical'){
            // fill(0, 0, 255);
            rect(x1, y1, Wall.w, Cell.w);
        }
        else if (this.direction === 'horizontal'){
            // fill(255, 0, 0);
            rect(x2, y2, Cell.w, Wall.w);
        }
        else console.log('None known direction');
    }
}
// Wall.w = 20;