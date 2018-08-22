'use strict';

app.controller('userListController', function($scope,$rootScope, $resource,$state,$http,$modal,Common,$q) {
	var reSearch = function() {  
		var defer = $q.defer();
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': $scope.paginationConf.currentPage,  
	        'pageSize': $scope.paginationConf.itemsPerPage,  
	        params:{
	        	'login': $scope.name
	        }
	    }; 
		if($rootScope.userSearchParamCache!=null&&!angular.equals({}, $rootScope.userSearchParamCache)) {
			 // 不为空
			$scope.postData = $rootScope.userSearchParamCache;
	    	$rootScope.userSearchParamCache = {};
		}
	    $http({  
            method:'POST',  
            url:"user/list",  
            data:$scope.postData
          })    
        .success(function(response,header,config,status){  
        	//响应成功  
        	$scope.paginationConf.totalItems = response.data.totalRecord; //总条数 
        	$scope.conf.currentPage = response.data.pageNo;
        	$scope.conf.itemsPerPage = response.data.pageSize;
 	        $scope.data = response.data.results; //具体内容  
 	        defer.resolve(response.data.results);

        }).error(function(data,header,config,status){  
        //处理响应失败  
        });  
	    return defer.promise;
	}  
	$scope.reSearch = reSearch;  
	//配置分页基本参数  
	$scope.paginationConf = {  
	    currentPage: 1, //起始页  
	    totalItems:1,//总共有多少条记录  
	    itemsPerPage: 10, // 每页展示的数据条数  
	    pagesLength:5,//分页条目的长度  
	    perPageOptions: [5, 10, 20] //可选择显示条数的数组  
	};  
	  
	//当页码和页面记录数发生变化时监控后台查询如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。  
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reSearch); 
	
	$scope.search=function(e){
		var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.reSearch();
        }
	};
	
	var selectedIds = [];
	//全选
    var selected = false;
    $scope.selectAll = function(data){
    	selectedIds = [];
        selected = !selected;
        angular.forEach(data,function(item){
            item.selected = selected;
            selectedIds.push(item.id);
        });
    };
    
    $scope.selectOne = function(item,data){
    	if(item.selected){
    		return;
    	}
    	selectedIds = [];
    	selectedIds.push(item.id);
    	item.selected = true;
    	angular.forEach(data,function(d){
    		if(item!=d){
    		  d.selected = false;
    		}
    	});
    	$scope.selectItem = item;
    	
    	//user position
    	getUserPosition(item.id);
    	//user res
    	getUserRes(item.id);
    };
    
    var getUserPosition = function(userId){
    	$http({  
            method:'POST',  
            url:"user/userPosition",  
            data:{userId:userId}
          })    
        .success(function(response,header,config,status){  
        	$scope.userPosition = response.data; 
        }).error(function(data,header,config,status){  
        });  
    };
    
    var getUserRes = function(userId){
    	$http({  
            method:'POST',  
            url:"user/userRes",  
            data:{userId:userId}
          })    
        .success(function(response,header,config,status){  
        	$scope.userRes = response.data; 
        }).error(function(data,header,config,status){  
        });  
    };
    
    $scope.detail=function(id){
    	$rootScope.userSearchParamCache = $scope.postData;
    	$state.go("app.user.detail",{id:id,show:0});
    };
    
    $scope.edit=function(id){
    	$rootScope.userSearchParamCache = $scope.postData;
    	$state.go("app.user.edit",{id:id,show:1});
    };
    //弹出职位选择框
    $scope.selectUserPosition = function(){
    	var selectUser = $scope.selectItem;
    	var defer = $q.defer();
    	if(selectUser==undefined){
    		$scope.$emit('toaster', "warn","","请选择一个用户！");
    		return;
    	}
    	Common.openPositionSelectWindow().then(function(result){
    		var ids = result;
    		if(ids.length==0){
    			return;
    		}
    		$http({  
    	          method:'POST',  
    	          url:"user/saveUserPosition",  
    	          data:{'positionIds':ids.join(","),'userId':$scope.selectItem.id},
    	          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
    	          transformRequest:function(obj){
    	        	  var str = [];
    	        	  for(var p in obj){
    	        		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    	        	  }
    	        	  return str.join("&");
    	          }
    	    })    
	        .success(function(response,header,config,status){  
	    	   //delDefered.resolve(response.data);
	        	//getUserPosition($scope.selectItem.id);
	        	defer.resolve(response.data);
	        	$scope.$emit('toaster', "success","","保存成功！");
	        }).error(function(data,header,config,status){  
	        	$scope.$emit('toaster', "error","提示","保存失败！"); 
	        });  
    	});
    	var promise = defer.promise;
        promise.then(function(result){
      	  $scope.reSearch().then(function(response){
          		angular.forEach(response,function(item){
              		if(item.id == selectUser.id){
              			$scope.selectOne(item,response);
              		}
              	});
            });
        });
    };
    
    $scope.delUserPosition = function(){
    	var selectUser = $scope.selectItem;
    	var defer = $q.defer();
    	if(selectUser==undefined){
    		$scope.$emit('toaster', "warn","","请选择一个用户！");
    		return;
    	}
    	var ids = [];
    	angular.forEach($scope.userPosition,function(data){
    		if(data.selected){
    			ids.push(data.positionId);
    		}
    	});
    	if(ids.length==0){
    		$scope.$emit('toaster', "warn","","请选择职位！");
    		return;
    	}
    	$http({  
	          method:'POST',  
	          url:"user/delUserPosition",  
	          data:{'positionIds':ids.join(","),'userId':$scope.selectItem.id},
	          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
	          transformRequest:function(obj){
	        	  var str = [];
	        	  for(var p in obj){
	        		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        	  }
	        	  return str.join("&");
	          }
	    })    
      .success(function(response,header,config,status){  
  	      defer.resolve(response.data);
      	  $scope.$emit('toaster', "success","","删除成功！");
      }).error(function(data,header,config,status){  
    	  $scope.$emit('toaster', "error","提示","删除失败！"); 
      });  
      var promise = defer.promise;
      promise.then(function(result){
    	  $scope.reSearch().then(function(response){
        		angular.forEach(response,function(item){
            		if(item.id == selectUser.id){
            			$scope.selectOne(item,response);
            		}
            	});
          });
      });
    };
    
    $scope.setDefaultPosition = function(positionId){
    	var selectUser = $scope.selectItem;
    	var defer = $q.defer();
    	$scope.user = {};
    	var $com = $resource("user/:id/",{id:'@id'},{
            'update': { method:'POST' },
        });
    	$scope.user.currentPosId = positionId;
        $com.update({id:$scope.selectItem.id},$scope.user,function(data){
            $scope.$emit('toaster', "success","提示","设置默认职位成功");  
            defer.resolve(data);
        },function(error){
        	$scope.$emit('toaster', "error","提示","设置默认职位失败！"); 
        });
        var promise = defer.promise;
        promise.then(function(result){
        	//$scope.selectOne($scope.selectItem,$scope.user);
        	//getUserPosition($scope.selectItem.id);
        	$scope.reSearch().then(function(response){
        		angular.forEach(response,function(item){
            		if(item.id == selectUser.id){
            			$scope.selectOne(item,response);
            		}
            	});
        	});
        });
    };
    
  //弹出职责选择框
    $scope.selectUserRes = function(){
    	var selectUser = $scope.selectItem;
    	var defer = $q.defer();
    	if(selectUser==undefined){
    		$scope.$emit('toaster', "warn","","请选择一个用户！");
    		return;
    	}
    	Common.openResSelectWindow().then(function(result){
    		var ids = result;
    		if(ids.length==0){
    			return;
    		}
    		$http({  
    	          method:'POST',  
    	          url:"user/saveUserRes",  
    	          data:{'resIds':ids.join(","),'userId':$scope.selectItem.id},
    	          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
    	          transformRequest:function(obj){
    	        	  var str = [];
    	        	  for(var p in obj){
    	        		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    	        	  }
    	        	  return str.join("&");
    	          }
    	    })    
	        .success(function(response,header,config,status){  
	    	   //delDefered.resolve(response.data);
	        	//getUserPosition($scope.selectItem.id);
	        	defer.resolve(response.data);
	        	$scope.$emit('toaster', "success","","保存成功！");
	        }).error(function(data,header,config,status){  
	        	$scope.$emit('toaster', "error","","保存失败！");
	        });  
    	});
    	var promise = defer.promise;
        promise.then(function(result){
      	  $scope.reSearch().then(function(response){
          		angular.forEach(response,function(item){
              		if(item.id == selectUser.id){
              			$scope.selectOne(item,response);
              		}
              	});
            });
        });
    };
    
    $scope.delUserRes = function(){
    	var selectUser = $scope.selectItem;
    	var defer = $q.defer();
    	if(selectUser==undefined){
    		$scope.$emit('toaster', "warn","","请选择一个用户！");
    		return;
    	}
    	var ids = [];
    	angular.forEach($scope.userRes,function(data){
    		if(data.selected){
    			ids.push(data.resId);
    		}
    	});
    	if(ids.length==0){
    		$scope.$emit('toaster', "warn","","请选择职责！");
    		return;
    	}
    	$http({  
	          method:'POST',  
	          url:"user/delUserRes",  
	          data:{'resIds':ids.join(","),'userId':$scope.selectItem.id},
	          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
	          transformRequest:function(obj){
	        	  var str = [];
	        	  for(var p in obj){
	        		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        	  }
	        	  return str.join("&");
	          }
	    })    
      .success(function(response,header,config,status){  
  	      defer.resolve(response.data);
      	  $scope.$emit('toaster', "success","","删除成功！");
      }).error(function(data,header,config,status){  
    	  $scope.$emit('toaster', "error","","删除失败！");
      });  
      var promise = defer.promise;
      promise.then(function(result){
    	  $scope.reSearch().then(function(response){
        		angular.forEach(response,function(item){
            		if(item.id == selectUser.id){
            			$scope.selectOne(item,response);
            		}
            	});
          });
      });
    };
    
    
});

