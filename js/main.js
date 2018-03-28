window.onload = function() {
	main.app.search();
	main.app.picFade();
	main.app.showList();
	main.app.imgScroll();
}

var main = {};//命名空间
main.tools = {};

main.tools.getByClass = function(oParent,name) {
	var elements = oParent.getElementsByTagName('*');
	var arr = [];

	for(var i = 0; i < elements.length; i ++) {
		if(elements[i].className == name) {
			arr.push(elements[i]);
		}
	}

	return arr;
}

main.tools.getStyle = function(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	}
}

main.ui = {};

main.ui.textChange = function(obj,str) {
	obj.onfocus = function() {
		if(this.value == str) {
			this.value = "";
		}
	};
	obj.onblur = function() {
		if(this.value == '') {
			this.value = str;
		}
	};
}

main.ui.fadeIn = function(obj) {
	var iOpa = main.tools.getStyle(obj,'opacity');
	if(iOpa == 1) {
		return false;
	}

	var value = 0;

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var speed = 5;
		if(value == 100) {
			clearInterval(obj.timer);
		} else {
			value += speed;
		}
		obj.style.opacity = value/100;
	},30);
}

main.ui.fadeOut = function(obj) {
	var iOpa = main.tools.getStyle(obj,'opacity');
	if(iOpa == 0) {
		return false;
	}

	var value = 100;

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var speed = -5;
		if(value == 0) {
			clearInterval(obj.timer);
		} else {
			value += speed;
		}
		obj.style.opacity = value/100;
	},30);
}

main.ui.moveLeft = function(obj,old,now) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var speed = (now - old) / 10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(now == old) {
			clearInterval(obj.timer);
		} else {
			old += speed;
			obj.style.left = old + 'px';
		}
	},30);
}

main.app = {};

main.app.search = function() {
	var otext1 = document.getElementById('text1');
	var otext2 = document.getElementById('text2');

	main.ui.textChange(otext1,'Search website');
	main.ui.textChange(otext2,'Search website');
}

main.app.picFade = function() {
	var obanner = document.getElementById('ad');
	var olis = obanner.getElementsByTagName('li');
	var iNow = 0;
	var timer = setInterval(auto,'3000');
	var oleft = main.tools.getByClass(obanner,'left')[0];
	var oright = main.tools.getByClass(obanner,'right')[0];
	var arrowL = oleft.getElementsByTagName('img')[0];
	var arrowR = oright.getElementsByTagName('img')[0];

	function auto() {
		if(iNow == olis.length-1) {
			iNow = 0;
		} else {
			iNow ++;
		}

		for(var i = 0; i < olis.length; i ++) {
			main.ui.fadeOut(olis[i]);
		}
		main.ui.fadeIn(olis[iNow]);
	}
	function backAuto() {
		if(iNow == 0) {
			iNow = olis.length-1;
		} else {
			iNow --;
		}

		for(var i = 0; i < olis.length; i ++) {
			main.ui.fadeOut(olis[i]);
		}
		main.ui.fadeIn(olis[iNow]);
	}


	oleft.onmouseover = function() {
		/*this.style.display = 'block';*/  //移入mouseover不能让箭头显示，为什么呢？？
		clearInterval(timer);
	};
	oleft.onmouseout = function() {
		/*this.style.display = 'none';*/
		timer = setInterval(auto,'3000');
	};
	oright.onmouseover = function() {
		/*this.style.display = 'block';*/
		clearInterval(timer);
	};
	oright.onmouseout = function() {
		/*this.style.display = 'none';*/
		timer = setInterval(auto,'3000');
	};
	arrowL.onclick = function() {
		backAuto();
	}
	arrowR.onclick = function() {
		auto();
	}

}

main.app.showList = function() {
	var oSort = document.getElementById('sortId');
	var oDd = oSort.getElementsByTagName('dd');
	var oUl = oSort.getElementsByTagName('ul');
	var oH2 = oSort.getElementsByTagName('h2');

	for(var i=0; i<oDd.length; i++) {
		oDd[i].index = i;
		oDd[i].onclick = function(ev) {
			var ev = ev || window.event;
			var This = this;
			for(var j=0; j<oUl.length; j++) {
				oUl[j].style.display = 'none';
			}
			oUl[this.index].style.display = 'block';

			document.onclick = function() {
				oUl[This.index].style.display = 'none';
			}
			ev.cancelBubble = true;
		}
	}

	for(var i=0; i<oUl.length; i++) {
		oUl[i].index = i;
		(function(ul) {
			var oLi = ul.getElementsByTagName('li');

			for(var j=0; j<oLi.length; j++) {
				oLi[j].onmouseover = function() {
					this.className = 'active';
				}
				oLi[j].onmouseout = function() {
					this.className = '';
				}
				oLi[j].onclick = function(ev) {
					var ev = ev || window.event;
					oH2[this.parentNode.index].innerHTML = this.innerHTML;
					this.parentNode.style.display = 'none';
					ev.cancelBubble = true;
				}
			}
		})(oUl[i])

	}
}

main.app.imgScroll =function() {
	var oScroll = document.getElementById('scrollId');
	var oUl = oScroll.getElementsByTagName('ul')[1];
	var oLi = oUl.getElementsByTagName('li');
	var leftBtn = main.tools.getByClass(oScroll,'btn_left')[0];
	var rightBtn = main.tools.getByClass(oScroll,'btn_right')[0];;
	var iNow = 0;

	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = oLi.length * oLi[0].offsetWidth + 'px';
	leftBtn.onclick = function() {
		if(iNow == oLi.length/2) {
			iNow = 0;
			oUl.style.left = 0;
		}
		main.ui.moveLeft(oUl,-iNow*oLi[0].offsetWidth,-(iNow+1)*oLi[0].offsetWidth);
		iNow ++;
	}

	rightBtn.onclick = function() {
		if(iNow == 0) {
			iNow = oLi.length / 2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		main.ui.moveLeft(oUl,-iNow*oLi[0].offsetWidth,-(iNow-1)*oLi[0].offsetWidth);
		iNow --;
	}
}