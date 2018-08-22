app.controller("mainController", ["$scope", "$modal", function($scope, $modal) {
            $scope.students = [
                {name:"小明", sex:"男", major:"计算机"},
                {name:"小花", sex:"女", major:"计算机"}
            ];


            $scope.open = function() {
                var scope = this;

                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'modalInstanceController',
                    resolve: {
                        student:{
                            name:scope.student.name,
                            sex:scope.student.sex,
                            major:scope.student.major
                        }
                    }
                });
                modalInstance.opened.then(function() {

                });

                modalInstance.result.then(function(result) {
                    //模拟修改
                    scope.student.name = result.name;
                    scope.student.sex = result.sex;
                    scope.student.major = result.major;

                }, function(reason) {

                });
            }
        }]);

        /*注入的时候是$uibModalInstance,不是modalInstance*/
        app.controller("modalInstanceController", function($scope, $modalInstance, student) {
            $scope.student = student;

            //取消
            $scope.gb = function() {
            	$modalInstance.dismiss("取消");
            }

            //保存
            $scope.bc = function() {
            	$modalInstance.close($scope.student);
            }
        });
