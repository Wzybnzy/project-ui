require(['../js/config.js'],function(){
	require(['mui','format','getuid','picker','poppicker'],function(mui,format,getuid){
		console.log('abbbill');
		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth() +1;
		var nowDate = new Date().getDate();
		var billtime = document.querySelector('#billtime');
		var dtPicker;
		var money = document.querySelector('#money');
		var slideGroup = document.querySelector('#mui-slider-group');
		var type = 1; 
		var time;
		var uid;
		init();
		function init(){
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider({
			  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			//初始化日期
			dtPicker = new mui.DtPicker({type:'date'}); 
			billtime.innerHTML = nowMonth + '月'+ nowDate + '日'; // 2019-01-21
			time = nowYear + '-'+ nowMonth + '-'+ nowDate;
			console.log(time,'time');
			
			render();
		}
		function render(){
			//查询uid
			uid = getuid();
			//查询分类的接口
			mui.ajax('/classify/getClassify',{
				data:{
					type:type,
					uid:uid
				},
				success:function(data){
					// console.log(format(data.data,8));
					renderList(data.data);
				}
			})
		}
		function renderList(data){
			var data = format(data,8);
			var html = '';
			data.forEach(function(item){
				html += `<div class="mui-slider-item">
						<div>`;
				item.forEach(function(v){
					html += `<dl data-id="${v._id}">
								<dt>
									<span class="${v.iname}"></span>
								</dt>
								<dd>${v.cname}</dd>
							</dl>`;
				});
				html += `</div></div>`;
			});
			slideGroup.innerHTML = html;
			var gallery = mui('.mui-slider');
			gallery.slider({
			  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			
			//取一下最后一个sldie
			var lastslide = slideGroup.lastChild;
			var len = Array.from(lastslide.querySelectorAll('dl')).length;
			console.log(lastslide,len);
			if(len == 8){ 
				slideGroup.innerHTML += `<div class="mui-slider-item">
						<div>
							<dl>
								<dt>
									<span class="mui-icon mui-icon-plusempty"></span>
								</dt>
								<dd>自定义</dd>
							</dl></div></div>`;
			} else {
				lastslide.children[0].innerHTML += `<dl>
								<dt>
									<span class="mui-icon mui-icon-plusempty"></span>
								</dt>
								<dd>自定义</dd>
							</dl>`;
			}
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
			//点击tabs
			var spans = document.querySelectorAll('#bill-tabs span');
			mui('#bill-tabs').on('tap','span',function(){
				//type 类型是支出还是收入
				slideGroup.innerHTML = '';
				type = this.dataset.type;
				spans.forEach(function(item){
					item.classList.remove('active');
				})
				this.classList.add('active');
				render();
			});
			
			//点击分类
			mui('#mui-slider-group').on('tap','dl',function(){
				var dls = slideGroup.querySelectorAll('dl');
				dls.forEach(function(item){
					item.classList.remove('active');
				})
				
				if(this.children[1].innerHTML == '自定义'){
					console.log('自定义');
				} else {
					this.classList.add('active');
				}
			});
			
			//点击完成
			document.querySelector('#billsure').addEventListener('tap',function(){
				var moneyValue = money.value;
				var active = slideGroup.querySelector('.active');
				var icon = active.querySelector('span').className;
				var name = active.querySelector('dd').innerHTML;
				var cid = active.dataset.id;
				uid = getuid();
				console.log(moneyValue,icon,name,time,uid,cid);
				
				mui.ajax('/bill/addbill',{
					type:'post',
					data:{
						type:type,
						money:moneyValue,
						icon:icon,
						name:name,
						time:time,
						uid:uid,
						cid:cid
					},
					success:function(data){
						console.log(data);
						if(data.code == 0){
							console.log('添加成功');
						}
					}
				});
			})
			
			//点击时间
			document.querySelector('#billtime').addEventListener('tap',function(){
				 dtPicker.show(function (selectItems) {
					 console.log(selectItems);
					console.log(selectItems.y);//{text: "2016",value: 2016} 
					console.log(selectItems.m);//{text: "05",value: "05"} 
					time = selectItems.value;
				})
			})
		}
		
	})
})