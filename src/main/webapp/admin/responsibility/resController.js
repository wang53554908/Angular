'use strict';

app.controller('resListController', function($scope,$rootScope, $resource,$state,$http,$modal,menuService,$timeout,$q,Common) {
	var reSearch = function() {  
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': $scope.paginationConf.currentPage,  
	        'pageSize': $scope.paginationConf.itemsPerPage,  
	        params:{
	        	'name': $scope.name
	        }
	    }; 
		if($rootScope.resSearchParamCache!=null&&!angular.equals({}, $rootScope.resSearchParamCache)) {
			 // 不为空
			$scope.postData = $rootScope.resSearchParamCache;
	    	$rootScope.resSearchParamCache = {};
		}
	    $http({  
            method:'POST',  
            url:"res/list",  
            data:$scope.postData
          })    
        .success(function(response,header,config,status){  
        	//响应成功  
        	$scope.paginationConf.totalItems = response.data.totalRecord; //总条数 
        	$scope.conf.currentPage = response.data.pageNo;
        	$scope.conf.itemsPerPage = response.data.pageSize;
 	        $scope.data = response.data.results; //具体内容  

        }).error(function(data,header,config,status){  
        //处理响应失败  
        });  
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
	}
	
	//全选
    var selected = false;
    $scope.selectAll = function(data){
        selected = !selected;
        angular.forEach(data,function(item){
            item.selected = selected;
        });
    }
    
    $scope.detail=function(id){
    	$rootScope.resSearchParamCache = $scope.postData;
    	$state.go("app.res.detail",{id:id,show:0});
    }
    
    $scope.edit=function(id){
    	$rootScope.resSearchParamCache = $scope.postData;
    	$state.go("app.res.edit",{id:id,show:1});
    }
    var tree;
    $scope.my_data = [];
	$scope.my_tree = tree = {};
	
	$scope.initTree = function(data){
		$scope.isInitFinish = true;
	    $scope.doing_async = true;
	    $scope.my_data =  data;
	    return $timeout(function() {
	      $scope.doing_async = false;
	      return tree.expand_all();
	    }, 1000);
	}
    
	$scope.isInitFinish = false;
    $scope.selectOne = function(item,data){
    	if(item.selected){
    		return;
    	}
    	item.selected = true;
    	angular.forEach(data,function(d){
    		if(item!=d){
    		  d.selected = false;
    		}
    	});
    	item.selected = true;
    	$scope.selectItem = item;
    	menuService.getMenuTree(item.id).then(function(result){
  		  $scope.initTree(result);
  	    });
    	$scope.isInitFinish = true;
    };
    
    $scope.saveResMenu = function(resId){
    	var ids = tree.get_all_selected_branch_id();
    	if(ids.length==0){
    		return;
    	}
  	    var delDefered = $q.defer();
  	    $http({  
          method:'POST',  
          url:"res/saveResMenu",  
          data:{'menuIds':ids.join(","),'resId':resId},
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
    	   delDefered.resolve(response.data);
        }).error(function(data,header,config,status){  
       });  
        var promise = delDefered.promise;
        promise.then(function(result){
      	  menuService.getMenuTree(resId).then(function(result){
      		  $scope.initTree(result);
          	  $scope.$emit('toaster', "success","","保存成功！");
      	  },function(error){
      		$scope.$emit('toaster', "error","","保存失败！");
      	  });
        });
    };
    
    $scope.delRes = function(id){
    	Common.openConfirmWindow('提示！','确定删除吗？').then(function() {
    		var $com = $resource("res/delete/:id/",{id:'@id'});
            $com.delete({id:id},function(response){
            	$scope.$emit('toaster', "success","","删除成功！");
            	reSearch();
            },function(error){
            	$scope.$emit('toaster', "error","","删除失败！");
            });
    	});
    };
    
    $scope.newRes = function(id,type){
        var modalInstance = $modal.open({
          templateUrl: 'admin/responsibility/new.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
        	  data:function(){
        		  return {id:id,type:type};
        	  }
          }
        });
        modalInstance.result.then(function (res) {
          $scope.res = res;
          $scope.submit(id);
          //$scope.reSearch();
//          $state.reload();
        }, function () {
        });
    };
    
    $scope.submit = function(id){
    	if(!!id){
    		  var $com = $resource("res/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:id},$scope.res,function(data){
	              $scope.$emit('toaster', "success","提示","更新成功");  
	              reSearch();
	          },function(error){
	        	  $scope.$emit('toaster', "error","error","更新失败");  
	          });
    	}else{
		      var $com = $resource("res/save");
		      $com.save($scope.res,function(data){
		    	  $scope.$emit('toaster', "success","提示","新增成功");
		    	  reSearch();
		      },function(error){
		    	  $scope.$emit('toaster', "error","error","新增失败");
		      });
    	}
	};
	
	$scope.selectOneMenu = false;
	
	$scope.my_tree_handler = function(branch) {
		$scope.selectOneMenu = true;
		$scope.menu = branch;
		btnSearch();
	};
	
	var btnSearch = function() {
		if(angular.equals({}, $scope.menu)){
			return;
		}
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': 1,  
	        'pageSize': 999,  
	        params:{
	        	'menuId':$scope.menu.id,
	        	'resId':$scope.selectItem.id
	        }
	    }; 
	    $http({  
            method:'POST',  
            url:"button/res_menu_button_list",  
            data:$scope.postData
          })    
        .success(function(response,header,config,status){  
 	        $scope.buttons = response.data.results; 
        }).error(function(data,header,config,status){  
        //处理响应失败  
        });  
	};  
	
	$scope.selectButton = function(item,data){
		if(item.selected){
	    	item.selected = false;
	    }else{
	    	item.selected = true;
	    }
	};
	
	$scope.saveResButton = function(){
		var btns = [];
		angular.forEach($scope.buttons,function(item){
			if(item.selected==true){
				btns.push(item.id);
			}
		});
		$http({  
	          method:'POST',  
	          url:"res/saveResMenuButton",  
	          data:{'buttonIds':btns.join(","),'resId':$scope.selectItem.id,'menuId':$scope.menu.id},
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
        	$scope.$emit('toaster', "success","提示","保存成功");
        }).error(function(data,header,config,status){
        	$scope.$emit('toaster', "error","","保存失败");
       }); 
	};
	 
});

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$resource','data',function($scope, $modalInstance,$resource,data) {
	//items为传过来的值 
    $scope.data = data;
    
    $scope.edit_model = !!$scope.data.id;
    $scope.showControlButton = true;
    $scope.title="新增";
    if($scope.data.type==0){
    	$scope.title="查看";
    	$scope.showControlButton = false;
    }else if($scope.data.type==1){
    	$scope.title="编辑";
    }
	if($scope.edit_model){
		var $com = $resource("res/:id/",{id:'@id'});
        var resp = $com.get({id:$scope.data.id},function(response){
          $scope.res = response.data;
        });
	}
	
    $scope.ok = function () {
        $modalInstance.close($scope.res);
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
; 

app.controller('resDetailController',['$rootScope','$scope','$resource','$stateParams','$state','$http', 'toaster',
                                      function($rootScope,$scope, $resource, $stateParams,$state,$http,toaster) {
	  $scope.edit_mode = !!$stateParams.id;
	  if(0==$stateParams.show){
		  $scope.show = true;
	  }else{
		  $scope.show = false;
	  }
	  if($scope.edit_mode){
	      var $com = $resource("res/:id/",{id:'@id'});
	      var resp = $com.get({id:$stateParams.id},function(response){
	          $scope.res = response.data;
	      });
	  }
	  else{
	      $scope.data = {};
	  }
	  $scope.submit = function(){
	      if($scope.edit_mode){
	          var $com = $resource("res/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:$stateParams.id},$scope.res,function(data){
	              $scope.$emit('toaster', "success","提示","更新成功");  
	        	  $state.go('app.res.list');
	          },function(error){
	        	  $scope.$emit('toaster', "error","error","更新失败");  
	          });
	      }
	      else{
	          var $com = $resource("res/save");
	          $com.save($scope.res,function(data){
	        	  $scope.$emit('toaster', "success","提示","新增成功");
	              $state.go('app.res.list');
	          },function(error){
	        	  $scope.$emit('toaster', "error","error","新增失败");  
	          });
	      }
	  };
	  $scope.pop=function(){
		  toaster.pop('success', '提示', '修改成功');
	  };
}]);
app.run(['$rootScope','$resource',function($rootScope,$resource){
	 $rootScope.resSearchParamCache={};
}]);