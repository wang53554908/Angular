'use strict';

app.controller('positionController', function($scope,$rootScope, $resource,$state,$http,$injector,$timeout,$q,$modal,positionService,empService,Common) {
	
	var positionDeferred = $q.defer();
	var orgDeferred = $q.defer();
	
	var tree,positionEnums;
	$scope.isShow = false;
	$scope.isInitFinish = false;
	$scope.position = {};
	
	$scope.my_data = [];
	$scope.my_tree = tree = {};
	
	var getOrgEnums = function(){
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
		return orgDeferred.promise;
	}
	
	var getPositionEnums = function(){
		$http({  
	        method:'POST',  
	        url:"position/positionTree",
	        data:{}
	      })    
	    .success(function(response,header,config,status){  
	    	positionDeferred.resolve(response.data);
	    });
		return positionDeferred.promise;
	}
	
	$q.all([getPositionEnums(),getOrgEnums()]).then(function(result){
		positionEnums = result[0];
		$scope.orgEnums=result[1];
		$scope.initTree(positionEnums);
	});
	
	empService.getEmpTree().then(function(result){
		$scope.nodes = result;
	});
	
	$scope.selectItem = function(id,name){
		  $scope.position.employeeName = name;
		  $scope.position.employeeId = id;
	};
	
	$scope.initTree = function(data){
		$scope.isInitFinish = true;
	    $scope.doing_async = true;
	    $scope.my_data =  data;
	    return $timeout(function() {
	      $scope.doing_async = false;
	      return tree.expand_all();
	    }, 1000);
	}
	$scope.my_tree_handler = function(branch) {
		var selectBranch = tree.get_selected_branch();
		$scope.isShow = true;
		if(branch.id){
			$scope.edit_mode = true;
			var $com = $resource("position/:id/",{id:'@id'});
		    var resp = $com.get({id:branch.id},function(response){
		          $scope.position = response.data;
		    });
		}else{
			$scope.edit_mode = false;
			$scope.position.name="";
			$scope.position.orgId="";
			$scope.position.parentId = branch.pid;
			$scope.position.employeeName="";
			$scope.position.employeeId="";
		}
	};
	
	$scope.add_position = function(type) {
		var selectBranch = tree.get_selected_branch();
		if(type==0){//root
			$scope.position.level=1;
			tree.add_root_branch({
		        label: '点击编辑新职位',
		        pid:'',
		        level:1
		    });
			return tree.select_branch(tree.get_last_sibling(selectBranch));
		}
		if(type==1&&!selectBranch){
			$scope.$emit('toaster', "error","","请选择上级职位！");  
			return;
		}
		if(!selectBranch.id){
			$scope.$emit('toaster', "error","","请先创建上级职位！");  
			return;
		}
		if(selectBranch.level>=3){
			$scope.$emit('toaster', "error","","最多只能创建3级职位！");  
			return;
		}
	    var b;
	    b = tree.get_selected_branch();
	    $scope.position.level=b.level+1;
	    tree.add_branch(b, {
	        label: '点击编辑新职位',
	        pid:b.id,
	        level:b.level+1,
	        children:[]
	    });
	    tree.select_branch(tree.last_descendant(selectBranch));
	};
	
	$scope.submit = function(){
		if($scope.edit_mode){
			var $com = $resource("position/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	        });
	        $com.update({id:$scope.position.id},$scope.position,function(data){
	        	tree.get_selected_branch().label=$scope.position.name;
		    	$scope.$emit('toaster', "success","","职位修改成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","职位修改失败！");
	        });
		}else{
			var $com = $resource("position/save");
			$com.save($scope.position,function(data){
	            var selectBranch = tree.get_selected_branch();
	            selectBranch.id = data.data.id;
	            selectBranch.label = data.data.label;
	            selectBranch.parentId = data.data.parentId;
	            selectBranch.orgId = data.data.orgId;
	            selectBranch.employeeId = data.data.employeeId;
	            $scope.employeeName = $scope.employeeName;
	            $scope.edit_mode = true;
	            $scope.$emit('toaster', "success","","职位创建成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","职位创建失败！");  
	        });
		}
	}
	
	$scope.del = function(){
		var selectBranch = tree.get_selected_branch();
		if(!selectBranch){
			$scope.$emit('toaster', "error","","请选择要删除的职位！");
			return;
		}
		var ids = [];
		angular.forEach(tree.get_all_branch(selectBranch,true),function(data){
			ids.push(data.id);
		});
		if(ids.length>0){
            //弹出删除确认
//            var modalInstance = $modal.open({
//                templateUrl: 'admin/confirm.html',
//                controller: 'ConfirmController',
//                size:'sm',
//            });
            Common.openConfirmWindow('提示！','确定删除吗？').then(function() {
            	  var delDefered = $q.defer();
        		  var $com = $resource("position/deletes/");
                  $com.delete({'ids':ids.join(",")},function(response){
                	  delDefered.resolve(response.data);
                  },function(error){
                	  delDefered.reject(error);
                  });
                  var promise = delDefered.promise;
                  promise.then(function(result){
                	  positionService.getPositionTree().then(function(result){
                		  $scope.isShow = false;
                		  $scope.initTree(result);
                    	  $scope.$emit('toaster', "success","","职位删除成功！");
                	  });
                  },function(error){
                	  $scope.$emit('toaster', "error","error","职位删除失败！");
                  });
            });
        }
	};
	
	$scope.getSelectPositionId = function(){
		alert(tree.get_all_selected_branch_id());
	};
});

app.run(['$rootScope','$resource',function($rootScope,$resource){
}]);