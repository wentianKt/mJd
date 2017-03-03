window.onload=function(){
	scroll();
}

var scroll=function(){
	var oParent=document.getElementsByClassName('c_left')[0];
	var oUl=oParent.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var height=oParent.offsetHeight;
	var topHeight=document.getElementsByClassName('cate_header')[0].offsetHeight;
	
	var parentH = height - topHeight;
	//console.log(parentH);
	var childH = oUl.offsetHeight;
	//console.log(childH);
	var startY=0;
	var endY=0;
	var moveY=0;
	
	var currY=0;
	
	var criticalDis=150;
	
	
	var endTime=0;startTime=0;
	
	var index=0;
	//加过渡
	var addTransition=function(){
		oUl.style.transition="all .3s ease 0s";
		oUl.style.webkitTransition="all .3s ease 0s";
	}
	//减过渡
	var removeTransitoin=function(){
		oUl.style.transiton="none";
		oUl.style.webkitTransition="none";
	}
	//改变位置
	var setTransform=function(t){
		oUl.style.transform='translateY('+t+'px)';
		oUl.style.webkitTransform='translateY('+t+'px)';
	}
	
	oUl.addEventListener('touchstart',function(e){
		startY=e.touches[0].clientY;
		startTime=new Date().getTime();
	},false);
	oUl.addEventListener('touchmove',function(e){
		e.preventDefault();
		endY=e.touches[0].clientY;
		moveY=startY-endY;
		//console.log(currY);
		
		if((currY-moveY)>=criticalDis){
			removeTransitoin();
			setTransform(criticalDis);
		}else if((currY-moveY)<=(parentH-childH)-criticalDis){
			removeTransitoin();
			setTransform((parentH-childH)-criticalDis);
		}else {
			removeTransitoin();
			setTransform(currY-moveY);
		};
	},false);
	oUl.addEventListener('touchend',function(e){
		
		if((currY-moveY)>0){
			removeTransitoin();
			setTransform(0);
		}else if((currY-moveY)<(parentH-childH)){
			removeTransitoin();
			setTransform(parentH-childH);
		}else{
			currY=currY-moveY;
			//console.log(currY);
		}

		
		endTime=new Date().getTime();
		
		if(endTime-startTime<150 && moveY == 0){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className=" ";
				aLi[i].index=i;
			}
			var li=e.target.parentNode;
			li.className="active";
			//console.log(li);
			//console.log(li.index);
			console.log(((li.index)*50));
			
			var translateY=li.index*50;
			if(translateY < -(parentH-childH)){
//				alert(1);
				addTransition();
				setTransform(-translateY);
				currY=-translateY;
			}else {
				addTransition();
				setTransform(parentH-childH);
				currY=parentH-childH;
			}
		};
	},false);
}
