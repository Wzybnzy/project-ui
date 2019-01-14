define(function(){
	var getuid = function(){
		var uid = localStorage.getItem('uid') || '';
		if(!uid){ //没有uid
			mui.ajax('/users/adduser',{
				data:{name:'王坤'},
				type:'post',
				success:function(data){
					if(data.code == 0){
						uid = data.id;
						localStorage.setItem('uid',uid);
					}
				}
			})
		} else {
			uid = uid;
		}
		return uid;
		
	}
	return getuid;
});