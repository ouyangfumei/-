
function $id(id){
    return document.getElementById(id);
}

function animate(element,target){
    //先清除原来动画计时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //获取当前值
        var currentLeft = element.offsetLeft;
        //计算步长
        var step = (target - currentLeft) / 10;
        //根据方向取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //重新设定
        currentLeft += step;
        element.style.left = currentLeft + "px";
        //判断停止的条件
        if(currentLeft == target){
            clearInterval(element.timer);
        }
    },20);
}