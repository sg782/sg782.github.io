let pxOffset = 50;
const canvas = document.getElementById("bg-canvas");
canvas.height = window.outerHeight;
canvas.width = window.outerWidth;

let itx_x = canvas.width * 0.9;
let itx_y = canvas.height * 0.1;
console.log(itx_x, itx_y);


function renderBackgroundCanvas(){

    canvas.height = window.outerHeight;
    canvas.width = window.outerWidth;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    let itx_w = itx_x / w;
    let itx_h = itx_y / h;
    console.log(itx_h);

    let headerHigh = 50;
    let m1 = (itx_y-headerHigh) / itx_x; console.log("slope1:",m1, itx_h, headerHigh);
    let headerLow = headerHigh + m1 * w;



    
    drawPoly(ctx,[
        [0,0], [w,0], [w,headerLow], [0, headerHigh]
    ], '#007cffcc');






    ctx.arc(itx_x,itx_y, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();


    

    // const header = document.getElementById("header");
    // const rc = document.getElementById("right-column");

    // let headerClipPath = `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${pxOffset}px))`;
    // let rcClipPath = `polygon(calc(${pxOffset}px * 1vh/1vw) 0, 100% 0, 100% 100%, 0 100%)`;

    // header.style.clipPath = headerClipPath;
    // rc.style.clipPath = rcClipPath;

}


function mxbFromPoints(x1,y1,x2,y2){
    let m = (y2 - y1) / (x2 - x1);
    // let b = ;

    return [m,b];
}


function drawPoly(ctx, points, color, offset=null){
    let offset_x = 0;
    let offset_y = 0;
    if(offset){
        offset_x = offset[0];
        offset_y = offset[1];
    }
    // console.log(offset_x,offset_y);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(offset_x + points[0][0], offset_y + points[0][1])

    for(let i=1;i<points.length;i++){
        
        x = offset_x + points[i][0];
        y = offset_y + points[i][1];
        ctx.lineTo(x,y);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function calcIntersection(m1,m2,b1,b2){
    x = (b2-b1) / (m1-m2);
    y = (x * m1) + b1;
    // console.log("coords: ", x, y)
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

    // console.log("dragging!!");

    itx_x = e.x;
    itx_y = e.y;
    console.log("itx: ", itx_x, itx_y);
    renderBackgroundCanvas();


    // if(my < 100){
    //     console.log("preventing")
    //     e.preventDefault()
    // }

    // console.log(mx - e.x, my - e.y);
}

window.onmouseup = function(e){
    mouseIsDown = false;
    draggingCirc = false;
}
