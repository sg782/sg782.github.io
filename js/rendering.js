const canvas = document.getElementById("bg-canvas");
canvas.height = window.innerHeight; //window.outerHeight;
canvas.width = window.innerWidth; 
let ctx = canvas.getContext("2d");


let itx_x = canvas.width * 0.9;
let itx_y = canvas.height * 0.1;

class Circle {
    // should bounce
    constructor(x = null, y = null){
        this.x = x;
        this.y = y;

        this.v = 0;
        this.vTheta = Math.PI / 2;

        this.g = 100;
        this.dt = 0.01;

        this.mass = 10;
        this.r = 5;
        this.restitution = 0.7;
        // assuming hollow disk
    }

    initCoords(x,y){
        this.x = x;
        this.y = y;
    }

    updateDirectionalV(dir,change, mode='update'){
        // dir: x, y
        // modes: 
        //     overwrite - reset Vx
        //     update - just add to vx
        //     multiply - for bounding i guess 

        let vy = this.v * Math.sin(this.vTheta);
        let vx = this.v * Math.cos(this.vTheta);

        if(dir=="y"){
            if(mode=="update"){
                vy += change;
            }else if(mode=="overwrite"){
                // overwrite
                vy = change;
            }else if(mode=="multiply"){
                vy = change * vy;
            }

        }else if(dir=="x"){
            if(mode=="update"){
                vx += change;
            }else if(mode=="overwrite"){
                // overwrite
                vx = change;
            }else if(mode=="multiply"){
                vx = change * vx
            }
        }

        this.v = Math.sqrt(vy*vy + vx*vx);
        this.vTheta = Math.atan2(vy,vx);
    }

    updateCoords(){
        if(this.x==null || this.y==null){return;}


        if(line.intersect(this.x, this.y, circle.r)){
            this.vTheta = line.angle();
        }

        let vy = this.v * Math.sin(this.vTheta);
        let vx = this.v * Math.cos(this.vTheta);

        if(line.intersect(this.x, this.y, circle.r)){
            // vy = 0; //+= this.g * this.dt * Math.sin(this.vTheta);
            // vx += this.g * this.dt * Math.cos(this.vTheta);

            // does this make the assumption that the ball has stopped rotating?
            this.v += (1/2) * this.g * Math.sin(this.vTheta) * this.dt;

        }else{
            this.updateDirectionalV("y", this.g * this.dt, "update")
            // vy += this.g * this.dt
            // this.v = Math.sqrt(vy*vy + vx*vx);
            // this.vTheta = Math.atan2(vy,vx);
        }

        

        if(this.x + this.v * Math.cos(this.vTheta) * this.dt + this.r <= canvas.width){
        }else{
            this.updateDirectionalV('x',-1 * this.restitution,'multiply');
        }

        if(this.y + this.v * Math.sin(this.vTheta) * this.dt + this.r <= canvas.height){
        }else{
            this.updateDirectionalV('y',-1 * this.restitution,'multiply');
        }

        this.x += this.v * Math.cos(this.vTheta) * this.dt
        this.y += this.v * Math.sin(this.vTheta) * this.dt


        

    }

    drawToCanvas(ctx){
        if(circle.x==null || circle.y==null){return;}

        ctx.fillStyle = "red"
        ctx.beginPath();
        ctx.arc(circle.x,circle.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}

class Line {
    constructor(x1,x2,y1,y2){
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;

        this.friction = 100;
    }

    slope(){
        let dy = this.y1 - this.y2;
        let dx = this.x1 - this.x2;

        this.m = dy/dx;
        return this.m
    }

    angle(){
        this.slope();
        
        this.theta = Math.atan(this.m);
        return this.theta;
    }

    intersect(x,y,r){
        if(circle.x == null){
            return;
        }

        let m = this.slope();
        
        let A = -1*m;
        let B = 1;
        let C = (m * this.x1) - this.y1;

        let d_num = Math.abs(A * x + B * y + C);
        let d_den = Math.sqrt(A*A + B*B);

        let d = d_num / d_den;

        return d <= r;
    }
}

const circle = new Circle();
const line = new Line();


function physicsUpdate(){

    if(circle.x!=null){
        circle.updateCoords();
    }

    renderBackgroundCanvas();
    requestAnimationFrame(physicsUpdate);
}


function renderBackgroundCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const w = canvas.width;
    const h = canvas.height;


    let headerHigh = 50;
    let m1 = (itx_y-headerHigh) / itx_x; //console.log("slope1:",m1, itx_h, headerHigh);
    let headerLow = headerHigh + m1 * w;

    line.x1 = 0;
    line.x2 = w;
    line.y1 = headerHigh;
    line.y2 = headerLow;


    drawPoly(ctx,[
        [0,0], [w,0], [line.x2, line.y2], [line.x1,line.y1]
    ], '#007cffcc');

    circle.drawToCanvas(ctx);

    ctx.beginPath();
    ctx.arc(itx_x,itx_y, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

}


function drawPoly(ctx, points, color, offset=null){
    let offset_x = 0;
    let offset_y = 0;
    if(offset){
        offset_x = offset[0];
        offset_y = offset[1];
    }
    ctx.lineWidth = 1;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(offset_x + points[0][0], offset_y + points[0][1])

    for(let i=1;i<points.length;i++){
        x = offset_x + points[i][0];
        y = offset_y + points[i][1];
        ctx.lineTo(x,y);
    }

    ctx.fill();
    ctx.closePath();
}

function calcIntersection(m1,m2,b1,b2){
    x = (b2-b1) / (m1-m2);
    y = (x * m1) + b1;
    return [x,y]
}

renderBackgroundCanvas()


// https://stackoverflow.com/questions/10001283/html5-canvas-how-to-handle-mousedown-mouseup-mouseclick
var mouseIsDown = false;
var draggingCirc = false;
mx = 0; //mouse x , y
my = 0;

window.onmousedown = function(e){
    mouseIsDown = true;
    console.log("mouse click")
    mx = e.x;
    my = e.y;
    console.log("here:", e.y, e.screenY, window.outerHeight, window.innerHeight);

    console.log(mx,my, itx_x, itx_y);


    if((mx-itx_x)**2 + (my-itx_y)**2 <= 30 ** 2){
        console.log("draggin circ")
        draggingCirc = true;
        e.preventDefault();
    }else{
        console.log("far");
    }

}

window.onmousemove = function(e){
    if(!mouseIsDown){return;}
    if(!draggingCirc){return;}
    e.preventDefault();

    itx_x = e.x;
    itx_y = e.y;

    // console.log(line.slope(), line.angle());
    renderBackgroundCanvas();
}

function newCircle(){
    circle.initCoords(100,20);
    renderBackgroundCanvas();
}

window.onmouseup = function(e){
    mouseIsDown = false;
    draggingCirc = false;
}

window.onkeydown = function(e){
    if(e.key == "Enter"){
        newCircle();
    }
}

physicsUpdate();