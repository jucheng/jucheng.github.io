/**
 * Created by ZhengQinyu on 2015/3/17 0017.
 */
 
// 全局变量
var gameGrid = [];
var tList = [];
var rList = [];
var gameSize = 4;
var gameScore = 0;
var gameStatus = "stoped";
var checkStatus = 210; // 2 * 3 * 5 * 7

/*格子背景颜色*/
function numBgColor(number) {
    switch (number) {
        case 0:
            return "#c4e6ab";
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
        case 16384:
            return "#291EFF";
        case 32768:
            return "#1EBB0F";
        default :
            return 'black';
    }
}

/*数字颜色*/
function numColor(number) {
    if (number <= 4)return "#776e65";
    else return "white";
}

//重画游戏界面
function drawGameView(){
    for(var i=0;i<gameSize;++i) {
        for (var j = 0; j < gameSize; ++j) {
            var child = document.getElementById("child-"+i+"-"+j);
            child.style.backgroundColor = numBgColor(gameGrid[i][j]);
            child.style.color = numColor(gameGrid[i][j]);
            var str = gameGrid[i][j].toString();
            if(str=="0")str="";
            child.innerHTML = str;
        }
    }
    updateScore();
}