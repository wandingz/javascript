define(function () {
    var app = angular.module('myapp', ['ngRoute']);

    app.factory('loadController', function($q) {
        return {
            load: function(controller) {
                var defer = $q.defer();
                require(['controllers/' + controller], function(){
                    defer.resolve();
                });
                return defer.promise;
            }
        }
    });

    app.config(function ($routeProvider, $controllerProvider) {
        app.registerController = $controllerProvider.register;

        $routeProvider
            .when('/', {
                template: `<div>Home: {{ctrlTitle}}</div>`,
                controller: 'home',
                resolve: ['loadController', function(loadController) {
                    // require(['controllers/profile']);
                    return loadController.load('home');
                }]
            })
            .when('/profile', {
                template: `<div>Profile: {{ctrlTitle}}</div>`,
                controller: 'profile',
                resolve: ['loadController', function(loadController) {
                    return loadController.load('profile');
                }]
            });
    })

    require(['controllers/appCtrl'], function () {
        console.log('appCtrl is downloaded. ');
        angular.bootstrap(document, ['myapp']);
    });
});