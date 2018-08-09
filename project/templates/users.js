app.controller("users", function ($scope, $location, dataService) {
    $scope.allTypes = [
        { name: 'Admin', value: 'Admin' },
        { name: 'Manager', value: 'Manager' },
        { name: 'Consultant', value: 'Consultant' },
    ]
    $scope.form = {}
    $scope.addUser = function () {
        $scope.loading = 'addUser';
        dataService.addUser($scope.form).then(d => {
            $location.path('/userList');
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }
});

