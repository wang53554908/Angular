app.controller('LoadingController',function($rootScope,$scope,$resource,$state,$localStorage,LoginService,menuService){
      LoginService.getSessionInfo().then(function(response){
    	  $localStorage.user = response.user;
    	  if($localStorage.user!=undefined){
        	  menuService.getLoginMenuTree().then(function(result){
        		  $localStorage.menu=result;
        	  });
          }
    	  $state.go('app.dashboard');
      },function(){
    	  $state.go('auth.login');
      });
});
app.controller('LoginController',function($rootScope,$scope,$state,$http,$resource,$localStorage,LoginService){
    $scope.login = function(){
    	LoginService.login($scope.user).then(function(response) {
    		$localStorage.user = response.user;
			$state.go('app.dashboard',{reload:true});
		}, function() {
//			$scope.error = error;
			$state.go('auth.login');
		});
    }
});

app.run(function($rootScope){
	$rootScope.menu = {};
});