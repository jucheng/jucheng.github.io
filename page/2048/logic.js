/*初始化游戏数据*/
function newArray() {
    for(var i=0;i<gameSize;++i) {
        gameGrid[i] = [];
    }
}

/*分数显示*/
function updateScore(){
    var score = document.getElementById("score");
    score.innerText = gameScore.toString();
}

function getLeft(i,j){
    return 20 + j * 120;
}

function getTop(i,j){
    return 20 + i * 120;
}

/*初始化网页元素*/
function init() {
    var main = document.getElementsByClassName("game-grid")[0];
    /*添加子元素*/
    for(var i=0;i<gameSize;++i)
    {
        for(var j=0;j<gameSize;++j)
        {
            var child = document.createElement("div");
            child.className  = "game-cell";
            child.style.left = getLeft(i,j) +"px";
            child.style.top  = getTop(i,j) +"px";
            child.id = "child-"+i+"-"+j;
            main.appendChild(child);
        }
    }
    newArray();
}


/*获得游戏空格子的数量*/
function getEmptySize() {
    var sum=0;
    for(var i=0;i<gameSize;++i) {
        for(var j=0;j<gameSize;++j)if(gameGrid[i][j]==0)sum++;
    }
    return sum;
}


/*随机生成数字*/
function createOneNum() {
    var emptySize = getEmptySize();
    if(emptySize==0)return;
    var ranNum = parseInt(Math.random()*emptySize);
    var id = 0, x,y;
    while(ranNum >= 0) {
        x = parseInt(id / gameSize);
        y = parseInt(id % gameSize);
        id++;
        if(gameGrid[x][y]==0)ranNum--;
    }
    gameGrid[x][y] = Math.random()<0.5?2:4;
}

/*数据重置*/
function resetGame(){
    gameScore = 0;
    for(var i=0;i<gameSize;++i)
        for(var j=0;j<gameSize;++j){
            gameGrid[i][j]=0;
        }
}

function canMoveLeft() {
    for (var i = 0; i < gameSize; i++)
        for (var j = 1; j < gameSize; j++)
            if (gameGrid[i][j] != 0) {
                //left为空或者两个数字相等
                if (gameGrid[i][j - 1] == 0 || gameGrid[i][j] == gameGrid[i][j - 1])
                    return true;
            }
    return false;
}

function canMoveUp() {

    for (var i = 1; i < gameSize; i++)
        for (var j = 0; j < gameSize; j++)
            if (gameGrid[i][j] != 0) {
                //up为空或者两个数字相等
                if (gameGrid[i - 1][j] == 0 || gameGrid[i][j] == gameGrid[i - 1][j])
                    return true;
            }
    return false;
}

function canMoveRight() {
    for (var i = 0; i < gameSize; i++)
        for (var j = 2; j >= 0; j--)
            if (gameGrid[i][j] != 0) {
                //right为空或者两个数字相等
                if (gameGrid[i][j + 1] == 0 || gameGrid[i][j] == gameGrid[i][j + 1])
                    return true;
            }
    return false;
}

function canMoveDown() {
    for (var j = 0; j < gameSize; j++)
        for (var i = 2; i >= 0; i--)
            if (gameGrid[i][j] != 0) {
                //down为空或者两个数字相等
                if (gameGrid[i + 1][j] == 0 || gameGrid[i][j] == gameGrid[i + 1][j])
                    return true;
            }
    return false;
}

// rList就是返回的移动后的结果
function changeList(id){
    //pos是下一个存放的位置
    var pos = 0;
    for(var j=0;j<id;++j){
            if(rList[pos]==0)rList[pos] = tList[j];
            else{
                if(rList[pos] == tList[j]){
                    rList[pos] += tList[j];
                    gameScore += rList[pos];
                    pos ++;
                }
                else{
                    pos++;
                    rList[pos] = tList[j];
                }
            }
        }
}

function moveLeft(){
    if(checkStatus%2!=0)return;
    for(var i=0;i<gameSize;++i)
    {
        var id=0;
        //将非零数字存入临时表
        for(var j=0;j<gameSize;++j)
        {
            rList[j] = 0;
            if(gameGrid[i][j]!=0)tList[id++]=gameGrid[i][j];
        }
        changeList(id);
        id = 0;
        for(var j=0;j<gameSize;++j)
        {
            gameGrid[i][j] = rList[id++];
        }
    }
    createOneNum();
}
function moveRight(){
    if(checkStatus%5!=0)return;
    for(var i=0;i<gameSize;++i)
    {
        var id=0;
        for(var j=gameSize-1;j>=0;--j)
        {
            rList[j] = 0;
            if(gameGrid[i][j]!=0)tList[id++]=gameGrid[i][j];
        }
        changeList(id);
        id = 0;
        for(var j=gameSize-1;j>=0;--j)
        {
            gameGrid[i][j] = rList[id++];
        }
    }
    createOneNum();
}
function moveUp(){
    if(checkStatus%3!=0)return;
    for(var j=0;j<gameSize;++j)
    {
        var id=0;
        for(var i=0;i<gameSize;++i)
        {
            rList[i] = 0;
            if(gameGrid[i][j]!=0)tList[id++]=gameGrid[i][j];
        }
        changeList(id);
        id = 0;
        for(var i=0;i<gameSize;++i)
        {
            gameGrid[i][j] = rList[id++];
        }
    }
    createOneNum();
}
function moveDown(){
    if(checkStatus%7!=0)return;
    for(var j=0;j<gameSize;++j)
    {
        var id=0;
        for(var i=gameSize-1;i>=0;--i)
        {
            rList[i] = 0;
            if(gameGrid[i][j]!=0)tList[id++]=gameGrid[i][j];
        }
        changeList(id);
        id = 0;
        for(var i=gameSize-1;i>=0;--i)
        {
            gameGrid[i][j] = rList[id++];
        }
    }
    createOneNum();
}