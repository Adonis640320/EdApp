/**
 * Created by Administrator on 12/23/2015.
 */

var dependencies = ['ngCookies'];

angular.module('edApp.admin.assetment.classroom.services', dependencies)

    .value('CLASSROOM_ENDPOINT', 'http://localhost:8000/api/admin/assetment/classroom/save')

    .factory('classroomService', ['CLASSROOM_ENDPOINT', '$http', '$cookieStore',
        function(CLASSROOM_ENDPOINT, $http, $cookieStore) {

            var classroom = {};

            classroom.save = function(params) {
                return $http.post(CLASSROOM_ENDPOINT, {classInfo : params}).then(function(response, status) {
                    return response;
                });
            }

            return classroom;

        }]
);