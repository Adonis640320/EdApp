/**
 * Created by Erik
 */

'use strict';

var dependencies = [
    'ui.router',
    'ngCookies',
    'edApp.admin.assetment.classroom.controllers',
];

angular.module('edApp.admin.assetment.classroom', dependencies)

    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    controller: 'classroomController',
                    template: '<div ui-view></div>'
                })

                .state('admin.assetment', {
                    url: '/assetment',
                    templateUrl: '/admin/assetment-classroom/views/template.html'
                })

                .state('admin.assetment.startclassroom', {
                    url: '/startClassroom',
                    templateUrl: '/admin/assetment-classroom/views/start.html'
                })

                .state('admin.assetment.classroom', {
                    url: '/classroom',
                    templateUrl: '/admin/assetment-classroom/views/classroom.html'
                })

                .state('admin.assetment.classroom.roomshape', {
                    url: '/roomshape',
                    templateUrl: '/admin/assetment-classroom/views/roomshape.html'
                })                

                .state('admin.assetment.classroom.furniture', {
                    url: '/furniture',
                    templateUrl: '/admin/assetment-classroom/views/furniture.html'
                })                
                
                .state('admin.assetment.classroom.desks', {
                    url: '/desks',
                    templateUrl: '/admin/assetment-classroom/views/desks.html'
                })

                .state('admin.assetment.classroom.students', {
                    url: '/students',
                    templateUrl: '/admin/assetment-classroom/views/students.html'
                })

    }])

    .run(function($rootScope, $state) {
    });
