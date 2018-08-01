require.config({
    baseUrl: '.', 
    paths: {
        angular: ['libs/angular.1.5.5.js', 'https://code.angularjs.org/1.5.5/angular.js'],
        ngRoute: 'libs/angular-route.js',
        app: 'index.js',

        'index.js'
        'dataObejcts.js'
        'dataService.js'
        'templates/home.js'
        'templates/login.js'
        'templates/signup.js'
        'templates/messageList.js'
        'templates/messageDetail.js'
        'templates/profile.js'
    },
    shim: {
        ngRoute: {
            deps: ['angular']
        },
        app: {
            deps: ['angular', 'ngRoute']
        }
    }
})