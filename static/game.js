window.onload = function(){
    var gameStart = document.getElementById("gameStart");
    var start = document.getElementById("start");
    var describe =document.getElementById("describe");
    var cl1 = document.getElementById("cl1");
    var game = document.getElementById("game");
    var operate = document.getElementById("operate");
    var cl = document.getElementById("cl");
    var sel = document.getElementById("sel");
    var selFir = sel.firstElementChild;
    var gameH = getStyle(gameStart,"height");
    var gameW = getStyle(gameStart,"width");
    //定时器
    var c,letterEles,level = 3,letters = "",score = 0,count = 0;
    start.onclick = function(){
        gameStart.style.display = "none";
        game.style.display = "block";
    }
    //事件委托:将所有对dom节点的操作放到js程序里面,与dom的操作只需交互一次,大大减少与dom
    // 的交互次数,提高性能
    operate.onclick = function (evt) {
        var e = evt || window.event;
        var target = e.srcElement || e.target;
        // target:当前事件的目标dom节点
        if(target.className =="set"){
            sel.style.display = "block";
        }
        // 进入游戏界面之后的开始游戏
        // 目标元素的className　＝＝　
        if(target.className ==="s"){
            target.innerHTML = target.innerHTML === "开始"?"暂停":"开始";
            if(target.innerHTML === "开始"){
                operate.lastElementChild.style.cursor = "pointer";
                clearInterval(c);
                c = undefined;
                clearAllLetters();
            }else{
                //游戏的开始
                operate.lastElementChild.style.cursor = "not-allowed";
                //控制单位时间内字母的多少的定时器
                c = setInterval(function () {
                    createLetter();
                    letterEles = document.getElementsByClassName("active");
                },level*1000);//控制显示页面字母的多少
                //暂停之后的开始游戏
                gameStar();
            }
        }
        //  处理结束游戏
        if(target.className == "f"){
            finished();
        }
        //    处理退出游戏
        if(target.className == "t"){

            //    首先处理结束游戏要做的事情
            finished();
            //    显示游戏开始界面，隐藏进入游戏界面
            game.style.display = "none";
            gameStart.style.display = "block";
        }
    }
    //evt代表的是事件对象
    document.onkeyup = function (evt) {
        var e = evt || window.event;
        var codeVal = e.keyCode;
        // e.keyCode获得键盘码
        if(codeVal >= 65 && codeVal <= 90){
            count++;
        }
        // 根据Unicode编码找到对应字符
        var char = keyVal[codeVal];
        // var char = keyVal[codeVal-65];
        if(char){
            var index = letters.search(eval("/" + char  + "/gi"));
            // var index  = letters.search(char);
            if(index != -1) {
                game.removeChild(letterEles[index]);
                var exp = eval("/" + char + "/gi");
                letters = letters.replace(exp, "");
                // letters = letters.replace(char,"");
                tit.children[0].firstElementChild.innerHTML = ++score;
                tit.children[1].firstElementChild.innerHTML = (score/count*100).toFixed(2) + "%";
            }
        }
    }
    //说明的提示
    describe.onclick = function () {
        des.style.display = "block";
    }
    //关闭按钮的提示
    des.onmouseover = function () {
        cl1.style.display = "block";
    }
    des.onmouseout = function () {
        cl1.style.display = "none";
    }
    //关闭提示内容
    cl1.onclick = function () {
        des.style.display = "none";
    }
    //关闭提示内容
    sel.onmouseover = function () {
        cl.style.display = "block";
    }
    sel.onmouseout = function () {
        cl.style.display  = "none";
    }
    //关闭游戏难度设置之后,生效
    cl.onclick = function () {
        sel.style.display = "none";
        level = selFir.value;
    }
    // 创建字母
    function createLetter() {
        var cspan = document.createElement("span");
        cspan.className = "active";
        var l = randLetter();
        cspan.innerHTML = l;
        // <p>hello</p>
        //标签和元素的区别:
        //网页是由许许多多的html元素构成的文本文件,所以说,html元素是构成html文件的基本对象
        //html元素一般情况下由开始标签和结束标签组成,用来包含某些内容
        //也就是说,HTML元素是通过html标签定义的
        //元素的属性:为元素提供各种附加信息的参数
        letters += l;
        cspan.style.left = Math.floor(Math.random()*(gameW - 30)) + "px";
        cspan.style.backgroundColor = randbg();
        //把字母元素追加游戏界面
        game.appendChild(cspan);
        startMove(cspan,gameH,"top");
    }
    //随机产生字母
    function randLetter(){
        var str = "abcdefghijklmnopqrstuvwxyz";
        // str += str.toUpperCase();
        return str.charAt(Math.floor(Math.random()*str.length));
    }

    //生成16进制随机颜色值
    function randbg() {
        var str = "0123456789abcdef";
        var colorVal = "#";
        for(var i = 0; i < 6; i++){
            colorVal +=str.charAt(Math.floor(Math.random()*str.length));
        }
        return colorVal;
    }

    //获取到元素使用样式的最终值,样式函数
    function getStyle(ele,attr) {
        var style = null;
        if(ele.currentStyle){
            //IE Opera
            style =  ele.currentStyle.attr;

        }else{
            //FireFox Chrome Safari
            //getComputedStyle()获取当前元素所有最终使用的CSS属性值
            style =  getComputedStyle(ele,null)[attr];
        }
        //currentStyle不支持伪类样式获取
        //从形式上讲,currentStyle与style相似;
        // 从作用上讲,currentStyle与getComputedStyle类似
        return parseFloat(style);
    }
    //运动函数：元素的运动,元素运动的最终值, 元素的哪个属性运动
    function startMove(ele,end,attr){
        //字母落下速度的快慢
        var speed = 0.6;
        //每个字母元素所在的定时器
        ele.timer = setInterval(function () {
            var moveVal = getStyle(ele,attr);
            // console.log(moveVal);
            if(moveVal == end){
                clearInterval(ele.timer);
                game.removeChild(ele);
                //replace 替换后不会改变原有字符串
                letters = letters.replace(letters[0],"");
            }else{
                ele.style[attr]= moveVal + speed + "px";
            }
        },10);
    }
    //清除掉所有字母所在元素的定时器
    function clearAllLetters() {
        for(var i = 0; i < letterEles.length; i ++){
            clearInterval(letterEles[i].timer);
            letterEles[i].timer = undefined;
        }
    }
//    暂停之后的开始游戏
    function gameStar() {
        if(!letterEles)
            return;
        for(var i = 0;  i< letterEles.length;  i++){
            startMove(letterEles[i],gameH,"top");
        }
    }
//    结束游戏
    function finished() {
        //    清楚单位时间内产生字母的定时器
        clearInterval(c);
        c = undefined;
        //    删除所有的字母
        for(var i = letterEles.length - 1; i >= 0;  i--){
            game.removeChild(letterEles[i]);
        }
        if(operate.firstElementChild.innerHTML == "暂停"){
            operate.firstElementChild.innerHTML  = "开始";
        }
    }

}