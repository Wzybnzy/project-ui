require(['../js/config.js'],function(){
	require(['mui','picker','poppicker'],function(mui){
		console.log('abbbill');
		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth() +1;
		var nowDate = new Date().getDate();
		var billtime = document.querySelector('#billtime');
		var dtPicker;
		var money = document.querySelector('#money');
		init();
		function init(){
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider({
			  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			//初始化日期
			dtPicker = new mui.DtPicker({type:'date'}); 
			billtime.innerHTML = nowMonth + '月'+ nowDate + '日';
		}
		addEvent();
		function addEvent(){
			//点击的时间
			billtime.addEventListener('tap',function(){
				 dtPicker.show(function (selectItems) { 
					console.log(selectItems);//{text: "2016",value: 2016} 
					// console.log(selectItems.m);//{text: "05",value: "05"} 
					billtime.innerHTML = selectItems.m.text + '月' + selectItems.d.text + '日';
				})
			})
			//点击键盘
			mui('#keycord').on('tap','li',function(){
				var txt = this.innerHTML;
				console.log(txt);
				
				if(txt == 'X'){
					money.value = money.value.substr(0,money.value.length -1);
				} else if(txt == '.' || txt == '0'){
					money.value = '0.';
				}
				else {
					money.value += txt;
				}
			});
		}
		
	})
})