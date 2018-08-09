define(function () {
    angular.module('myapp').registerController('profile', ['$scope', 'dataService', function ($scope, dataService) {
        $scope.loading = false;
        $scope.username = "";
        $scope.search = function () {
            $scope.loading = true;
            dataService.search({ username: $scope.username })
                .then(u => {
                    $scope.user = u;
                })
                .catch(err => {
                    alert(err);
                })
                .finally(() => {
                    $scope.loading = false;
                })
        }
    }]);
});