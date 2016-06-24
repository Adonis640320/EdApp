
/**
 * Created by Erik
 */

'use strict'

var dependencies = [
    'ngRoute',
    'ui.router',
    'ngCookies',
    'EP.admin.assetment.classroom',
];

angular.module('EP', dependencies)

    .config(
        ['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');
            $httpProvider.defaults = {withCredentials: true};
    }])

    .run(['$rootScope', '$state', '$cookieStore', function($rootScope, $state, $cookieStore) {
        $state.go('admin.assetment');
    }]);