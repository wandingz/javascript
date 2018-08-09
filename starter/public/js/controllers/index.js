define(function () {
    angular.module('myapp').registerController('index', ['$scope', 'authService', function ($scope, authService) {
        $scope.ctrlTitle = 'Index Page';
        $scope.data = authService;
    }]);
});