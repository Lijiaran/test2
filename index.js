window.onload=function() {
	waterfall();
	//下面是数据加载
	var dataInt=[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},{'src':'11.jpg'},{'src':'12.jpg'}];
	window.onscroll=function() {
		if(checkscrollside()) {
			var oParent=document.getElementById("main");
			for (var i = 0; i < dataInt.length; i++) {
				var pin=document.createElement("div");     //创建div元素
				pin.className="pin";
				oParent.appendChild(pin);                           //添加子节点
				var Box=document.createElement("div");
				Box.className="box";
				pin.appendChild(Box);
				var oimg=document.createElement("img");
				oimg.src="./images/"+dataInt[i].src;         //把datalnt数组的对象的属性赋给src
				Box.appendChild(oimg)
			}
			waterfall();                   //数组加载后 又要把图片添加到上一列最低图片后面
		}
	}
}
//把图片放到上一列最低的图片
function waterfall() {
	var  oParent=document.getElementById("main");
	var aPin=document.getElementsByClassName("pin");
	var aPinw=aPin[0].offsetWidth;                           //得到列宽
	var num=Math.floor(document.body.offsetWidth/aPinw)       //通过窗口宽度除以列宽得到列数 每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
	oParent.style.cssText="width:" +aPinw*num+"px;margin:0 auto;"    //围main确定宽度   同时居中（宽度没确定时无法居中）  

	var harr=[];                 //用于存储 每列中的所有块框相加的高度。
	for (var i = 0; i < aPin.length; i++) {                 
		var aPinh=aPin[i].offsetHeight;          //获得高度
		if(i<num){                                 
			harr[i]=aPinh;               //第一行中的num个块框pin 先添加进数组harr       Arrharr.push(aPinh)
		}else{
			var minH=Math.min.apply(null,harr);    //得到最低图片的高度   就是下一张图片的top
			var minhindex=harr.indexOf(minH);     //获得最低图片的索引值
			aPin[i].style.position="absolute";  //设置绝对位移
			aPin[i].style.top=minH+"px";
			aPin[i].style.left=minhindex*aPinw+"px";   //因为图片是等宽
			//数组 最小高元素的高 + 添加上的aPin[i]块框高
			harr[minhindex]+=aPin[i].offsetHeight;  //更新添加了块框后的列高
		}
	};
}

//判断图片是否可以加载了
function checkscrollside() {
	var oParent=document.getElementById("main");   
	var aPin=document.getElementsByClassName("pin");
	var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;//标准模式和混杂模式   上卷的高度
	var docuementH=document.documentElement.clientHeight;  //浏览器可视窗口高度 
	return (lastPinH<scrolltop+docuementH)    //函数最终返回布尔值
}


