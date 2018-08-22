'use strict';

app.controller('buttonListController', function($scope,$rootScope, $resource,$state,$http,$modal,menuService,$timeout,$q,Common) {
	
	//menu list
	var tree,menuEnums;
	
	$scope.menu = {};
	$scope.button = {};
	
	$scope.my_data = [];
	$scope.my_tree = tree = {};
	
	menuService.getMenuTree("").then(function(data){
		$scope.initTree(data);
	});
	
	$scope.initTree = function(data){
	    $scope.doing_async = true;
	    $scope.my_data =  data;
	    return $timeout(function() {
	      $scope.doing_async = false;
	      return tree.expand_all();
	    }, 1000);
	}
	//get button by menuId
	$scope.my_tree_handler = function(branch) {
		$scope.menu = branch;
		reSearch();
	};
	
	var reSearch = function() {
		if(angular.equals({}, $scope.menu)){
			return;
		}
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': $scope.paginationConf.currentPage,  
	        'pageSize': $scope.paginationConf.itemsPerPage,  
	        params:{
	        	'name': $scope.name,
	        	'menuId':$scope.menu.id
	        }
	    }; 
		if($rootScope.menuSearchParamCache!=null&&!angular.equals({}, $rootScope.menuSearchParamCache)) {
			 // 不为空
			$scope.postData = $rootScope.menuSearchParamCache;
	    	$rootScope.menuSearchParamCache = {};
		}
	    $http({  
            method:'POST',  
            url:"button/list",  
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
            reSearch();
        }
	}
	
    
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
    };
    
    $scope.delButton = function(id){
    	Common.openConfirmWindow('提示！','确定删除吗？').then(function() {
    		var $com = $resource("button/delete/:id/",{id:'@id'});
            $com.delete({id:id},function(response){
            	$scope.$emit('toaster', "success","","删除成功！");
            	reSearch();
            },function(error){
            	$scope.$emit('toaster', "error","","删除失败！");
            });
    	});
    };
    
    $scope.addButton = function(id,type){
        var modalInstance = $modal.open({
          templateUrl: 'admin/button/new.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
        	  data:function(){
        		  return {id:id,type:type};
        	  }
          }
        });
        modalInstance.result.then(function (button) {
          $scope.button = button;
          $scope.submit(id);
          //$scope.reSearch();
//          $state.reload();
        }, function () {
        });
    };
    
    $scope.submit = function(id){
    	$scope.button.menuId = $scope.menu.id;
    	if(!!id){
    		  var $com = $resource("button/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:id},$scope.button,function(data){
	              $scope.$emit('toaster', "success","提示","更新成功");  
	              reSearch();
	          },function(error){
	        	  $scope.$emit('toaster', "error","error","更新失败");  
	          });
    	}else{
		      var $com = $resource("button/save");
		      $com.save($scope.button,function(data){
		    	  $scope.$emit('toaster', "success","提示","新增成功");
		    	  reSearch();
		      },function(error){
		    	  $scope.$emit('toaster', "error","error","新增失败");
		      });
    	}
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
		var $com = $resource("button/:id/",{id:'@id'});
        var resp = $com.get({id:$scope.data.id},function(response){
          $scope.button = response.data;
        });
	}
	
    $scope.ok = function () {
        $modalInstance.close($scope.button);
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
; 

app.run(['$rootScope','$resource',function($rootScope,$resource){
	 $rootScope.menuSearchParamCache={};
}]);