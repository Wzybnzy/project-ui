require(['./js/config.js'],function(){
	require(['mui','picker','poppicker'],function(mui){
		// console.log(mui,poppicker,picker);
		mui.init();
		var picker,dtPicker,type,
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
		}
		
	});
});