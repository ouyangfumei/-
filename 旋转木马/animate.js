
//获取任意属性的值
function getStyle(element,attr){
    if(getComputedStyle){
        return getComputedStyle(element,null)[attr];
    }else {
        return element.currentStyle[attr];
    }
}

//缓动函数v1： 可以让元素在水平方向上移动
function animate_v1(element,target){
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        var currentLeft = element.offsetLeft;
        var step = (target - currentLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        currentLeft += step;
        element.style.left = currentLeft + "px";
        if(currentLeft == target){
            clearInterval(element.timer);
        }
    },20);
}

//第二个版本： 可以让任意以px为单位的属性动起来
function animate_v2(element,target,attr){
    //清除上次的计时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //获取当前任意属性的值
        var currentLeft = parseFloat(getStyle(element,attr));
        //计算步长
        var step = (target - currentLeft) / 10;
        //根据方向对步长取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //重新设定
        currentLeft += step;
        element.style[attr] = currentLeft + "px";
        //满足条件的时候停止
        if(currentLeft == target){
            clearInterval(element.timer);
        }
    },20);
}


//第三个版本：可以修改透明度 ,再次拓展到可以修改z-index
function animate_v3(element,target,attr){
    //清除上次的计时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        if(attr === "zIndex"){
            //如果是z-index属性进行修改，就没有动画可言了，就没必要进行计时器
            element.style.zIndex = target;
            var current = target;
            if(current == target){
                clearInterval(element.timer);
            }
        }else if(attr === "opacity"){
            //用透明度的方式来完成
            //获取当前值
           var current = parseFloat(getStyle(element,attr));
           //因为透明度是从0-1之间的小数，如果进行数学运算，精度可能会发生改变不能直接比较，而是乘以一定的倍数（100）取整之后再比较
           //计算步长
            current = current * 100;
            var tempTarget = target * 100;
            var step = (tempTarget - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //重新设定
            //因为之前已经把step放大了100倍，所以在重新设定的时候要变回来
            current += step;
            element.style.opacity = current / 100;
           //满足条件的时候停止
           if(current == tempTarget){
               clearInterval(element.timer);
           }
       }else {
           //获取当前任意属性的值
           var currentLeft = parseFloat(getStyle(element,attr));
           //计算步长
           var step = (target - currentLeft) / 10;
           //根据方向对步长取整
           step = step > 0 ? Math.ceil(step) : Math.floor(step);
           //重新设定
           currentLeft += step;
           element.style[attr] = currentLeft + "px";
           //满足条件的时候停止
           if(currentLeft == target){
               clearInterval(element.timer);
           }
       }
    },20);
}


//第四个版本：让动画函数可以同时修改多个属性
//因为要传入多个属性和目标值 -- 键值对 -- 多个键值对 -- 对象
function animate_v4(element,obj){
    //清除上次的计时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //要把属性一个一个的修改
        for(var attr in obj){
            if(attr === "zIndex"){
                //如果是z-index属性进行修改，就没有动画可言了，就没必要进行计时器
                element.style.zIndex = obj[attr];
                var target = obj[attr];
                var current = target;
                if(current == target){
                    clearInterval(element.timer);
                }
            }else if(attr === "opacity"){
                //用透明度的方式来完成
                //获取当前值
                var current = parseFloat(getStyle(element,attr));
                //因为透明度是从0-1之间的小数，如果进行数学运算，精度可能会发生改变不能直接比较，而是乘以一定的倍数（100）取整之后再比较
                //计算步长
                current = current * 100;
                var tempTarget = obj[attr] * 100;
                var step = (tempTarget - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //重新设定
                //因为之前已经把step放大了100倍，所以在重新设定的时候要变回来
                current += step;
                element.style.opacity = current / 100;
                //满足条件的时候停止
                if(current == tempTarget){
                    clearInterval(element.timer);
                }
            }else {
                //获取当前任意属性的值
                var currentLeft = parseFloat(getStyle(element,attr));
                var target = obj[attr];
                //计算步长
                var step = (target - currentLeft) / 10;
                //根据方向对步长取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //重新设定
                currentLeft += step;
                element.style[attr] = currentLeft + "px";
                //满足条件的时候停止
                if(currentLeft == target){
                    clearInterval(element.timer);
                }
            }
        }
    },20);
}

