var tela = document.querySelector("#telasnake");
var pincel = tela.getContext("2d");

// -------------- Variáveis -------------- //

var canvasX = 600;
var canvasY = 600;

// var maxY = (600 / 15) + 1;

var w = 87;
var s = 83;
var d = 68;
var a = 65;
var snakeX = canvasX / 2;
var snakeY = canvasY / 2;
var speedX = 0;
var speedY = 0;
var size = 1;
var refrashRate = 7;
let score = 0;
let scoreMax = 0;

let gameOver = false;

var tamanhoBasico = canvasX / 20;


var randomX = (Math.random() * canvasX);
var randomMultipleX = randomX - (randomX % tamanhoBasico);
var randomY = (Math.random() * canvasY);
var randomMultipleY = randomY - (randomY % tamanhoBasico);

// console.log(randomX,randomY);
// console.log(randomMultipleX/tamanhoBasico,randomMultipleY/tamanhoBasico);

var xApple = randomMultipleX;
var yApple = randomMultipleY;



// -------------- Desenho funções -------------- //

function snakeHead(x,y,w,h) {
    pincel.fillStyle = "white";
    pincel.fillRect(x,y,w,h);
}

function snakeTail(x,y,w,h) {
    pincel.fillStyle = "lightgrey";
    pincel.fillRect(x,y,w,h);
}

function apple(x,y,w,h) {
    pincel.fillStyle = "red";
    pincel.fillRect(x,y,w,h);
}

// -------------- Desenho -------------- //

const snakeParts = [];
let tailLength = 2;

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function drawSnake(){
    
    pincel.fillStyle = 'white';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        pincel.fillRect(part.x, part.y, tamanhoBasico,tamanhoBasico);
        pincel.strokeStyle = "black";
        pincel.strokeRect(part.x, part.y, tamanhoBasico,tamanhoBasico);
        //pincel.fillRect(part.x * (tela.width/15), part.y * (tela.height/15), tamanhoBasico,tamanhoBasico);
    }
    
    snakeParts.push(new SnakePart(snakeX, snakeY));
    if (snakeParts.length > tailLength){
        snakeParts.shift();
        
    }
    
    pincel.fillStyle = 'green';
    pincel.fillRect(snakeX,snakeY,tamanhoBasico,tamanhoBasico);
    
    //console.log(tailLength);
}




// -------------- Movimento -------------- //

function moveSnake() {

    function listener(evento) {
        if (evento.keyCode == w && speedY != tamanhoBasico) {
            speedX = 0;
            speedY = -1 * tamanhoBasico;
        }
        if (evento.keyCode == s && speedY != -1 * tamanhoBasico) {
            speedX = 0;
            speedY = tamanhoBasico;
        }
        if (evento.keyCode == d && speedX != -1 * tamanhoBasico) {
            speedX = tamanhoBasico;
            speedY = 0;
        }
        if (evento.keyCode == a && speedX != tamanhoBasico) {
            speedX = -1 * tamanhoBasico;
            speedY = 0;
        }
    }

    function touchMove(evento) {

        var clickX = evento.pageX - tela.offsetLeft;
        var clickY = evento.pageY - tela.offsetTop;

        if (clickX > canvasX/2 && speedX != -1 * tamanhoBasico && clickY > (canvasX/6)*1 && clickY < (canvasX/6)*5) {
            speedX = tamanhoBasico;
            speedY = 0;
        }
        if (clickX < canvasX/2 && speedX != tamanhoBasico && clickY > (canvasX/6)*1 && clickY < (canvasX/6)*5) {
            speedX = -1 * tamanhoBasico;
            speedY = 0;
        }
        if (clickY < canvasY/2 && speedY != tamanhoBasico && clickX > (canvasX/6)*1 && clickX < (canvasX/6)*5) {
            speedX = 0;
            speedY = -1 * tamanhoBasico;
        }
        if (clickY > canvasY/2 && speedY != -1 * tamanhoBasico && clickX > (canvasX/6)*1 && clickX < (canvasX/6)*5) {
            speedX = 0;
            speedY = tamanhoBasico;
        }
        console.log(clickX,clickY);
    }

    tela.onclick = touchMove;
    document.onkeydown = listener;
   

    snakeX += speedX;
    snakeY += speedY;
}

// -------------- Game Rules -------------- //



function snakeEatItself() {
    for (let i = 0; i < snakeParts.length; i++) {
        if (snakeX == snakeParts[i].x && snakeY == snakeParts[i].y) {
            speedX = 0;
            speedY = 0;
            snakeX = canvasX / 2;
            snakeY = canvasY / 2;
            tailLength = 2;
            for (let i = 0; i < snakeParts.length; i++) {
                if (snakeParts.length > tailLength){
                    snakeParts.shift();
                }
            }
            
            score = 0;
            // gameOver = true;
            // pincel.font = "30px Arial";
            // pincel.fillText("Game Over", canvasX/2 - 65, canvasY/2);
            return;
        }
    } 
}

// -------------- Reprodução e regras de jogo -------------- //

function appleUpdate() {
    
    if (snakeX == xApple && snakeY == yApple) {
        // console.log("passou por cima");
        pincel.clearRect(xApple,yApple,tamanhoBasico,tamanhoBasico);
        
        randomX = (Math.random() * canvasX);
        randomMultipleX = randomX - (randomX % tamanhoBasico);
        randomY = (Math.random() * canvasY);
        randomMultipleY = randomY - (randomY % tamanhoBasico);
        
        xApple = randomMultipleX;
        yApple = randomMultipleY;

    
        
        tailLength++;
        score++;
        // console.log(size);
    }
}

function scoreFunction() {
    pincel.fillStyle = "yellow";
    pincel.font = "15px Arial";
    pincel.fillText("Score:  " + score, 20, 30);

    
    if (score > scoreMax) {
        scoreMax = score;
    }

    pincel.font = "15px Arial";
    pincel.fillText("Score Max:  " + scoreMax, 20, 60);
    
}

function refreshScreenPlay() {
    pincel.clearRect(0,0,canvasX,canvasY);
    apple(xApple, yApple, tamanhoBasico,tamanhoBasico);
    snakeTail()
    moveSnake();
    appleUpdate();
    //scoreFunction();
    snakeEatItself();
    outCanvas();
    
    // console.log(tailLength);
}



function update(refrashRate) {
    setInterval( () => {
        refreshScreenPlay();
        drawSnake();
        scoreFunction();        
    },1000/refrashRate);
}

function posicaoInicial() {
    x = 400;
    y = 300;
}

function outCanvas() {
    if (snakeX + tamanhoBasico > canvasX) {
        snakeX = 0;
    }
    if (snakeX < 0) {
        snakeX = canvasX;
    }
    if (snakeY + tamanhoBasico > canvasY) {
        snakeY = 0
    }
    if (snakeY < 0) {
        snakeY = canvasY
    }
}

update(refrashRate);
