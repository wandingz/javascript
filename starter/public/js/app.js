define(function () {
    var app = angular.module('myapp', ['ngRoute']);

    app.config(function ($routeProvider, $controllerProvider) {
        app.registerController = $controllerProvider.register;

        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html',
                controller: 'index',
                resolve: {
                    controller: ['loadController', function (loadController) {
                        return loadController.load('index');
                    }],
                },
            })
            .when('/profile', {
                templateUrl: 'templates/profile.html',
                controller: 'profile',
                resolve: {
                    controller: ['loadController', function (loadController) {
                        return loadController.load('profile');
                    }],
                    auth: ['authService', function (authService) {
                        return authService.checkAuth();
                    }],
                },
            });
    }).run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'Not Authenticated') {
                $location.path('/');
            }
        })
    })

    require(['controllers/appCtrl', 'services'], function () {
        angular.bootstrap(document, ['myapp']);
    });
});