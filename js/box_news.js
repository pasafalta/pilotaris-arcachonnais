'use strict';

var mainApp = angular.module('mainApp', ['angularGrid']);

mainApp.controller('newsController', function($scope, $http) {
    $scope.gridWidth = 700;
    $scope.angularGridOptions = {
        gridWidth : 280,
        gutterSize : 10,
        refreshOnImgLoad : true
    }
    var url = "data/news/2016.txt";
    $http.get(url).success( function(response) {
        response.forEach(function(obj){
            obj.actualHeight = 100;
            obj.actualWidth = 280;
        });
        $scope.news = response;
    });
    $scope.refresh = function(){
        angularGridInstance.gallery.refresh();
    };

    
    //window.addEventListener("resize", $scope.refresh);
});