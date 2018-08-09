require.config({
    baseUrl: 'js',
    paths: {
        angular: [
            'lib/angular.1.5.5', 
            'https://code.angularjs.org/1.5.5/angular.js'
        ],
        angular_route: 'lib/angular-route',
        app: 'app',
    },
    shim: {
        angular_route: {
            deps: ['angular'],
        },
        app: {
            deps: ["angular_route"],
        },
    },
});

require(['app'], function() {
    console.log('Application started. ');
});