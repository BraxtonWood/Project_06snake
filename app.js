let overMessage = document.getElementById("gameOver")
let gameBoard=document.getElementById("gameBoard");
let startButton = document.getElementById("start");
let scoreNode = document.getElementById("score");
let score=0;
let gridSize = Math.floor(document.getElementById("gridSize").value);
let onOff = "off"
let speed = null
let snake = {}
let direction = "left"
let runClock = null
let reset = document.getElementById("reset");
reset.addEventListener("click",resetGame);
startButton.addEventListener("click",startPause);
let tdEdit = document.getElementsByTagName("td");
function selectSpeedFunc(){
    let selectSpeed = document.getElementById("selectSpeed").value;
    console.log("selectSpeed.value",selectSpeed)
    if(selectSpeed==="fast"){
        console.log("fast");
        speed=100; 
    }else if(selectSpeed==="medium"){
        console.log("medium");
        speed = 200;
    }else if(selectSpeed==="slow"){
        console.log("slow");
        speed = 300;
    }
}

function buildTable(){
    gridSize=Math.floor(document.getElementById("gridSize").value);
    console.log(gridSize);
    x=gridSize;
    let table = document.createElement("table");
    for(let i = 0;i<x;i++){
        let tr = document.createElement("tr");
        for(let j = 0; j<x; j++){
            let td = document.createElement("td")
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    gameBoard.appendChild(table);
    for(let i = 0; i<x; i++){
        tdEdit[i].className="boundry";
    }
    for(let i = (x*x-x); i<x*x; i++){
        tdEdit[i].className="boundry";
    }
    for(let i = 0; i<(x*x-x); i+=x){
        tdEdit[i].className="boundry";
    }
    for(let i = x-1; i<(x*x-1); i+=x){
        tdEdit[i].className="boundry";
    }
    
}

initialize();

function initialize(){
    buildTable();
    
    snake = {
        body: []
    }

    onOff = "off";

    center = (Math.floor((gridSize*gridSize/2)+(gridSize/2)));

    tdEdit[center].className="snake";

    snake.body.unshift(center);

    newFood();

    direction = "left";

    overMessage.className="messageOff";

    score = 0
}

function snakeMove(){
    
    let current = snake.body[0];
    //console.log(current);
    let end = snake.body[snake.body.length-1]
    //console.log(end);
    if(direction === "left"){
        current -= 1;
        snakeCheck(current,end);
        snake.body.unshift(current);
        tdEdit[current].className="snake";
    }else if(direction === "right"){
        current += 1;
        snakeCheck(current,end);
        snake.body.unshift(current);
        tdEdit[current].className="snake";
    }else if(direction === "up"){
        current -= gridSize;
        snake.body.unshift(current);
        snakeCheck(current,end);
        tdEdit[current].className="snake";
    }else if(direction === "down"){
        current += gridSize;
        snake.body.unshift(current);
        snakeCheck(current,end);
        tdEdit[current].className="snake";
    }
    tdEdit[end].className="";
}

function snakeCheck(current,end){
    if(tdEdit[current].className===("snake")){
        gameOver();
    }else if(tdEdit[current].className===("boundry")){
        gameOver();
    }else if(tdEdit[current].className===("food")){
        newFood();
        end;
    }else if(tdEdit[current].className===""){
        snake.body.pop();
    }
}

function newFood(){
    let placement = Math.floor(Math.random()*gridSize*gridSize);
    if(tdEdit[placement-1].className===""){
        tdEdit[placement-1].className="food";
        score++;
        scoreNode.innerText=score;
    }else{
        newFood();
    }
}

function gameOver(){
    clearInterval(runClock);
    console.log("GAME OVER");
    overMessage.className="messageOn"

}

function resetGame(){
    while (gameBoard.firstChild){
        gameBoard.removeChild(gameBoard.firstChild);
    }
    initialize();
}

function startPause(){
    selectSpeedFunc();
    console.log(speed);
    if(onOff==="off"){
        runClock = setInterval(snakeMove, speed);
        onOff = "on";
    }else{
        clearInterval(runClock);
        onOff = "off";
    }
}

document.onkeydown = function (event){
    switch (event.keyCode){
        case 37:
            direction = "left";
            break;
        case 38:
            direction = "up";
            break;
        case 39:
            direction = "right";
            break;
        case 40:
            direction = "down";
            break;        
    }
}
