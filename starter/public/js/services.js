define(function () {

    angular.module('myapp').factory('loadController', ['$q', function ($q) {
        return {
            load: function (controller) {
                var defer = $q.defer();
                require(['controllers/' + controller], function () {
                    defer.resolve();
                });
                return defer.promise;
            }
        }
    }]);

    angular.module('myapp').factory('authService', ['$q', function ($q) {
        return {
            isAuth: false,
            unauth: function () {
                var defer = $q.defer();
                defer.resolve();
                this.isAuth = false;
                return defer.promise;
            },
            auth: function () {
                var defer = $q.defer();
                defer.resolve();
                this.isAuth = true;
                return defer.promise;
            },
            checkAuth: function () {
                var defer = $q.defer();
                if (this.isAuth) {
                    defer.resolve();
                } else {
                    defer.reject('Not Authenticated');
                }
                return defer.promise;
            },
        }
    }]);

    angular.module('myapp').factory('dataService', ['$q', '$http', function ($q, $http) {
        return {
            author: 'Yi Zhao',
            search: function (obj) {
                return $http.get('/api/users/' + obj.username).then(d => d.data);
            }
        }
    }]);
});