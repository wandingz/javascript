var app = angular.module('myapp', ["ngRoute"]);
var localStorage = window.localStorage;

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: `<h2>Hello from Yi Zhao</h2>`
        })
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "login",
        })
        .when("/users", {
            templateUrl: "templates/users.html",
            controller: "users",
            resolve: {
                'auth': ['authService', function (authService) {
                    return authService.checkAuth();
                }]
            },
        })
        .when("/userList", {
            templateUrl: "templates/userList.html",
            controller: "userList",
            resolve: {
                'auth': ['authService', function (authService) {
                    return authService.checkAuth();
                }]
            },
        })
}).run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'Not Authenticated') {
            $location.path('/login');
        }
    })
})

app.factory("authService", function ($q, $rootScope) {
    var a = localStorage.getItem('auth') === 'loggedin';
    return {
        auth: a,
        checkAuth: function () {
            var defer = $q.defer();
            if (this.auth) {
                defer.resolve();
            } else {
                defer.reject('Not Authenticated');
            }
            return defer.promise;
        },
        login: function (obj) {
            var defer = $q.defer();
            if (obj.username === 'admin' && obj.password === 'admin') {
                this.auth = true;
                localStorage.setItem('auth', 'loggedin');
                defer.resolve({
                    username: user,
                });
            } else {
                defer.reject('Not Authenticated');
            }
            return defer.promise;
        },
        logout: function () {
            var defer = $q.defer();
            this.auth = false;
            localStorage.setItem('auth', 'out');
            // $rootscope.$broadcast('auth', {status: false})
            defer.resolve();
            return defer.promise;
        }
    }
});

app.controller("navBar", function ($scope, authService, $rootScope) {
    $scope.data = authService;

    $scope.logout = function () {
        authService.logout();
    };
});
