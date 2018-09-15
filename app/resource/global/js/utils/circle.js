/**
 * @file 环形进度条
 * @author wuguofang@zbj.com
 * 参数说明
 * option: {
 *     element: canvas容器 id
 *     number: 圆环第二行变换数字
 *     numberStyle: 圆环第二行变换数字样式，默认font-size:20px
 *     progress: 圆环进度百分比
 *     text: 圆环第一行文字
 *     textStyle: 圆环第一行文字样式串，默认"font-size:12px"
 *     otherText: 圆环第三行文字
 *     otherTextStyle: 圆环第三行文字样式串，默认"font-size:12px"
 *     strokeStyle: 动态圆环颜色，默认#fff
 *     lineWidth: 圆环宽度，默认10px
 *     baseColor: 圆环底色，默认rgba(255,255,255,0.7)
 * }
 */

module.exports = {

    draw: function(options){
        // 设置默认值（必传）
        // 需要变换的数字
        var element = document.getElementById(options.element);
        if(!element){
            return false;
        }
            // 圆环第二行数字
        var number = options.number,
            // 进度百分比
            progress = options.progress,
            // 圆环第一行文字
            text = options.text || '',
            // 圆环第三行文字
            otherText = options.otherText || '',
            // 设置默认值（选传）
            // 绘制动态圆环颜色
            strokeStyle = options.strokeColor || '#fff',
            // 绘制圆环的宽度
            lineWidth = options.lineWidth || 10,
            //绘制底环颜色
            baseColor = options.baseColor || 'rgba(255,255,255,0.7)',
            // 圆环第一行文字
            textStyle = options.textStyle || '',
            // 圆环第三行文字
            otherTextStyle = options.otherTextStyle || '',
            // 圆环第三行文字
            numberStyle = options.numberStyle || '';
        // 设置默认值结束

        // 横竖屏切换重新载入
        window.addEventListener("orientationchange",function(){
            location.reload();
        });

        var numberInterval = 0,showNumber = 0,
            // 变化的number整数部分小数部分分开
            numberLeft = String(number).split('.')[0],
            numberRight = String(number).split('.')[1] || '00',
            leftLength = numberLeft.length;
        // 根据number大小，设置对应的间隔
        if(number < 501){
            numberInterval = 1;
        }else if(number < 1001){
            numberInterval = 5;
        }else if(number < 5001){
            numberInterval = 15;
        }else if(number < 10001){
            numberInterval = 30;
        }else if(number < 50001){
            numberInterval = 150;
        }else if(number < 100001){
            numberInterval = 350;
        }else if(number < 500001){
            numberInterval = 1500;
        }else if(number < 1000001){
            numberInterval = 3000;
        }else{
            numberInterval = number/100;
        }
        // 数字变化
        // requestAnimationFrame方式
        var animationNumber;
        var requestAnimationFrameNumber = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        var drawNumber = function(){
            if(showNumber < numberLeft && showNumber < numberLeft - numberInterval){
                showNumber +=  numberInterval;
                requestAnimationFrameNumber(drawNumber);
            }else{
                showNumber = numberLeft;
            }
            textNumber.innerHTML = showNumber +'.'+ numberRight + "<i style='font-size:12px'>元<i>";
        }
        animationNumber = setInterval(function(){
            requestAnimationFrameNumber(drawNumber);
        },100);

        // setInterval方式
        // var time = setInterval(function(){
        //     if(showNumber < numberLeft && showNumber < numberLeft - numberInterval){
        //         showNumber +=  numberInterval;
        //     }else{
        //         showNumber = numberLeft;
        //         clearInterval(time);
        //     }
        //     textNumber.innerHTML = showNumber +'.'+ numberRight + "<i style='font-size:12px'>元<i>";
        // },1);
        // 构建canvas元素
        var canvas = document.createElement("canvas"),
            dotRadius = 3, // 实心圆点半径
            outerGap = 10, // 外环线与圆环间隔
            // 环形进度条高宽
            cWidth = element.clientWidth,
            cHeight = element.clientHeight;
        //设置宽高
        canvas.width = cWidth;
        canvas.height = cHeight;
        // 填充canvas到页面中
        element.appendChild(canvas);
        // 创建文本容器
        var textWrap = document.createElement("div");
        textWrap.style.cssText = 'width: 100%;color: #fff;'+
                'position: absolute;left: 0;top:50%;text-align: center;';
        // 填充第一行文字到页面中
        if(text){
            var textOne = document.createElement("p");
            textOne.innerHTML = text;
            textOne.style.cssText = 'font-size:12px' + textStyle;
            textWrap.appendChild(textOne);
        }
        // 填充第二行数字到页面中
        var textNumber = document.createElement("span");
        textNumber.innerHTML = number +'.'+ numberRight + "<i style='font-size:12px'>元<i>";
        textNumber.style.cssText = 'font-size:20px' + numberStyle;
        textWrap.appendChild(textNumber);
        // 填充第三行文字到页面中
        if(otherText){
            var otherWrap= document.createElement("p");
            otherWrap.innerHTML = otherText;
            otherWrap.style.cssText = 'font-size:12px' + otherTextStyle;
            textWrap.appendChild(otherWrap);
        }
        // 设置文本容器位置
        element.style.position = 'relative';
        element.appendChild(textWrap);
        textWrap.style.marginTop = -textWrap.clientHeight/2 + 'px';

        //获取画图环境，指明为2d
        var context = canvas.getContext('2d'),
            centerX = cWidth/2,   //Canvas中心点x轴坐标
            centerY = cHeight/2,  //Canvas中心点y轴坐标
            rad = Math.PI*2,
            startCircle = 0, //加载的圆环数值起始值
            speed = (progress/(number/numberInterval)), //加载的快慢
            radius = (cWidth)/2 - outerGap - dotRadius;

        // 绘制上面一圈
        function upperCircle(n){

            context.save();
            context.strokeStyle = strokeStyle; //设置描边样式
            context.lineWidth = lineWidth; //设置线宽
            context.beginPath(); //路径开始
            //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.arc(centerX, centerY, radius , -Math.PI/2, -Math.PI/2 +n*rad, false);
            context.stroke(); //绘制
            context.closePath(); //路径结束
            context.restore();

        }
        // 绘制最外面一圈弧线
        function outerCircle(n){

            // 绘制开始的实点
            context.save();
            context.translate(centerX,centerY);//将绘图原点移到画布中点
            context.rotate(n*(rad)-Math.PI/2);
            context.fillStyle = strokeStyle; //设置描边样式
            context.lineWidth = 1; //设置线宽
            context.beginPath(); //路径开始
            context.arc(centerX-dotRadius, centerY-radius-dotRadius-outerGap, dotRadius , 0, 2*Math.PI, false);
            context.fill(); //绘制
            context.closePath(); //路径结束
            context.restore();

            // 绘制最外面一圈弧线
            context.save();
            context.strokeStyle = strokeStyle; //设置描边样式
            context.lineWidth = 1; //设置线宽
            context.beginPath(); //路径开始
            //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.arc(centerX, centerY, radius + outerGap , -Math.PI/2, -Math.PI/2 +n*rad, false);
            context.stroke(); //绘制
            context.closePath(); //路径结束
            context.restore();
        }
        // 绘制底圈
        function baseCircle(){

            context.save();
            context.beginPath(); //路径开始
            context.lineWidth = lineWidth; //设置线宽
            context.strokeStyle = baseColor; //设置绘制颜色
            context.arc(centerX, centerY, radius , 0, Math.PI*2, false);
            context.stroke(); //绘制
            context.closePath(); //路径结束
            context.restore();

        }

        // 开始动画
        var animationCircle;
        // requestAnimationFrame方法
        var requestAnimationFrameCircle = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        function drawCircle() {
            //清除canvas轨迹
            context.clearRect(0, 0, canvas.width, canvas.height);
            // 绘制底圈
            baseCircle();
            // 绘制上面圆环
            upperCircle(startCircle);
            // 如果传了process和number再绘制外面一圈环线
            if(progress && number){
                outerCircle(startCircle);
            }
            // 防止圆环绘制过指定百分比
            if(startCircle + speed > progress){
                startCircle = progress;
            }else{
                startCircle += speed;
            }
            // 清除interval
            if(startCircle < progress){
                requestAnimationFrameCircle(drawCircle);
            }
        }
        animationCircle = setInterval(function(){
            requestAnimationFrameCircle(drawCircle);
        },100);


        // setInterval方式
        // (function drawCircle(){
        //
        //     animationCircle = setInterval(function(){
        //         // 清除canvas轨迹
        //         context.clearRect(0, 0, canvas.width, canvas.height);
        //         // 绘制底圈
        //         baseCircle();
        //         // 绘制上面圆环
        //         upperCircle(startCircle);
        //         // 如果传了process和number再绘制外面一圈环线
        //         if(progress && number){
        //             outerCircle(startCircle);
        //         }
        //         // 防止圆环绘制过指定百分比
        //         if(startCircle + speed > progress){
        //             startCircle = progress;
        //         }else{
        //             startCircle += speed;
        //         }
        //         // 清除interval
        //         if(startCircle > progress){
        //             clearInterval(animationCircle);
        //         }
        //     },1)
        //
        // }());
    }
};