//第五个版本：发现第四个版本的bug：如果有某个属性到达位置，就停下来了，其他的属性都没有到达位置
//第五个版本：要求所有的属性都到达目标之后，才会停下来 -- 多个条件同时成立，假设法
function animate_v5(element,obj){
    //清除上次的计时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //先假设所有条件都成立
        var flag = true;
        //要把属性一个一个的修改
        for(var attr in obj){
            if(attr === "zIndex"){
                //如果是z-index属性进行修改，就没有动画可言了，就没必要进行计时器
                element.style.zIndex = obj[attr];
                var target = obj[attr];
                var current = target;
                if(current != target){
                    flag = false;
                    //clearInterval(element.timer);
                }
            }else if(attr === "opacity"){
                //用透明度的方式来完成
                //获取当前值
                var current = parseFloat(getStyle(element,attr));
                //因为透明度是从0-1之间的小数，如果进行数学运算，精度可能会发生改变不能直接比较，而是乘以一定的倍数（100）取整之后再比较
                //计算步长
                current = current * 100;
                var tempTarget = obj[attr] * 100;
                var step = (tempTarget - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //重新设定
                //因为之前已经把step放大了100倍，所以在重新设定的时候要变回来
                current += step;
                element.style.opacity = current / 100;
                //满足条件的时候停止
                if(current != tempTarget){
                    flag = false;
                    //clearInterval(element.timer);
                }
            }else {
                //获取当前任意属性的值
                var currentLeft = parseFloat(getStyle(element,attr));
                var target = obj[attr];
                //计算步长
                var step = (target - currentLeft) / 10;
                //根据方向对步长取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //重新设定
                currentLeft += step;
                element.style[attr] = currentLeft + "px";
                //满足条件的时候停止
                if(currentLeft != target){
                    flag = false;
                    //clearInterval(element.timer);
                }
            }
        }
        //如果所有条件都成立，才应该停止计时器
        if(flag){
            clearInterval(element.timer);
        }
    },20);
}

//第六个版本： 需求 -- 当我的动画执行完毕之后，可以让下一个动画继续执行，获这可以做某些事情，比如：动画执行完毕，告诉别人可以继续操作
//思路：让动画完成之后，执行另一个函数 -- 在动画函数中添加回调函数 -- 将一个函数作为参数传递到另一个函数中被调用，这个作为参数的函数叫做回调函数
//数组.sort(function(a,b){
//    return a - b;
//});
function animate_v6(element,obj,callback){
    //清楚上一次的计时器
    clearInterval(element.timer);
    //为这次动画重新开始计时器
    element.timer = setInterval(function(){

        //因为如果没有假设，只要有一个属性到达目标，就会停下，其他的属性就都无法继续进行变换
        var flag = true;
        //循环的遍历对象，取出其中的键值对，进行动画修改
        for(var attr in obj){
            //对每一个属性进行动画修改
            //当属性是opacity或者z-index等不是以px为单位的就不能像之前一样设置
            if(attr == "opacity"){
                // 1 获取当前值
                var current = parseFloat(getStyle(element,attr));
                var target = obj[attr];
                //2计算步长 -- 因为是小数运算，所以变大之后在取整比较
                current *= 100;
                target *= 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //重新设定
                current += step; //已经是放大100倍的数字,在重新设定的时候，要除回来
                element.style[attr] = current / 100;
                //判断停止
            }else if(attr == "zIndex"){
                //因为z-index是没有动画，可以直接设置为目标值就可以了
                element.style[attr] = obj[attr];
                var target = obj[attr];
                var current = target;

            } else {
                //这个部分即是以px为单位的属性的写法

                //1 获取当前值
                var current = parseFloat(getStyle(element,attr));
                //获取某个属性要到达的目标值
                var target = obj[attr];
                //2 计算步长
                var step = (target - current) / 10;
                //判断方向取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //3 重新设定属性
                current += step;
                element.style[attr] = current + "px";
                //4 判断停止
            }
            if(target != current){
                flag = false;
            }

        }
        //判断是否所有的属性都到达目标值，如果到达了，就停止计时器
        if(flag){
            clearInterval(element.timer);
            //如果计时器停止了，证明动画都已经执行完毕了，调用回调函数，执行你想要动画结束后的逻辑
            callback && callback();
        }
    },20);
}











