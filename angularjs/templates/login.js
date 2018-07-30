app.controller("login", function ($scope, $location, dataService) {
    $scope.form = {}
    $scope.login = function () {
        $scope.loading = 'login';        
        dataService.login($scope.form).then(d => {
            $location.path('/');
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }
});

