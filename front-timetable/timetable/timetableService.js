/**
 * Created by Erik.
 */

var dependencies = ['ngCookies'];

angular.module('EP.admin.assetment.classroom.services', dependencies)

    .value('CLASSROOM_GET_ENDPOINT', 'http://localhost:8000/api/admin/assetment/classroom/students')
    .value('CLASSROOM_SAVE_ENDPOINT', 'http://localhost:8000/admin/assetment/classroom/save')
    .value('CLASSLIST_ENDPOINT', 'http://localhost:8000/api/admin/assetment/classroom/classes')

    .factory('EPclassroomService', ['CLASSROOM_GET_ENDPOINT', 'CLASSROOM_SAVE_ENDPOINT','CLASSLIST_ENDPOINT', '$http','$cookieStore',
        function(CLASSROOM_GET_ENDPOINT, CLASSROOM_SAVE_ENDPOINT,CLASSLIST_ENDPOINT, $http, $cookieStore) {

            var classroom = {};

            classroom.getClassInfo = function(classId){
                return $http.get(CLASSROOM_GET_ENDPOINT +'?classId=' + classId).then(function(response, status) {
                    return response['data'];
                });
            }

            classroom.saveClassInfo = function(params, cid) {
                return $http.post(CLASSROOM_SAVE_ENDPOINT, {cid:cid, classInfo:params}).then(function(response, status) {
                    return response;
                });
            }

            classroom.getClassList = function(params) {
                return $http.get(CLASSLIST_ENDPOINT).then(function(response, status) {
                    return response['data'];
                });
            }

            return classroom;
        }]
);