'use strict';

var mainApp = angular.module('mainApp', ['angularGrid']);

mainApp.service('dataService',['$http',function($http){
        this.loadData = function(){
            var url = "data/news/2016.txt";
            return $http.get(url);
        };
    }])

mainApp.controller('newsController', ['$scope','dataService','angularGridInstance', function($scope,dataService,angularGridInstance) {
    $scope.angularGridOptions = {
        gridWidth : 250,
        gutterSize : 20,
        refreshOnImgLoad : true
    }
    dataService.loadData().success(function(response){
        response.forEach(function(obj){
            obj.actualHeight = 100;
            obj.actualWidth = 280;
            if (typeof(obj.Titre) == "undefined") {
                obj.Titre = "";
            };
        });
        $scope.news = response;
        $scope.allnews = response;
    });

    //apply search on the list base on searchTxt which can be binded to an input element
    $scope.$watch('searchTxt', function (val) {
        val = val.toLowerCase();
        $scope.news = scope.allnews.filter(function (obj) {
            return obj.Titre.toLowerCase().indexOf(val) != -1;
        });
    });
    
    $scope.refresh = function(){
        angularGridInstance.gallery.refresh();
    };

    
    //window.addEventListener("resize", $scope.refresh);
}]);