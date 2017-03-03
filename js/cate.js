window.onload=function(){
	checkToggle();
	deleteCartoon();
}

var checkToggle=function(){
	var oCheckBox=document.getElementsByClassName('jd_check_box');
	
	//console.log(oCheckBox.length);
	for(var i=0; i<oCheckBox.length; i++){
		oCheckBox[i].onclick=function(){
			var hasChecked=this.getAttribute('checked'); //如果没有checked属性，return null。。。
			if(hasChecked == null){
				this.setAttribute('checked',' ');
			}else {
				this.removeAttribute('checked');
			}
		}
	}
}

var deleteCartoon = function(){
	var oDelete=document.getElementsByClassName('delete');
	var oAlert=document.getElementsByClassName('alert')[0];
	var oCon=oAlert.getElementsByClassName('con')[0];
	
	var delBox;
	//cartoon
	for(var i=0;i<oDelete.length;i++){
		oDelete[i].onclick=function(){
			oAlert.style.display='block';
			oCon.className='con jumpOut';
			
			delBox=this;
			var up=delBox.getElementsByClassName('delete_top')[0];
			
			up.style.transition='all 1s ease 0s';
			up.style.webkitTransition='all 1s ease 0s';
			
			up.style.transform='translateY(-5px) translateX(-5px) rotate(-45deg)';
			up.style.webkitTransform='translateY(-5px) translateX(-5px) rotate(deg)';
			
		}
	}
	
	var oCansel=oCon.getElementsByClassName('cancel')[0];
	var oSure=oCon.getElementsByClassName('sure')[0];
	
	oCansel.onclick=function(){
		oAlert.style.display='none';
		
		var up=delBox.getElementsByClassName('delete_top')[0];
			
			up.style.transition='all 1s ease 0s';
			up.style.webkitTransition='all 1s ease 0s';
			
			up.style.transform='translateY(0) translateX(0) rotate(0deg)';
			up.style.webkitTransform='translateY(0) translateX(0) rotate(0deg)';
		
	}
	oSure.onclick=function(){
		oAlert.style.display='none';
		
		var up=delBox.getElementsByClassName('delete_top')[0];
			
			up.style.transition='all 1s ease 0s';
			up.style.webkitTransition='all 1s ease 0s';
			
			up.style.transform='translateY(0) translateX(0) rotate(0deg)';
			up.style.webkitTransform='translateY(0) translateX(0) rotate(0deg)';
		
	}
}
