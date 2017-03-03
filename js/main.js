window.onload=function(){
	search();
	countDown();
	carousel();
}

var search=function(){
	var oSearch=document.getElementsByClassName('jD_header_box')[0];
	var oBanner=document.getElementsByClassName('jd_banner')[0];
	var height=oBanner.offsetHeight;
	
	window.onscroll=function(){
		var top=document.body.scrollTop;
		//console.log(top);
		if(top>height){
			oSearch.style.background="rgba(201,21,35,0.85)";
		}else {
			var op=top/height * 0.85;
			oSearch.style.background="rgba(201,21,35,"+op+")";
		}
	}
}

var countDown=function(){
	var oParent=document.getElementsByClassName('box_top')[0];
	var aSpan=oParent.getElementsByClassName('sk_num');
	var time=18*60*60
	setInterval(function(){
		time--;
		var h=Math.floor(time/(60*60));
		var m=Math.floor(time/60%60);
		var s=time%60;
		//console.log(h+'-'+m+'-'+s);
		aSpan[0].innerHTML=h>10?Math.floor(h/10):0;
		aSpan[1].innerHTML=h%10;
		
		aSpan[2].innerHTML=m>10?Math.floor(m/10):0;
		aSpan[3].innerHTML=m%10;
		
		aSpan[4].innerHTML=s>10?Math.floor(s/10):0;
		aSpan[5].innerHTML=s%10;
	},1000)
}

var carousel=function(){
	var oBanner=document.getElementsByClassName('jd_banner')[0];
	var oFirUl=oBanner.getElementsByTagName('ul')[0];
	var oSecUl=oBanner.getElementsByTagName('ul')[1];
	var aLiPic=oFirUl.getElementsByTagName('li');
	var aLiRad=oSecUl.getElementsByTagName('li');
	
	var width=oBanner.offsetWidth;
	var i=1;
	
	var addTransition=function(){
		oFirUl.style.transition="all .3s ease 0s";
		oFirUl.style.webkitTransition="all .3s ease 0s";
	}
	var removeTransitoin=function(){
		oFirUl.style.transition="none";
		oFirUl.style.webkitTransition="none";
	}
	var setTransform=function(t){
		oFirUl.style.transform='translateX('+t+'px)';
		oFirUl.style.webkitTransform='translateX('+t+'px)';
	}
	
	var timer=setInterval(function(){
		i++;
		
		addTransition();
		setTransform(-i*width);
		
		if(i>=9){
			i=1;
		}else if(i<=0){
			i=8;
		};
		
		for(var n=0;n<aLiRad.length;n++){
			removeClass(aLiRad[n],"now");
		}
		toggleClass(aLiRad[i-1],"now");
	},1000);
	
	oFirUl.addEventListener('transitionEnd',function(){
		if(i>=9){
			i=1;
		}else if(i<=0){
			i=8;
		};
		
//		这儿记住要先清除过渡动画,再设置transform,很6,get.....
		removeTransitoin();
		setTransform(-i*width);
	},false);
	oFirUl.addEventListener('webkitTransitionEnd',function(){
		if(i>=9){
			i=1;
		}else if(i<=0){
			i=8;
		};
		removeTransitoin();
		setTransform(-i*width);
	},false)
	
	var moveX=0;
	var startX=0;
	var endX=0;
	//触摸开始
	oFirUl.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startX=e.touches[0].clientX;
	},false);
	
	//触摸滑动
	oFirUl.addEventListener('touchmove',function(e){
		clearInterval(timer);
		//清除默认的滚动事件
		e.preventDefault();
		//记录结束的位置
		endX=e.touches[0].clientX;
		//记录滑动的距离
		moveX=startX-endX;
		
		removeTransitoin();
		setTransform(-i*width-moveX)
	},false);
	
	
	//触摸结束
	oFirUl.addEventListener('touchend',function(e){
		
		if(Math.abs(moveX) > (1/3*width) && endX !=0 ){
			//右滑
			if(moveX<0){
				i--;
			}else{
				i++;
			}
			setTransform(-i*width);
		}
		//不成立,回到原来的位子
		addTransition();
		setTransform(-i*width);
		
		//初始化
		startX=0;
		endX=0;
		
		//清理定时器
		clearInterval(timer);
		
		timer=setInterval(function(){
			i++;
			addTransition();
			setTransform(-i*width);
		},1000)
	},false);
	
	
}

//判断样式是否存在
function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}
//删除指定dom元素的样式
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}
//如果存在(不存在)，就删除(添加)一个样式
function toggleClass(ele,cls){ 
    if(hasClass(ele,cls)){ 
        removeClass(ele, cls); 
    }else{ 
        addClass(ele, cls); 
    } 
}