'use strict';

var newsApp = angular.module('newsApp', ['angularGrid']);

newsApp.service('dataService',['$http',function($http){
    this.loadData = function(){
        var url = "data/news/2016.txt";
        return $http.get(url);
    };
}])

newsApp.controller('newsController', ['$scope','dataService','angularGridInstance', function($scope,dataService,angularGridInstance) {
    $scope.angularGridOptions = {
        gridWidth : 250,
        gutterSize : 20,
        refreshOnImgLoad : true
    }
    dataService.loadData().success(function(response) {
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

    //
    // FILTRES
    //

    // Fonction de récupération des champs de l'objet et d'initialisation dans les cas où le champ est indéfini
    function initialize_undefined_obj(obj) {
        var new_obj = {titre:'', sstitre:'', description:''};
        if (obj.Titre != undefined) {
            new_obj.titre = obj.Titre.toLowerCase();
        };
        if (obj.SousTitre != undefined) {
            new_obj.sstitre = obj.SousTitre.toLowerCase();
        };
        if (obj.Description != undefined) {
            new_obj.description = '';
            for(var i = 0; i < obj.Description.length; i++) {
                new_obj.description = new_obj.description.concat(obj.Description[i].toLowerCase());
            };
        };
        return new_obj;
    };

    // FILTRE DE RECHERCHE
    // Recherche dans le titre, le sous-titre et la description
    // Initialisation du texte de la zone de recherche
    $scope.$watch('searchTxt', function (val) {
        if (val == '') {
            $scope.news = $scope.allnews;
        } else {
            if ($scope.allnews != undefined) {
                $scope.news = $scope.news.filter(function (obj) {

                    var new_obj = initialize_undefined_obj(obj);

                    return (new_obj.titre.indexOf(val) != -1 || new_obj.sstitre.indexOf(val) != -1 || new_obj.description.indexOf(val) != -1);
                });
            };
        };
    });

    // FILTRES BOUTONS
    var liste_id_filter_buttons = ['allfilterbutton', 'palafilterbutton', 'chisterafilterbutton'];
    function changeButtonsState(activeButtonId)  {
        for(var i = 0; i < liste_id_filter_buttons.length; i++) {
            document.getElementById(liste_id_filter_buttons[i]).classList.remove('active');
        }
        document.getElementById(activeButtonId).classList.add('active');
    };
    // Bouton 'Tout afficher'
    $scope.displayAll = function () {
        $scope.news = $scope.allnews;
        changeButtonsState('allfilterbutton');
    }

    // Bouton 'Pala'
    $scope.filterByPala = function () {
        if (document.getElementById('palafilterbutton').classList.value.indexOf('active') != -1) {
            $scope.displayAll();
        } else {
            $scope.news = $scope.allnews.filter(function (obj) {

                var new_obj = initialize_undefined_obj(obj);

                return (new_obj.titre.indexOf('pala') != -1 || new_obj.sstitre.indexOf('pala') != -1 || new_obj.titre.indexOf('paleta') != -1 || new_obj.sstitre.indexOf('paleta') != -1);
            });
            changeButtonsState('palafilterbutton');
        };
    };

    // Bouton 'Chistera'
    $scope.filterByChistera = function () {
        if (document.getElementById('chisterafilterbutton').classList.value.indexOf('active') != -1) {
            $scope.displayAll();
        } else {
            $scope.news = $scope.allnews.filter(function (obj) {

                var new_obj = initialize_undefined_obj(obj);

                return (new_obj.titre.indexOf('chistera') != -1 || new_obj.sstitre.indexOf('chistera') != -1);
            });
            changeButtonsState('chisterafilterbutton');
        }
    }

    $scope.refresh = function(){
        angularGridInstance.gallery.refresh();
    };

}]);