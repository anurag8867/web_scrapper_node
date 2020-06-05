(function () {
    'use strict';

    function apiService($http) {

        var URL = 'http://localhost:3008/',
            TASK = 'scrap';

        function addTask(data) {
            return $http({
                method: 'POST',
                url: URL + 'scrap',
                data: data,
            });
        }

        function getDB() {
            return $http({
                method: 'GET',
                url: URL + `db`,
            });
        }

        function getTask(url = URL) {
            return $http({
                method: 'GET',
                url: URL + `scrap?url=${url}`,
            });
        }

        function updateTask(taskId, status) {
            let dataToUpdate = {
                "status": status
            };

            return $http.put(URL + TASK);
            // return $http.put(URL + TASK + "?searchBy=ObjectId&searchParam=" + taskId, dataToUpdate);
        }

        function deleteData(taskId) {
            return $http({
                method: 'DELETE',
                url: URL + `scrap`,
            });
        }

        return {
            addTask: addTask,
            getTask: getTask,
            updateTask: updateTask,
            deleteData: deleteData,
            getDB: getDB
        };
    }

    var app = angular.module('app'),
        requires = [
            '$http',
            apiService
        ];
    app.factory('apiService', requires);
}());
