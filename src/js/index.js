document.querySelector('#selectType').addEventListener('tap',function(){
	 var picker = new mui.PopPicker();
	 picker.setData([{value:'year',text:'年'},{value:'month',text:'月'}]);
	 picker.show(function (selectItems) {
		 console.log(selectItems);
		 document.querySelector('#selectType').innerHTML = selectItems[0].text;
		console.log(selectItems[0].text);//智子
		console.log(selectItems[0].value);//zz 
	  }) 
})

//设置日期
document.querySelector('#selectDate').addEventListener('tap',function(){
	  var dtPicker = new mui.DtPicker({type:'month'}); 
			dtPicker.show(function (selectItems) { 
				console.log(selectItems.y);//{text: "2016",value: 2016} 
				console.log(selectItems.m);//{text: "05",value: "05"} 
			})
})