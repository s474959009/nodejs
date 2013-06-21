var nav = document.getElementById('nav'),
	mid = document.getElementById('mid'),
	btnNav = document.getElementById('nav_btn'),
	clickNav = false;

btnNav.addEventListener("touchstart", function(){
	if(clickNav){
		clickNav = false;
		btnNav.innerHTML = ">";
		mid.style.cssText = "-webkit-transition:-webkit-transform .5s ease-in-out;-webkit-transform:translate3d(0,0,0);"
	}else{
		clickNav = true;
		btnNav.innerHTML = "<";
		mid.style.cssText = "-webkit-transition:-webkit-transform .5s ease-in-out;-webkit-transform:translate3d(250px,0,0);"
	}
}, false);