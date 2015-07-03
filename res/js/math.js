window.onload = function(){
    var maths = document.getElementsByTagName("math");
    while(maths[0])
    {
        console.log(maths[0].innerHTML);
        var father = maths[0].parentElement;
        var newNode = document.createElement("img");
        newNode.src = "http://latex.codecogs.com/svg.latex?"+maths[0].innerHTML;
        newNode.border = 0;
        father.appendChild(newNode);
        father.replaceChild(newNode,maths[0]);
    }
};
