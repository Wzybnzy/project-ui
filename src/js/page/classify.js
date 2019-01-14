require(['../js/config.js'],function(){
	require(['mui','getuid','getParams'],function(mui,getuid,getParams){
		var slidergroup = document.querySelector('#mui-slider-group');
		var addClassify = document.querySelector('#addClassify');
		init();
		function init(){
			//获取所有icon
			mui.ajax('/classify/iconlist',{
				success:function(data){
					console.log(data);
					if(data.code == 0){
						renderIcon(data.data)
					}
				}
			})
		}
		function renderIcon(data){
			console.log(data);
			// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
			// [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[16,17]]
			//   item                                    item
			var pageNum = Math.ceil(data.length/ 15);
			console.log(pageNum);
			// console.log(data.splice(0,15),data);
			var Arr = [];
			for(var i = 0; i<pageNum;i++){
				Arr.push(data.splice(0,15));
			}
			var html = '';
			Arr.forEach(function(v){
				html += `<div class="mui-slider-item">
						<div>`;
				v.forEach(function(item){
					html += `<div>
								<span class="${item.icon}">
							</div>`;
				});
				html += `</div></div>`;
			})
			slidergroup.innerHTML = html;
			var gallery = mui('.mui-slider');
				gallery.slider({
				  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			console.log(Arr);
		}
		addEvent();
		function addEvent(){
			mui('#mui-slider-group').on('tap','span',function(){
				addClassify.className = this.className;
			});
			console.log(getParams());
			//点击保存的时候
			document.querySelector('#btnClassify').addEventListener('tap',function(){
				var icon  = addClassify.className;
				var name = Classifyname.value;
				var type = getParams().type;
				var uid = getuid();
				
// 				var uid = localStorage.getItem('uid') || '';
// 				if(!uid){ //没有uid
// 					mui.ajax('/users/adduser',{
// 						data:{name:'王坤'},
// 						type:'post',
// 						success:function(data){
// 							if(data.code == 0){
// 								uid = data.id;
// 								localStorage.setItem('uid',uid);
// 							}
// 						}
// 					})
// 				} else {
// 					uid = uid;
// 				}
				
				//添加分类
				mui.ajax('/classify/addClassify',{
					type:'post',
					data:{
						icon:icon,
						name:name,
						type:type,
						uid:uid
					},
					success:function(data){
						if(data.code == 0){
							location.href = 'add_bill.html';
						}
					}
				})
				
				console.log(uid);
			})
		}
		
	})
})