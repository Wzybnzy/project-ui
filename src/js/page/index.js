require(['./js/config.js'],function(){
	require(['mui','getuid','picker','poppicker'],function(mui,getuid){
		// console.log(mui,poppicker,picker);
		mui.init();
		var picker,dtPicker,type,classifyArr=[],paylist,icomelist,
			nowYear = new Date().getFullYear(),
			nowMonth = new Date().getMonth() + 1,
			selectType = document.querySelector('#selectType'),
			selectDate = document.querySelector('#selectDate'),
			muiBill = document.querySelector('.mui-bill'),
			muiChart = document.querySelector('.mui-chart'),
			billYear = document.querySelector('.mui-bill-year'),
			billMonth = document.querySelector('.mui-bill-month');
		init();
		function init(){
			picker = new mui.PopPicker();
			picker.setData([{value:'year',text:'年'},{value:'month',text:'月'}]);
			dtPicker = new mui.DtPicker({type:'month'}); 
			loadClassify();
			
		}
		function loadClassify(){
			mui.ajax('/classify/getClassify',{
				data:{
					uid:getuid()
				},
				success:function(data){
					console.log(data);
					var payHtml = '',IcomeHtml = '';
					if(data.code == 0){
						data.data.forEach(function(item){
							classifyArr.push(item.cname);
							if(item.type == 1){ //支出
								payHtml += `<li>${item.cname}</li>`;
							} else {
								IcomeHtml += `<li>${item.cname}</li>`;
							}
						});
						document.querySelector('#mui-aside-list-pay').innerHTML = payHtml;
						document.querySelector('#mui-aside-list-icome').innerHTML = IcomeHtml;
						paylist = Array.from(document.querySelectorAll('#mui-aside-list-pay li'));
						icomelist = Array.from(document.querySelectorAll('#mui-aside-list-icome li'));
						loadbill();
					}
				}
			});
		}
		function loadbill(){
			
			var name = classifyArr.join(',');
			console.log(name);
			mui.ajax('/bill/getbill',{
				data:{
					uid:getuid(),
					time:selectDate.innerHTML,
					name:name
				},
				success:function(data){
					console.log(data);
				}
			});
		}
		addEvent();
		function addEvent(){
			//选择年月
			selectType.addEventListener('tap',function(){
				var titleY = document.querySelector('[data-id="title-y"]'),
					 titleM = document.querySelector('[data-id="title-m"]'),
					 pickeY = document.querySelector('[data-id="picker-y"]'),
					 pickeM = document.querySelector('[data-id="picker-m"]');
				 picker.show(function (selectItems) {
					 console.log(selectItems);
					 selectType.innerHTML = selectItems[0].text;
					 type = selectItems[0].value ;
					if(type== 'year'){ //年
						selectDate.innerHTML = nowYear;
						titleM.style.display = 'none';
						pickeM.style.display = 'none';
						titleY.style.width = '100%';
						pickeY.style.width = '100%';
						billYear.style.display = 'block';
						billMonth.style.display = 'none';
					} else if(type == 'month'){ //月
						nowMonth = nowMonth*1 < 10 ? '0' + nowMonth*1 : nowMonth*1;
						selectDate.innerHTML = nowYear + '-'+ nowMonth;
						titleM.style.display = 'inline-block';
						pickeM.style.display = 'block';
						titleY.style.width = '50%';
						pickeY.style.width = '50%';
						billYear.style.display = 'none';
						billMonth.style.display = 'block';
					}
					console.log(selectItems[0].text);//智子
					console.log(selectItems[0].value);//zz 
				  }) 
			})
			
			//设置日期
			selectDate.addEventListener('tap',function(){
				dtPicker.show(function (selectItems) { //点击确定的时候
					if(type == 'year'){
						selectDate.innerHTML = selectItems.y.text;
					} else {
						selectDate.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
					}
					console.log(selectItems.y,'selectItems.y');//{text: "2016",value: 2016} 
					console.log(selectItems.m,'selectItems.m');//{text: "05",value: "05"} 
				})
			})
			//点击tabs的时候
			mui('#mui-tabs').on('tap','span',function(){
				console.log(this.innerHTML);
				var id = this.dataset.id;
				this.classList.add('active');
				if(id == 0){ //账单
					muiChart.style.display = 'none';
					muiBill.style.display = 'block';
					this.nextElementSibling.classList.remove('active');
				} else if(id == 1){ //图表
					muiChart.style.display = 'block';
					muiBill.style.display = 'none';
					this.previousElementSibling.classList.remove('active');
				}
			});
			//点击显示侧边栏
			document.querySelector('#mui-aslide').addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas().show()
			})
			//禁止手势滑动
			var offCanvasInner =document.querySelector('#mui-off-canvas-wrap').querySelector('.mui-inner-wrap');
				offCanvasInner.addEventListener('drag', function(event) {
					event.stopPropagation();
				});
			}
			
			//点击全部支出
			
			mui('#mui-aside-list').on('tap','li',function(){
				var type = this.dataset.type;
				var list;
				console.log(type);
				this.classList.toggle('asideActive');	
				if(this.classList.contains('asideActive')){
					if(type == 'pay'){
						list = paylist;
						
					} else {
						list = icomelist;
					}
					list.forEach(function(v,i){
						v.classList.add('asideActive');
					})
					
				} else {
					if(type == 'pay'){
						list = paylist;
						
					} else {
						list = icomelist;
					}
					list.forEach(function(v,i){
						v.classList.remove('asideActive');
					})
					
				}
			});
			
			//点击所有的支出分类
			mui('#mui-aside-list-pay').on('tap','li',function(){
				this.classList.toggle('asideActive');
				var len = paylist.length;
				var lisLen = Array.from(document.querySelectorAll('#mui-aside-list-pay .asideActive')).length;
				console.log(len,lisLen);
				if(len == lisLen){
					document.querySelector('[data-type="pay"]').classList.add('asideActive');
				} else {
					document.querySelector('[data-type="pay"]').classList.remove('asideActive');
				}
			});
			//点击收入分类
			mui('#mui-aside-list-icome').on('tap','li',function(){
				this.classList.toggle('asideActive');
				var len = icomelist.length;
				var lisLen = Array.from(document.querySelectorAll('#mui-aside-list-icome .asideActive')).length;
				console.log(len,lisLen);
				if(len == lisLen){
					document.querySelector('[data-type="income"]').classList.add('asideActive');
				} else {
					document.querySelector('[data-type="income"]').classList.remove('asideActive');
				}
			});
			//点击跳转账单页面
			document.querySelector('#box').addEventListener('tap',function(){
				location.href = './page/add_bill.html';
			})
	});
});