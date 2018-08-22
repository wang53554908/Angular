'use strict';

app.controller('orgListController', function($scope,$rootScope, $resource,$state,$http,$modal) {
	var reSearch = function() {  
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': $scope.paginationConf.currentPage,  
	        'pageSize': $scope.paginationConf.itemsPerPage,  
	        params:{
	        	'name': $scope.name
	        }
	    }; 
		if($rootScope.orgSearchParamCache!=null&&!angular.equals({}, $rootScope.orgSearchParamCache)) {
			 // 不为空
			$scope.postData = $rootScope.orgSearchParamCache;
	    	$rootScope.orgSearchParamCache = {};
		}
	    $http({  
            method:'POST',  
            url:"org/list",  
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
    $scope.selectAll = function(){
        selected = !selected;
        angular.forEach($scope.data,function(item){
            item.selected = selected;
        });
    }
    
    $scope.detail=function(id){
    	$rootScope.orgSearchParamCache = $scope.postData;
    	$state.go("app.org.detail",{id:id,show:0});
    }
    
    $scope.edit=function(id){
    	$rootScope.orgSearchParamCache = $scope.postData;
    	$state.go("app.org.edit",{id:id,show:1});
    }
    
});

app.controller('orgDetailController',['$rootScope','$scope','$resource','$stateParams','$state','$http', 'toaster',
                                      function($rootScope,$scope, $resource, $stateParams,$state,$http,toaster) {
	  $scope.edit_mode = !!$stateParams.id;
	  if(0==$stateParams.show){
		  $scope.show = true;
	  }else{
		  $scope.show = false;
	  }
	  if($scope.edit_mode){
	      var $com = $resource("org/:id/",{id:'@id'});
	      var resp = $com.get({id:$stateParams.id},function(response){
	          $scope.org = response.data;
	      });
	  }
	  else{
	      $scope.data = {};
	  }
	  $scope.submit = function(){
	      if($scope.edit_mode){
	          var $com = $resource("org/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:$stateParams.id},$scope.org,function(data){
	              $scope.$emit('toaster', "success","提示","更新成功");  
	        	  $state.go('app.org.list');
	          },function(error){
	        	  $scope.$emit('toaster', "error","error","更新失败"); 
	          });
	      }
	      else{
	          var $com = $resource("org/save");
	          $com.save($scope.org,function(data){
	        	  $scope.$emit('toaster', "success","提示","新增成功");
	              $state.go('app.org.list');
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
	 $rootScope.orgSearchParamCache={};
}]);