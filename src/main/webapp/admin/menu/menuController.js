'use strict';

app.controller('menuController', function($scope,$rootScope, $resource,$state,$http,$injector,$timeout,$q,$modal,menuService) {
	
	var menuDeferred = $q.defer();
	
	var tree,menuEnums;
	$scope.isShow = false;
	$scope.menu = {};
	
	$scope.my_data = [];
	$scope.my_tree = tree = {};
	
	var getMenuEnums = function(){
		$http({  
	        method:'POST',  
	        url:"menu/menuTree",
	        data:{}
	      })    
	    .success(function(response,header,config,status){  
	    	menuDeferred.resolve(response.data);
	    })
	    .error(function(error){
	    	menuDeferred.reject(error);
	    });
		return menuDeferred.promise;
	}
	
	$q.all([getMenuEnums()]).then(function(result){
		menuEnums = result[0];
		$scope.initTree(menuEnums);
	});
	
	$scope.initTree = function(data){
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
			var $com = $resource("menu/:id/",{id:'@id'});
		    var resp = $com.get({id:branch.id},function(response){
		          $scope.menu = response.data;
		    });
		}else{
			$scope.edit_mode = false;
			$scope.menu.name="";
			$scope.menu.parentId = branch.pid;
			$scope.menu.url="";
			$scope.menu.sort="";
		}
	};
	
	$scope.add_menu = function(type) {
		var selectBranch = tree.get_selected_branch();
		if(type==0){//root
			$scope.menu.level=1;
			tree.add_root_branch({
		        label: '点击编辑新菜单',
		        pid:'',
		        level:1
		    });
			return tree.select_branch(tree.get_last_sibling(selectBranch));
		}
		if(type==1&&!selectBranch){
			$scope.$emit('toaster', "error","","请选择上级菜单！");  
			return;
		}
		if(!selectBranch.id){
			$scope.$emit('toaster', "error","","请先创建上级菜单！");  
			return;
		}
		if(selectBranch.level>=3){
			$scope.$emit('toaster', "error","","最多只能创建3级菜单！");  
			return;
		}
	    var b;
	    b = tree.get_selected_branch();
	    $scope.menu.level=b.level+1;
	    tree.add_branch(b, {
	        label: '点击编辑新菜单',
	        pid:b.id,
	        level:b.level+1,
	        children:[]
	    });
	    tree.select_branch(tree.last_descendant(selectBranch));
	};
	
	$scope.submit = function(){
		if($scope.edit_mode){
			var $com = $resource("menu/:id/",{id:'@id'},{
	              'update': { method:'POST' },
	        });
	        $com.update({id:$scope.menu.id},$scope.menu,function(data){
	        	tree.get_selected_branch().label=$scope.menu.name;
		    	$scope.$emit('toaster', "success","","菜单修改成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","菜单修改失败！");  
	        });
		}else{
			var $com = $resource("menu/save");
			$com.save($scope.menu,function(data){
	            var selectBranch = tree.get_selected_branch();
	            selectBranch.id = data.data.id;
	            selectBranch.label = data.data.name;
	            selectBranch.parentId = data.data.parentId;
	            $scope.edit_mode = true;
	            $scope.$emit('toaster', "success","","菜单创建成功！");  
	        },function(error){
	        	$scope.$emit('toaster', "error","error","菜单创建失败！");  
	        });
		}
	}
	
	$scope.del = function(){
		var selectBranch = tree.get_selected_branch();
		if(!selectBranch){
			$scope.$emit('toaster', "error","","请选择要删除的菜单！");
			return;
		}
		var ids = [];
		angular.forEach(tree.get_all_branch(selectBranch,true),function(data){
			ids.push(data.id);
		});
		if(ids.length>0){
            //弹出删除确认
            var modalInstance = $modal.open({
                templateUrl: 'admin/confirm.html',
                controller: 'ConfirmController',
                size:'sm',
            });
            modalInstance.result.then(function () {
            	  var delDefered = $q.defer();
        		  var $com = $resource("menu/deletes/");
                  $com.delete({'ids':ids.join(",")},function(response){
                	  delDefered.resolve(response.data);
                  },function(error){
                	  delDefered.reject(error);
                  });
                  var promise = delDefered.promise;
                  promise.then(function(result){
                	  menuService.getMenuTree("").then(function(result){
                		  $scope.isShow = false;
                		  $scope.initTree(result);
                    	  $scope.$emit('toaster', "success","","菜单删除成功！");
                	  });
                  },function(error){
                	  $scope.$emit('toaster', "error","error","菜单删除失败！");
                  });
            });
        }
	};
	
	$scope.getSelectMenuId = function(){
		alert(tree.get_all_selected_branch_id());
	};
});

app.controller('ConfirmController', ['$scope', '$modalInstance', function($scope, $modalInstance){
    $scope.ok = function () {
       $modalInstance.close();
   };
   $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
 };
}]);

app.run(['$rootScope','$resource',function($rootScope,$resource){
}]);