import Vue from 'vue'

//弹框
Vue.prototype.showDialog = function (value) {
	this.$kiko_message({
		message: value,
		time: 2000
	})
}

//手机号码验证
Vue.prototype.checkPhone = function(phone){ 
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        return false; 
    } 
}

//密码验证
Vue.prototype.checkPassword = function  (pwd){
	if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(pwd))){
		return false;
	}
}
// 姓名中英文验证
Vue.prototype.checkChineseLen=function(name_pd){	
	if(/^[\u4e00-\u9fa5]+$/i.test(name_pd.value)){
		if(name_pd.value.length < 2 ){
			this.showDialog('姓名最短为2个汉字或3个英文字符');
			return false;
		}else if(name_pd.value.length > 10){
			this.showDialog('姓名最长为10个汉字或20个英文字符');
			return false;
		}else{
			return true;
		}
	}else if(/^([A-Za-z]+\s?)*[A-Za-z]$/i.test(name_pd.value)){
		if(name_pd.value.length < 3 ){
			 this.showDialog('姓名最短为2个汉字或3个英文字符');
			 return false;
		}else if(name_pd.value.length > 20){
			 this.showDialog('姓名最长为10个汉字或20个英文字符');
			 return false;
		}else{
			return true;
		}
	}else {
		 this.showDialog('请输入格式正确的中文或英文字符');
		 return false;
	}
}
// 邮箱验证
Vue.prototype.checkEmail=function(mail){
	if(!(/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/.test(mail))){
		return false;
	}
}
// 联系电话
Vue.prototype.checkLinkphone=function(linkphone){
	if(!(/^(0\d{2,3}-?)?\d{7,8}$/.test(linkphone) || /^1(3|4|5|7|8)\d{9}$/.test(linkphone))){
			return false;
	}
}
// 姓名验证
Vue.prototype.checkChineseOnly =function(word1){
	if(!(/^[\u4E00-\u9FA0]{0,2}$/.test(word1))){
		return false;
	}
}
// 中英姓名验证
function checkChinese (word){
	if(!(/^[\u4E00-\u9FA0]{2,10}|[A-Za-z]{3,20}$/.test(word))){
		return false;
	}
}


/* 身份证号验证 */
function checkIDcard (IDcard){
	if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(IDcard))){
		return false;
	}
}


//短信验证码
Vue.prototype.getnoteCode = (number,obj,disabled) => {
	obj.style.color = '#a2a7a8';
	obj.innerHTML = number+'s后重新发送';
	var timer = setInterval(function(){
		number--;
		obj.innerHTML = number+'s后重新发送';
		if(number <= 0){
			clearInterval(timer);
			obj.innerHTML = '获取验证码';
			obj.style.color = '#47cce2';
		}
	},1000)
}

// $('.side_right').css('minHeight',document.documentElement.clientHeight-241);
// $('body').css('minHeight',document.documentElement.clientHeight-1);


//防止按钮多次提交
/*function stopBtn (_this){
	clearInterval(timer);
	$(_this).attr('disabled','disabled');
	var timer = setInterval(function(){
		$(_this).removeAttr('disabled');
	},3000);
}
function returnBtn (_this){
	$(_this).removeAttr('disabled');
}*/
