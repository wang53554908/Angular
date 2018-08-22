'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl',function($scope, $rootScope,  $translate,   $localStorage,   $window ,$state,$http,toaster,$q,LoginService,menuService,$location) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
		host: "http://127.0.0.1:8080/MyProject",
        name: '后台管理系统',
        version: '1.3.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };
	  $scope.logout = function(){
		  LoginService.logout().then(function(result){
			  $window.localStorage.clear();
			  window.location.href="toLogin";
		  },function(){
			  $window.localStorage.clear();
			  window.location.href="toLogin";
		  });
	  };
	  $scope.selectTr = function(item){
	    	if(item.selected == true){
	    		item.selected = false;
	    	}else{
	    		item.selected = true;
	    	}
	    }
      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
      //弹出提示框，接收子页面的参数
      $scope.$on('toaster', function(event, type,title,text) {  
          toaster.pop(type,title,text);
      });
      
      LoginService.getSessionInfo().then(function(response){
    	  $rootScope.user = $localStorage.user = response.user;
    	  $rootScope.buttonPermissions = $localStorage.buttonPermissions = response.buttonPermissions;
    	  if($rootScope.user){
    		  if($localStorage.menu){
    			  $rootScope.menu = $localStorage.menu; 
    		  }else{
	    		  menuService.getLoginMenuTree().then(function(result){
	        		  $rootScope.menu = $localStorage.menu = result;
	        	  });
    		  }
    	  }else{
    		  window.location.href="toLogin";
    	  }
      },function(){
    	  window.location.href="toLogin";
      });

});
app.directive('hasPermission', function(permissions) {
  return {
    link: function(scope, element, attrs) {
      if(!angular.isString(attrs.hasPermission))
        throw "hasPermission value must be a string";
 
      var value = attrs.hasPermission.trim();
      var notPermissionFlag = value[0] === '!';
      if(notPermissionFlag) {
        value = value.slice(1).trim();
      }
 
      function toggleVisibilityBasedOnPermission() {
        var hasPermission = permissions.hasPermission(value);
 
        if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
          element.show();
        else
          element.hide();
      }
      toggleVisibilityBasedOnPermission();
      scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
    }
  };
});
app.factory('permissions', function ($rootScope) {
    var permissionList;
    return {
      setPermissions: function(permissions) {
        permissionList = permissions;
        $rootScope.$broadcast('permissionsChanged')
      },
      hasPermission: function (permission) {
        permission = permission.trim();
        var hasPermission = false;
        angular.forEach($rootScope.buttonPermissions, function(item) {
          if(angular.isString(item)){
            if(item.trim()==permission){
            	hasPermission = true;
            }
          }
        });
        return hasPermission;
      }
   };
  });
app.service("menuService",function($q,$http){
		return {
			getMenuTree:function(resId){
				if(resId==undefined || resId == ''){
					resId="";
				}
				var defer = $q.defer();
				$http({  
	      	        method:'POST',  
	      	        url:"menu/menuTree",
	      	        data:{resId:resId},
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
	      	    })
	      	    .error(function(error){
	      	    	defer.reject(error);
	      	    });
	            return defer.promise;
			},
			getLoginMenuTree:function(){
				var defer = $q.defer();
				$http({  
	      	        method:'POST',  
	      	        url:"menu/loginMenuTree",
	      	        data:{}
	      	      })    
	      	    .success(function(response,header,config,status){  
	      	    	defer.resolve(response.data);
	      	    })
	      	    .error(function(error){
	      	    	defer.reject(error);
	      	    });
	            return defer.promise;
			}
		}
	});
app.service("empService",function($q,$http){
	return {
		getEmpTree:function(){
			var defer = $q.defer();
			$http({  
      	          method:'POST',  
      	          url:"emp/empTree",
      	          data:{}
      	      })    
      	    .success(function(response,header,config,status){  
      	    	defer.resolve(response.data);
      	    })
      	    .error(function(error){
	      	    	defer.reject(error);
	      	    });
            return defer.promise;
		}
	}
});

