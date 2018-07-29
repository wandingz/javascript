app.controller("signup", function ($scope, $location, dataService) {
    $scope.form = {}
    $scope.signup = function () {
        dataService.signup($scope.form).then(d => {
            $location.path('home');
        }).catch(err => {
            $scope.error_message = err;
        });
    }
});

