'use strict';

app.controller('empTreeController', function($scope,$rootScope, $resource,$state,$http,$injector,$timeout,$q,$modal,empService,Common) {
	
	var empDeferred = $q.defer();
	var orgDeferred = $q.defer();
	
	var tree,empEnums;
	$scope.isShow = false;
	$scope.isInitFinish = false;
	$scope.emp = {};
	
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
	
	var getEmpEnums = function(){
		$http({  
	        method:'POST',  
	        url:"emp/empTree",
	        data:{}
	      })    
	    .success(function(response,header,config,status){  
	    	empDeferred.resolve(response.data);
	    });
		return empDeferred.promise;
	}
	
	$q.all([getEmpEnums(),getOrgEnums()]).then(function(result){
		empEnums = result[0];
		$scope.orgEnums=result[1];
		$scope.initTree(empEnums);
	});
	
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
			var $com = $resource("emp/:id/",{id:'@id'});
		    var resp = $com.get({id:branch.id},function(response){
		          $scope.emp = response.data;
		    });
		}else{
			$scope.edit_mode = false;
			$scope.emp.name="";
			$scope.emp.orgId="";
			$scope.emp.parentId = branch.pid;
		}
	};
	
	$scope.add_emp = function(type) {
		var selectBranch = tree.get_selected_branch();
		if(type==0){//root
			$scope.emp.level=1;
			tree.add_root_branch({
		        label: '点击编辑新部门',
		        pid:'',
		        level:1
		    });
			return tree.select_branch(tree.get_last_sibling(selectBranch));
		}
		if(type==1&&!selectBranch){
			$scope.$emit('toaster', "error","","请选择上级部门！");  
			return;
		}
		if(!selectBranch.id){
			$scope.$emit('toaster', "error","","请先创建上级部门！");  
			return;
		}
		if(selectBranch.level>=3){
			$scope.$emit('toaster', "error","","最多只能创建3级部门！");  
			return;
		}
	    var b;
	    b = tree.get_selected_branch();
	    $scope.emp.level=b.level+1;
	    tree.add_branch(b, {
	        label: '点击编辑新部门',
	        pid:b.id,
	        level:b.level+1,
	        children:[]
	    });
	    tree.select_branch(tree.last_descendant(selectBranch));
	};
	
	$scope.submit = function(){
		if($scope.edit_mode){
			var $com = $resource("emp/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	        });
	        $com.update({id:$scope.emp.id},$scope.emp,function(data){
	        	tree.get_selected_branch().label=$scope.emp.name;
		    	$scope.$emit('toaster', "success","","部门修改成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","部门修改失败！");  
	        });
		}else{
			var $com = $resource("emp/save");
			$com.save($scope.emp,function(data){
	            var selectBranch = tree.get_selected_branch();
	            selectBranch.id = data.data.id;
	            selectBranch.label = data.data.label;
	            selectBranch.parentId = data.data.parentId;
	            selectBranch.orgId = data.data.orgId;
	            $scope.edit_mode = true;
	            $scope.$emit('toaster', "success","","部门创建成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","部门创建失败！");  
	        });
		}
	}
	
	$scope.del = function(){
		var selectBranch = tree.get_selected_branch();
		if(!selectBranch){
			$scope.$emit('toaster', "error","","请选择要删除的部门！");
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
        		  var $com = $resource("emp/deletes/");
                  $com.delete({'ids':ids.join(",")},function(response){
                	  delDefered.resolve(response.data);
                  },function(error){
                	  delDefered.reject(error);
                  });
                  var promise = delDefered.promise;
                  promise.then(function(result){
                	  empService.getEmpTree().then(function(result){
                		  $scope.isShow = false;
                		  $scope.initTree(result);
                    	  $scope.$emit('toaster', "success","","部门删除成功！");
                	  },function(error){
                		  $scope.$emit('toaster', "error","error","部门删除失败！");
                	  });
                  },function(error){
                	  $scope.$emit('toaster', "error","error","部门删除失败！");
                  });
            });
        }
	};
	
	$scope.getSelectEmpId = function(){
		alert(tree.get_all_selected_branch_id());
	};
});

app.run(['$rootScope','$resource',function($rootScope,$resource){
}]);