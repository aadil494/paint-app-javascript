const canvas = document.getElementById("canvas");
// const increaseBtn = document.getElementById("increase");
// const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const pen = document.getElementById("pen");
const rubber = document.getElementById("eraser");
const image_uploader = document.getElementById("image");
const add_image = document.getElementById("add_image")
const modal = document.getElementById("modal")
const modal_submit = document.getElementById("modal_submit")
const imagex = document.getElementById("imagex");
const imagey = document.getElementById("imagey")
// const colorEl = document.getElementById("color");
// const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");
let selected = pen
let size = 5;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
let fill = true;
let select_area = false;
let radius = 1;
let img = new Image();
image_uploader.addEventListener("change",(e)=>{
    img.src = URL.createObjectURL(image_uploader.files[0]);
    
    img.onload = function(){
        ctx.drawImage(img,imagex.value, imagey.value);
      }
})
console.log(img)
add_image.addEventListener("click",() => {
    console.log(img.src)
    modal.classList.toggle("show");
})
modal_submit.addEventListener("click", ()=>{
    modal.classList.remove("show");
})
pen.addEventListener("click",(e)=>{
    if(selected == pen){
        pen.classList.remove("selected_item");
        selected = canvas;
    } else{
        pen.classList.toggle("selected_item")
        selected.classList.remove("selected_item")
        selected = pen;
    }
});

rubber.addEventListener("click",(e)=>{
    if(selected == rubber){
        rubber.classList.remove("selected_item");
        selected = canvas;
    } else{
        rubber.classList.toggle("selected_item")
        selected.classList.remove("selected_item")
        selected = rubber;
    }
})

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        if(selected == pen){
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
        }
        else{
            eraser(x2,y2);
        }

    }
});
canvas.addEventListener("mousedown",(e)=>{
    if(select_area){
        console.log(e.offsetX);
        console.log(e.offsetY);

    }
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);

})





function drawCircle(x, y) {
    ctx.globalCompositeOperation="source-over";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.globalCompositeOperation="source-over";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

sizeEl.addEventListener("keyup", (e) => {
    size = sizeEl.value;
});


colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function eraser(x,y){
    ctx.globalCompositeOperation="destination-out";
    ctx.arc(x,y,radius,0,Math.PI*2);

    ctx.fill();
    ctx.globalCompositeOperation = "destination-in";
}