app.controller('userDetailController',['$rootScope','$scope','$resource','$stateParams','$state','$http', 'toaster',
                                      function($rootScope,$scope, $resource, $stateParams,$state,$http,toaster) {
	  $scope.edit_mode = !!$stateParams.id;
	  if(0==$stateParams.show){
		  $scope.show = true;
	  }else{
		  $scope.show = false;
	  }
	  if($scope.edit_mode){
	      var $com = $resource("user/:id/",{id:'@id'});
	      var resp = $com.get({id:$stateParams.id},function(response){
	          $scope.user = response.data;
	          if($scope.user.activeFlg=='Y'){
	        	  $scope.user.activeFlg = true;
	          }else{
	        	  $scope.user.activeFlg = false;
	          }
	      });
	  }
	  else{
	      $scope.user = {};
	  }
	  $scope.submit = function(){
		  if($scope.user.activeFlg){
        	  $scope.user.activeFlg = 'Y';
          }else{
        	  $scope.user.activeFlg = 'N';
          }
	      if($scope.edit_mode){
	          var $com = $resource("user/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:$stateParams.id},$scope.user,function(data){
	              $scope.$emit('toaster', "success","提示","更新成功");  
	        	  $state.go('app.user.list');
	          },function(error){
	        	  $scope.$emit('toaster', "error","提示","更新失败！");  
	          });
	      }
	      else{
	          var $com = $resource("user/save");
	          $com.save($scope.user,function(data){
	        	  $scope.$emit('toaster', "success","提示","新增成功");
	              $state.go('app.user.list');
	          },function(){
	        	  $scope.$emit('toaster', "error","提示","新增失败！"); 
	          });
	      }
	  };
	  $scope.pop=function(){
		  toaster.pop('success', '提示', '修改成功');
	  };
}]);
app.run(['$rootScope','$resource',function($rootScope,$resource){
	 $rootScope.userSearchParamCache={};
}]);