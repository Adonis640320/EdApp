/**
 * Created by Erik
 */

'use strict';

var dependencies = [
    'ui.router',
    'ngCookies',
    'EP.admin.assetment.classroom.controllers',
];

angular.module('EP.admin.assetment.classroom', dependencies)

    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    controller: 'EPclassroomController',
                    template: '<div ui-view></div>'
                })

                .state('admin.assetment', {
                    url: '/assetment',
                    templateUrl: '/admin/assetment-classroom/views/EPclasstemp.html'
                })

                .state('admin.assetment.startclassroom', {
                    url: '/startClassroom',
                    templateUrl: '/admin/assetment-classroom/views/EPstart.html'
                })

                .state('admin.assetment.classroom', {
                    url: '/classroom',
                    templateUrl: '/admin/assetment-classroom/views/EPclassroom.html'
                })

                .state('admin.assetment.classroom.roomshape', {
                    url: '/roomshape',
                    templateUrl: '/admin/assetment-classroom/views/EProomshape.html'
                })                

                .state('admin.assetment.classroom.furniture', {
                    url: '/furniture',
                    templateUrl: '/admin/assetment-classroom/views/EPfurniture.html'
                })                
                
                .state('admin.assetment.classroom.desks', {
                    url: '/desks',
                    templateUrl: '/admin/assetment-classroom/views/EPdesks.html'
                })

                .state('admin.assetment.classroom.students', {
                    url: '/students',
                    templateUrl: '/admin/assetment-classroom/views/EPstudents.html'
                })

    }])

    .run(function($rootScope, $state) {
    });
