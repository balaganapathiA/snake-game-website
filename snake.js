const board=document.getElementById('board')
const context = board.getContext('2d')
const score = document.querySelector('.value')

let s=0;
var UNIT=25;
let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];
let x;
let y;
let xvel=25;
let yvel=0;
let active=true;
let start=false;
window.addEventListener('keydown',keypress)
snakegame();

function snakegame(){
    context.fillStyle='#212121';
    context.fillRect(0,0,500,500);
    createfood();
    snakedraw();
    
}

function createfood(){
    x=Math.floor(Math.random() * 500/UNIT)*UNIT;
    y=Math.floor(Math.random() * 500/UNIT)*UNIT;
}
function display(){
    context.fillStyle='red';
    context.fillRect(x,y,UNIT,UNIT)
}
function snakedraw(){
    context.fillStyle="green";
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)

    })

}
function movesnake(){
    const head = {
        x:snake[0].x+xvel,y:snake[0].y+yvel
    }
    snake.unshift(head)
    if(snake[0].x==x && snake[0].y==y){
        createfood()
        s=s+1;
        score.textContent=s;
    }
    else{
    snake.pop()
    }
}
function loop(){
    if(active)
        setTimeout(()=>{
            context.fillStyle='#212121';
            context.fillRect(0,0,500,500);
            snakedraw();
            movesnake();
            display();
            gameover();
            loop();
        },250)
    else{
        context.fillStyle='#212121';
        context.fillRect(0,0,500,500);
        context.font="bold 50px  serif";
        context.fillStyle="white";
        context.textAlign="center";
        context.fillText("Game Over!!",250,250);
        context.font="20px roboto";
        context.fillText("press f5 and try again...",250,270)


    }
}

function keypress(event){
    if(!start){
        start=true;
        loop();
    }
    switch(true){
        case(event.keyCode==37 && xvel!=25 || event.click=='up' ):
            xvel=-25;
            yvel=0;
            break;
        case(event.keyCode==39 && xvel!=-25):
            xvel=25;
            yvel=0;
            break;
        case(event.keyCode==38 && yvel!=25):
            yvel=-25;
            xvel=0;
            break;
        case(event.keyCode==40 && yvel!=-25):
            yvel=25;
            xvel=0;
            break;
    }
}
function gameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=500):
        case(snake[0].y<0):
        case(snake[0].y>=500):
        active=false;
        break;
    }
}
const up = document.querySelector(".up")
const down = document.querySelector(".down")
const left = document.querySelector(".left")
const right = document.querySelector(".right")
const keys = document.querySelector(".keys")

up.addEventListener('click',()=>{
    console.log('clicked')
    if(!start){
        start=true;
        loop();
    }
    if (yvel!=25){
    yvel=-25;
    xvel=0;
    }
})

down.addEventListener('click',()=>{
    if(!start){
        start=true;
        loop();
    }
    if (yvel!=-25){
    yvel=25;
    xvel=0;
    }
})
left.addEventListener('click',()=>{
    if(!start){
        start=true;
        loop();
    }
    if(xvel!=25){
    xvel=-25;
    yvel=0;
    }
})
right.addEventListener('click',()=>{
    if(!start){
        start=true;
        loop();
    }
    if(xvel!=-25){
    xvel=25;
    yvel=0;
    }
})
