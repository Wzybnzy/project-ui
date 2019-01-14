define(function(){
	var getFormat = function(data,len){
		var pageNum = Math.ceil(data.length/ len);
		console.log(pageNum);
		// console.log(data.splice(0,15),data);
		var Arr = [];
		for(var i = 0; i<pageNum;i++){
			Arr.push(data.splice(0,len));
		}
		return Arr;
	}
	return getFormat;
});