app.service("positionService",function($q,$http){
	return {
		getPositionTree:function(){
			var defer = $q.defer();
			$http({  
      	        method:'POST',  
      	        url:"position/positionTree",
      	        data:{}
      	      })    
      	    .success(function(response,header,config,status){  
      	    	defer.resolve(response.data);
      	    })
      	    .error(function(error){
	      	    	defer.reject(error);
	      	    });
            return defer.promise;
		}
	}
});
angular.module('custom-template', [])
.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/confirmModelTemplate.html",
    '  <div class="modal-header">\n'+
    '    <h3>{{title}}</h3>\n'+
    '  </div>\n'+
    '  <div class="modal-body">{{content}}</div>\n'+
    '  <div class="modal-footer" style="text-align: center;">\n'+
    '    <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>\n'+
    '    <button type="button" class="btn btn-warning" ng-click="cancel()">取消</button>\n'+
    '  </div>\n'+
    "");
}]);
app.service('Common', ['$http', '$q', '$cookieStore', '$location','$modal',
   function ($http, $q, $cookieStore, $location,$modal) {
     return {
       openConfirmWindow: function(modalTitle,modalContent,modalInstance) {
         var deferred = $q.defer();
         /*
		 * modalInstance是在弹窗的基础上再弹出confirm确认框时从第一个弹窗中传进的$modalInstance,
		 * 若是直接在页面上弹出confirm确认框，则不能传$modalInstance,否则会报错
		 */
		 var confirmModal = $modal.open({
		   backdrop: 'static',
		   templateUrl : 'template/modal/confirmModelTemplate.html',  // 指向确认框模板
		   controller : 'ConfirmCtrl',// 初始化模态控制器
		   windowClass: "confirmModal",// 自定义modal上级div的class
		   size : 'sm', //大小配置
		   resolve : {
		     data : function(){
		       return {modalTitle: modalTitle,modalContent: modalContent};//surgeonSug: $scope.surgeonSug,
		     }
		   }
		 });
		 // 处理modal关闭后返回的数据
		 confirmModal.result.then(function() {
			   if(!!modalInstance) {
			     modalInstance.dismiss('cancel');
		       }
		       deferred.resolve();
		    },function(){
		     
		    });
		    return deferred.promise;
		 },
		 openPositionSelectWindow: function(modalInstance){
			 var deferred = $q.defer();
			 var selectModal = $modal.open({
				   backdrop: 'static',
				   templateUrl : 'admin/position/selectPositionTemplate.html',  // 指向确认框模板
				   controller : 'PositionSelectCtrl',// 初始化模态控制器
				   windowClass: "confirmModal",// 自定义modal上级div的class
				   size : '', //大小配置
				   resolve : {
				   }
		    });
			selectModal.result.then(function(result) {
			   if(!!modalInstance) {
			     modalInstance.dismiss('cancel');
		       }
		       deferred.resolve(result);
		    },function(){
		     
		    });
		     return deferred.promise;
		 },
		 openResSelectWindow:function(modalInstance){
			 var deferred = $q.defer();
			 var selectModal = $modal.open({
				   backdrop: 'static',
				   templateUrl : 'admin/responsibility/selectResTemplate.html',  // 指向确认框模板
				   controller : 'ResSelectCtrl',// 初始化模态控制器
				   windowClass: "confirmModal",// 自定义modal上级div的class
				   size : '', //大小配置
				   resolve : {
				   }
		    });
			selectModal.result.then(function(result) {
			   if(!!modalInstance) {
			     modalInstance.dismiss('cancel');
		       }
		       deferred.resolve(result);
		    },function(){
		     
		    });
		     return deferred.promise;
		 }
     }
}]);
app.controller('ConfirmCtrl', ['$scope', '$modalInstance','data', function($scope, $modalInstance,data){
	$scope.title = data.modalTitle;
	$scope.content = data.modalContent;
    $scope.ok = function () {
       $modalInstance.close();
   };
   $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
 };
}]);
app.controller('PositionSelectCtrl', ['$scope', '$modalInstance','positionService','$timeout', 
                                      function($scope, $modalInstance,positionService,$timeout){
	var tree;
	$scope.my_data = [];
	$scope.my_tree = tree = {};
	$scope.isInitFinish = false;
	
	positionService.getPositionTree().then(function(result){
		$scope.initTree(result);
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
	
    $scope.ok = function () {
       $modalInstance.close(tree.get_all_selected_branch_id());
    };
    $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ResSelectCtrl', ['$scope', '$modalInstance','$timeout','$rootScope' ,'$http',
                                      function($scope, $modalInstance,$timeout,$rootScope,$http){
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
    $scope.selectAll = function(){
        selected = !selected;
        angular.forEach($scope.data,function(item){
            item.selected = selected;
        });
    }
    
    var ids = [];
    
    var getSelectedIds = function(){
    	angular.forEach($scope.data,function(item){
    		if(item.selected){
    			ids.push(item.id);
    		}
    	});
    	return ids;
    };
	
    $scope.ok = function () {
       $modalInstance.close(getSelectedIds());
    };
    $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
    };
}]);

app.service('LoginService', function($http, $q) {
	return {
		login : function(data) {

			var deferred = $q.defer();
			$http({
				url : 'user/login',
				method : 'POST',
				data : data,
			}).then(
			// 通讯成功的处理
			function(response) {
				// console.log(response.errorInfo);
				// 在这里可以对返回的数据集做一定的处理,再交由controller进行处理
				deferred.resolve(response.data);
			},
			// 通讯失败的处理
			function(error) {
				// 可以先对失败的数据集做处理，再交由controller进行处理
				deferred.reject(error);
			});
			return deferred.promise;
		},

		logout : function() {
			var deferred = $q.defer();
			$http({
				url : 'user/logout',
				method : 'POST',
			}).then(
			// 通讯成功的处理
			function(response) {
				// console.log(response.errorInfo);
				// 在这里可以对返回的数据集做一定的处理,再交由controller进行处理
				deferred.resolve(response.data);
			},
			// 通讯失败的处理
			function(error) {
				// 可以先对失败的数据集做处理，再交由controller进行处理
				deferred.reject(error);
			});
			return deferred.promise;
		},

		getSessionInfo : function() {
			var deferred = $q.defer();
			$http({
				url : 'user/getUserInfo',
				method : 'GET',
			}).then(
			// 通讯成功的处理
			function(response) {
				// console.log(response.errorInfo);
				// 在这里可以对返回的数据集做一定的处理,再交由controller进行处理
				deferred.resolve(response.data);
			},
			// 通讯失败的处理
			function(error) {
				// 可以先对失败的数据集做处理，再交由controller进行处理
				deferred.reject(error);
			});
			return deferred.promise;
		},
		checkSession : function(){
			var deferred = $q.defer();
			$http({
				url : 'checkSession',
				method : 'GET',
			}).then(
			// 通讯成功的处理
			function(response) {
				// console.log(response.errorInfo);
				// 在这里可以对返回的数据集做一定的处理,再交由controller进行处理
				deferred.resolve(response.data);
			},
			// 通讯失败的处理
			function(error) {
				// 可以先对失败的数据集做处理，再交由controller进行处理
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};
});