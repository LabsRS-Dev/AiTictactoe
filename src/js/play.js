var play=play||{};
play.map=[0,0,0,0,0,0,0,0,0,0];
play.mark=false;

//下棋
play.chessGo=function(position){
	var map=this.map;
	if(this.mark){
		this.mark=false;
		this.clearMap();
		return;
	}
	if(map[position]==0){
		map[position]=1;
		document.getElementById("td_"+position).innerHTML="<div class='P'></div>";
		var flag=this.checkMap(map);
		if(flag!=2){
			if(flag==1){
				document.getElementById("text").innerHTML="You win !!!!";
			}else if(flag==-1){
				document.getElementById("text").innerHTML="You lost !!!!";
			}else{
				document.getElementById("text").innerHTML="The draw !!!!";
			}
			this.mark=true;
			return ;
		}
		var c=this.cpuGo(map, 10000);
		if(c.p>0){
			map[c.p]=-1;
			document.getElementById("td_"+ c.p).innerHTML="<div class='C'></div>";
			flag=this.checkMap(map);
			if(flag!=2){
				if(flag==1){
					document.getElementById("text").innerHTML="You win !!!!";
				}else if(flag==-1){
					document.getElementById("text").innerHTML="You lost !!!!";
				}else{
					document.getElementById("text").innerHTML="The draw !!!!";
				}
				this.mark=true;
				return ;
			}
		}
	}
}
//模拟cpu的可能走法
play.cpuGo=function(map, score){
	var min=Number.POSITIVE_INFINITY,position;
	for(var i=1;i<=9;i++){
		if(map[i]==0){
			var s=this.ffc(map, i, score);
			if(s<min){
				min=s;
				position=i;
			}
		}//if end
	}
	if(min==Number.POSITIVE_INFINITY){
		for(var i=1;i<=9;i++){
			if(map[i]==0){
				break;
			}//if end
		}
		return {s:0,p:i};
	}
	return {s:min, p:position};
}
//评估cpu这一步的价值
play.ffc=function(map, position, score){
	var t=[];
	for(var j=0;j<map.length;j++){
		t.push(map[j]);
	}
	t[position]=-1;
	var mark=this.checkMap(t);
	if(mark==-1){
		return -score;
	}else if(mark==2){
		return this.playGo(t, score).s;
	}
	return 0;
}
//模拟player的可能走法
play.playGo=function(map, score){
	var max=Number.NEGATIVE_INFINITY,position;
	for(var i=1;i<=9;i++){
		if(map[i]==0){
			var s=this.ffp(map, i, score);
			if(s>max){
				max=s;
				position=i;
			}
		}//if end
	}
	if(max==Number.NEGATIVE_INFINITY){
		for(var i=1;i<=9;i++){
			if(map[i]==0){
				break;
			}//if end
		}
		return {s:0,p:i};
	}
	return {s:max, p:position};
}
//评估player这一步的价值
play.ffp=function(map, position, score){
	var t=[];
	for(var j=0;j<map.length;j++){
		t.push(map[j]);
	}
	t[position]=1;
	var mark=this.checkMap(t);
	if(mark==1){
		return score;
	}else if(mark==2){
		return this.cpuGo(t, score/10).s;
	}
	return 0;
}
//检查棋盘判断胜负，return：0=平，1=胜，-1=负，2=继续
play.checkMap=function(map){
	var temp=[0,0,0,0,0,0,0,0];//行1,2，3，列1,2,3，斜1,2
	temp[0]=map[1]+map[2]+map[3];
	temp[1]=map[4]+map[5]+map[6];
	temp[2]=map[7]+map[8]+map[9];
	temp[3]=map[1]+map[4]+map[7];
	temp[4]=map[2]+map[5]+map[8];
	temp[5]=map[3]+map[6]+map[9];
	temp[6]=map[1]+map[5]+map[9];
	temp[7]=map[3]+map[5]+map[7];
	for(var i=0;i<temp.length;i++){
		if(temp[i]==3){
			return 1;
		}
		if(temp[i]==-3){
			return -1;
		}
	}
	for(var i=1;i<=9;i++){
		if(map[i]==0){
			return 2;
		}
	}
	return 0;
}
//清空棋盘
play.clearMap=function(){
	for(var i=1;i<=9;i++){
		this.map[i]=0;
		document.getElementById("td_"+i).innerHTML="";
	}
	document.getElementById("text").innerHTML="AiTictactoe, Your Turn!";
}
