/* global angular */
'use strict';

//function to check if image is loaded
function imageLoaded(img) {
    return img.complete && (typeof img.naturalWidth === 'undefined' || img.naturalWidth !== 0);
}

function newsController($scope, $window, NewsService) {

    // Initialisations
    $scope.status = 0; // Statut
    $scope.news = {}; // News
    $scope.allnews = []; // Toutes les news

    // Fonction de lecture du fichier JSON et d'initialisation de la page
    function createData() {
        console.log("Fonction de lecture du fichier JSON");
        NewsService.getSpecificNews('2016.txt')
            .success(function(results) {
            $scope.news = results;
            $scope.allnews = results;
            createColumnResults($scope, $window);
        })
            .error(function(a, b, c) {
            $scope.status = -1;
        });
    };
    
    createData();

    // Définition des filtres

    // FILTRE DE RECHERCHE
    // Recherche dans le titre, le sous-titre et la description
    // Initialisation du texte de la zone de recherche
    
    // Définition de la fonction du filtre
    function filterForm(val) {
        if ($scope.allnews != undefined) {
            $scope.news = $scope.allnews.filter(function (obj) {
                var new_obj = formatNewsObject(obj);
                return (new_obj.text.indexOf(val) != -1);
            });
            createColumnResults($scope, $window);
        };
    }
    // Barre de recherche de texte
    $scope.$watch('searchTxt', function(val) {
        filterForm(val);
    });
    // Sélection d'une année
    $scope.$watch('searchDate', function(val) {
        if ($scope.allnews != undefined) {
            $scope.news = $scope.allnews.filter(function (obj) {
                var new_obj = formatNewsObject(obj);
                return (new_obj.date.indexOf(val) != -1);
            });
            createColumnResults($scope, $window);
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
        createColumnResults($scope, $window);
        changeButtonsState('allfilterbutton');
    }

    // Bouton 'Pala'
    $scope.filterByPala = function () {
        if (document.getElementById('palafilterbutton').classList.value.indexOf('active') != -1) {
            $scope.displayAll();
        } else {
            $scope.news = $scope.allnews.filter(function (obj) {
                var new_obj = formatNewsObject(obj);
                return (new_obj.text.indexOf('pala') != -1 || new_obj.text.indexOf('paleta') != -1);
            });
            createColumnResults($scope, $window);
            changeButtonsState('palafilterbutton');
        };
    };

    // Bouton 'Chistera'
    // Recherche dans le titre, le sous-titre, le tag et la description
    $scope.filterByChistera = function () {
        if (document.getElementById('chisterafilterbutton').classList.value.indexOf('active') != -1) {
            $scope.displayAll();
        } else {
            $scope.news = $scope.allnews.filter(function (obj) {
                var new_obj = formatNewsObject(obj);
                return (new_obj.text.indexOf('chistera') != -1 || new_obj.text.indexOf('cesta punta') != -1);
            });
            createColumnResults($scope, $window);
            changeButtonsState('chisterafilterbutton');
        }
    }

}