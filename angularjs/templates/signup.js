app.controller("signup", function ($scope, $location, dataService) {
    $scope.form = {}
    $scope.signup = function () {
        $scope.loading = 'signup';        
        dataService.signup($scope.form).then(d => {
            console.log(d);
            $location.path('/');
        }).catch(err => {
            console.log(err);
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
            console.log(dataService.user)
        });
    }
});

