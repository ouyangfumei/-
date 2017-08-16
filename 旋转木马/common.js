
function $id(id){
    return document.getElementById(id);
}

function animate(element,target){
    //�����ԭ��������ʱ��
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //��ȡ��ǰֵ
        var currentLeft = element.offsetLeft;
        //���㲽��
        var step = (target - currentLeft) / 10;
        //���ݷ���ȡ��
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //�����趨
        currentLeft += step;
        element.style.left = currentLeft + "px";
        //�ж�ֹͣ������
        if(currentLeft == target){
            clearInterval(element.timer);
        }
    },20);
}