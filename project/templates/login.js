app.controller("login", function ($scope, $location, authService) {
    $scope.form = {}
    $scope.login = function () {
        $scope.loading = 'login';        
        console.log(authService)
        authService.login($scope.form).then(d => {
            $location.path('/');
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }
});

