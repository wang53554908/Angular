'use strict';

app.controller('empListController', function($scope,$rootScope, $resource,$state,$http,$injector) {
	var reSearch = function() {  
		$scope.postData = {  
	        //发送给后台的请求数据  
	        'pageNo': $scope.paginationConf.currentPage,  
	        'pageSize': $scope.paginationConf.itemsPerPage,  
	        params:{
	        	'name': $scope.name
	        }
	    }; 
		if($rootScope.empSearchParamCache!=null&&!angular.equals({}, $rootScope.empSearchParamCache)) {
			 // 不为空
			$scope.postData = $rootScope.empSearchParamCache;
	    	$rootScope.empSearchParamCache = {};
		}
	    $http({  
            method:'POST',  
            url:"emp/list",  
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
    	$rootScope.empSearchParamCache = $scope.postData;
    	$state.go("app.emp.detail",{id:id,show:0});
    }
    
    $scope.edit=function(id){
    	$rootScope.empSearchParamCache = $scope.postData;
    	$state.go("app.emp.edit",{id:id,show:1});
    }
    
});

app.controller('empDetailController', function($rootScope,$scope, $resource, $stateParams,$state,$http,$q) {
	  $scope.getEnums = function(){
		  var orgDeferred = $q.defer();
		  var empDeferred = $q.defer();
		  $http({
				method : 'POST',
				url : "org/list",
				data : {
					'needPage' : false
				}
			  }).success(function(response, header, config, status) {
				  orgDeferred.resolve(response.data.results); // 具体内容
			  }).error(function(data, header, config, status) {
					// 处理响应失败
			  }); 
		  $http({  
	          method:'POST',  
	          url:"emp/empTree",
	          data:{}
	        })    
	      .success(function(response,header,config,status){  
	    	  empDeferred.resolve(response.data); // 具体内容
//	      	  $scope.empEnums = response.data;
//	      	  $scope.nodes = response.data;
	      });
		  
		  $q.all({
			  orgEnum:orgDeferred.promise,
			  empEnum:empDeferred.promise,
		  }).then(function(results){
			  $scope.orgEnums=results.orgEnum;
			  $scope.empEnums = results.empEnum;
	      	  $scope.nodes = results.empEnum;
		  });
	  };
	  
	  
	  
	  $scope.edit_mode = !!$stateParams.id;
	  if(0==$stateParams.show){
		  $scope.show = true;
	  }else{
		  $scope.show = false;
	  }
	  if($scope.edit_mode){
	      var $com = $resource("emp/:id/?",{id:'@id'});
	      var resp = $com.get({id:$stateParams.id},function(response){
	          $scope.emp = response.data;
	      });
	  }
	  else{
	      $scope.data = {};
	  }
	  
	  $scope.submit = function(){
	      if($scope.edit_mode){
	          var $com = $resource("emp/:id/?",{id:'@id'},{
	              'update': { method:'POST' },
	          });
	          $com.update({id:$stateParams.id},$scope.emp,function(data){
	              $state.go($rootScope.previousState,$rootScope.previousStateParams);
	          });
	      }
	      else{
	          var $com = $resource("emp/?");
	          $com.save($scope.emp,function(data){
	              $state.go('app.emp.list');
	          });
	      }
	  };
	  
	  $scope.isDisabled = true;
	  //部门级别change
	  $scope.levelChange = function(){
		  if($scope.emp.level==1){
			  $scope.isDisabled=true;
		  }else{
			  $scope.isDisabled=false;
			  var levels = [];
		      levels.push($scope.emp.level-1);
			  $http({  
		            method:'POST',  
		            url:"emp/empTree",
		            data:{"levels":levels}
		          })    
		        .success(function(response,header,config,status){  
		        	$scope.empEnums = response.data;
		        	$scope.nodes = response.data;
		        });
			  
		  }
	  };
	  
	  
	  $scope.selectItem = function(id,name){
		  $scope.parentName = name;
		  $scope.emp.parentId = id;
	  };
});
app.run(['$rootScope','$resource',function($rootScope,$resource){
	 $rootScope.empSearchParamCache={};
}]);