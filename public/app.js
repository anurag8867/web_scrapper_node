var app = angular.module('app', ['app']);
app.controller('appController', function ($scope, $http, apiService, $window) {
    let genericMessage = "Nothing fetched yet from DB";
    $scope.tutorialName = "https://www.imdb.com/title/tt0242519/";
    $scope.dbResp = genericMessage;
    $scope.tableCount = 0;
    $scope.showLoader = false;
    $scope.heading = `Please click get data from url or from DB button, if data is not there` +
        ` in db save the data after fetching from an URL`;

    $scope.get = function () {
        $scope.heading = "Fetching data from URL";
        $scope.dbResp = null;
        $scope.showLoader = true;
        $scope.tableCount = 0;
        apiService.getTask($scope.tutorialName).then(function (data) {
            $scope.showLoader = false;
            $scope.heading = "Data fetched from URL";
            // alert("Get operation completed");
            $scope.dbResp = data.data.result;
            $scope.tableCount = $scope.dbResp.length;
        }, function (err) {
            $scope.showLoader = false;
            $scope.heading = null;
            // alert(JSON.stringify(err && err.data));
            $scope.taskTitle = "";
        });
    };

    $scope.getDB = function () {
        $scope.heading = "fetching data from DB";
        $scope.dbResp = null;
        $scope.tableCount = 0;
        apiService.getDB().then(function (data) {
            $scope.heading = "Data fetched from DB";
            // alert("Get DB operation completed");
            if (!data || !data.data) $scope.heading = "There is no data in DB, first fetch the data and save into DB";
            $scope.dbResp = data.data;
            $scope.tableCount = $scope.dbResp.length
        }, function (err) {
            $scope.heading = null;
            // alert(JSON.stringify(err && err.data));
            $scope.dbResp = data.data;
        });
    };

    $scope.delete = function () {
        $scope.heading = "Flushing data from DB";
        $scope.dbResp = null;
        $scope.tableCount = 0;
        apiService.deleteData().then(function (data) {
            $scope.heading = "Data flushed from DB";
            // alert("Get DB operation completed");
            $scope.dbResp = null;
            $scope.tableCount = 0;
        }, function (err) {
            $scope.dbResp = null;
            $scope.tableCount = 0;
            $scope.heading = "Data flushed from DB";
            // alert(JSON.stringify(err && err.data));
        });
    };

    $scope.post = function () {
        $scope.heading = "Saving data to DB";
        $scope.tableCount = 0;
        if (!$scope.dbResp || $scope.dbResp === genericMessage) {
            $scope.heading = "There is not data to save into DB, first fetch data";
            return;
        }
        apiService.addTask({ data: $scope.dbResp }).then(function (data) {
            $scope.dbResp = null;
            $scope.tableCount = 0;
            $scope.heading = "Date Saved into DB";
            // alert("Post operation completed");
        }, function (err) {
            $scope.dbResp = null;
            $scope.tableCount = 0;
            $scope.heading = JSON.stringify(err);
            // alert(JSON.stringify(err && err.data));
            $scope.taskTitle = "";
        });
    };

    $scope.OpenTab = function (url) {
        if (!url) return;
        $window.open(url);
    };
});
