
$(function(){
	
	initDiv();
	play.clearMap();
});

function initDiv(){
	var left=document.body.scrollWidth/2-400;
	var top=document.body.scrollHeight/2-300;
	var main=document.getElementById("main");
	main.style.left=left+"px";
}

function chessGo(position){
	play.chessGo(position);
}