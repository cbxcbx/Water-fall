//原生实现方法
window.onload = function () {
    waterfall('main', 'box');
    //模拟数据
    var dataInt = {
        "data": [
            { src: './image/12.jpeg' },
            { src: './image/1.jpeg' },
            { src: './image/10.jpeg' },
            { src: './image/18.jpeg' },
            { src: './image/4.jpeg' },
            { src: './image/9.jpeg' },
            { src: './image/15.jpeg' },
            { src: './image/6.jpeg' },
            { src: './image/5.jpeg' },
            { src: './image/3.jpeg' },
            { src: './image/2.jpeg' },
            { src: './image/1.jpeg' },
            { src: './image/11.jpeg' },
            { src: './image/2.jpeg' },
            { src: './image/17.jpeg' },
            { src: './image/12.jpeg' },
            { src: './image/8.jpeg' },
            { src: './image/18.jpeg' },
            { src: './image/14.jpeg' },
            { src: './image/16.jpeg' },
            { src: './image/10.jpeg' },
            { src: './image/7.jpeg' },
            { src: './image/4.jpeg' },
            { src: './image/1.jpeg' },
            { src: './image/15.jpeg' },
            { src: './image/7.jpeg' },
            { src: './image/9.jpeg' },
            { src: './image/17.jpeg' },
            { src: './image/12.jpeg' },
            { src: './image/3.jpeg' },
            { src: './image/6.jpeg' },
            { src: './image/11.jpeg' },
            { src: './image/1.jpeg' },
            { src: './image/2.jpeg' },
            { src: './image/8.jpeg' }

        ]
    }
    window.onscroll = function () {
        if (checkScroll()) {
            for (let i = 0, len = dataInt.data.length; i < len; i++) {
                var box = document.createElement('div');
                box.className = 'box';
                document.getElementById('main').appendChild(box);
                var pic = document.createElement('div');
                pic.className = 'pic';
                box.appendChild(pic)
                var img = document.createElement('img');
                img.src = dataInt.data[i].src;
                pic.appendChild(img);
            }

            waterfall('main', 'box');
        }
    }
}

function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oboxs = getBoxByClass(oParent, box);
    var oboxWidth = oboxs[0].offsetWidth;
    // 计算整个页面下的列数
    var colNum = Math.floor(document.documentElement.clientWidth / oboxWidth);
    oParent.style.cssText = 'width:' + oboxWidth * colNum + 'px';
    oParent.style.margin = '0 auto';
    // 图片排序
    var oBoxH = [];
    for (let i = 0, len = oboxs.length; i < len; i++) {
        if (i < colNum) {
            oBoxH.push(oboxs[i].offsetHeight)
        }
        else {
            var minH = Math.min.apply(null, oBoxH);
            var oIndex = getMinIndex(minH, oBoxH);
            oboxs[i].style.position = 'absolute';
            oboxs[i].style.top = minH + 'px';
            oboxs[i].style.left = oboxs[oIndex].offsetLeft + 'px';
            oBoxH[oIndex] += oboxs[i].offsetHeight;
        }
    }
}

// 根据Class获取元素
function getBoxByClass(parent, box) {
    var boxs = [];
    var childNodes = parent.getElementsByTagName('*');
    for (let i = 0, l = childNodes.length; i < l; i++) {
        if (childNodes[i].className == box) {
            boxs.push(childNodes[i]);
        }
    }
    return boxs;
}

// 获取最小高度的图片的索引
function getMinIndex(item, array) {
    for (let i = 0, len = array.length; i < len; i++) {
        if (array[i] == item) {
            return i
        }
    }
}

// 检测是否具备加载数据块的条件
function checkScroll() {
    var oParent = document.getElementById('main');
    var oboxs = getBoxByClass(oParent, 'box');
    var lastBoxHeight = oboxs[oboxs.length - 1].offsetTop + Math.floor(oboxs[oboxs.length - 1].offsetHeight / 2);
    var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxHeight > scrollHeight + height) ? false : true
}