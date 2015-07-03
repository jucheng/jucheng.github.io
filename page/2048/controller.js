function startGame(){
    gameStatus = "started";
    checkStatus = 210;
    resetGame();
    createOneNum();
    createOneNum();
    drawGameView();
}

/*利用素数来判断方向,移动时判断就简单了*/
function isGameOver() {
    checkStatus = 1;
    if(canMoveLeft())checkStatus *= 2;
    if(canMoveUp())checkStatus *= 3;
    if(canMoveRight())checkStatus *= 5;
    if(canMoveDown())checkStatus *= 7;
    return checkStatus == 1;
}

/*控制*/
function keyDown(e) {
    if(gameStatus != "started")return;
    
    var code=0,e=e||event;
　　code=e.keyCode||e.which||e.charCode;

    if (code >= 37 && code <= 40) {
        /*禁用按钮原有功能*/
        e.preventDefault();
        switch (code) {
            case 37:/*左*/
                moveLeft();
                break;
            case 38:/*上*/
                moveUp();
                break;
            case 39:/*右*/
                moveRight();
                break;
            case 40:/*下*/
                moveDown();
                break;
        }
        drawGameView();
        if(isGameOver()){
            gameStatus="stoped";
            alert("游戏结束");
        }
    }
}

document.onkeydown = keyDown;