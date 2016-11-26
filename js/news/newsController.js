/* global angular */
'use strict';
console.log("TEST1");
var newsApp = angular.module('newsApp', ['angularGrid']);

newsApp.controller('newsController', newsController);

function newsController($scope, NewsService) {

    $scope.status = 0;

    $scope.news = {};
    $scope.allnews = [];
    
    $scope.angularGridOptions = {
        gridWidth : 250,
        gutterSize : 20,
        refreshOnImgLoad : true
    }

    _init();

    function _init() {
        NewsService.getSpecificNews('2016.txt')
            .success(function(results) {
            console.log("SUCCESS");
            console.log(results);
            $scope.news = results;
        })
            .error(function(a, b, c) {
            console.log("ERROR");
            $scope.status = -1;
        });
    };
    
    $scope.refresh = function(){
        angularGridInstance.gallery.refresh();
    };
    
    //apply search on the list base on searchTxt which can be binded to an input element
    $scope.$watch('searchTxt', function (val) {
        val = val.toLowerCase();
        $scope.news = $scope.allnews.filter(function (obj) {
            return obj.Titre.toLowerCase().indexOf(val) != -1;
        });
    });

    $scope.create = function() {
        console.log("Création d'un dossier de livraison.");
    };
}