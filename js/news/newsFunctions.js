
// Calcul du nombre de colonnes
function getNbColumns(imgWidth, imgHorSpace, windowWitdh) {
    // imgWidth : Largeur d'une vignette
    // imgHorSpace : Espacement horizontal entre les vignettes
    // windowWitdh : Largeur de la fenêtre

    // Marge minimum sur les côté droite/gauche de la page
    var margeWitdh = 10;

    // Calcul du nombre de colonnes
    var nb_col = Math.floor((((windowWitdh - margeWitdh * 2) + imgHorSpace) / (imgWidth + imgHorSpace)) - 1) + 1;

    // 4 colonnes maximum
    return Math.min(nb_col, 4);
};

// Fonction de traitement des résultats pour les diviser en plusieurs colonnes
function createColumnResults($scope, $window) {
    // Constantes
    var imgWidth = 310;
    var imgHorSpace = 20;
    var imgVerSpace = 20;

    var windowWitdh = $window.innerWidth;

    // Calcul du nombre de colonnes en fonction de la dimension de la fenêtre
    var nb_col = getNbColumns(imgWidth, imgHorSpace, windowWitdh);
    $scope.colBootsrap = 12 / nb_col;

    // Création d'un tableau de nb_col éléments contenant chacun une liste de news
    $scope.newsByColumn = [];
    for (var i = 0; i < $scope.news.length; i++) { 
        var colNumber = ((i / nb_col - Math.floor(i / nb_col)) * (nb_col * 1)).toFixed(0);
        if (typeof($scope.newsByColumn[colNumber]) == "undefined") {
            $scope.newsByColumn[colNumber] = [$scope.news[i]];
        } else {
            $scope.newsByColumn[colNumber].push($scope.news[i]);
        }
    }

};


// Fonction de récupération des champs de l'objet et d'initialisation 
// dans les cas où le champ est indéfini
function formatNewsObject(obj) {
    // Le champ text du nouvel objet contient le texte concaténé du titre, 
    // du sous-titre, du tag et de la description.
    var new_obj = {titre:'', sstitre:'', description:'', tag:'', text: '', date:''};
    if (obj.Titre != undefined) {
        new_obj.titre = obj.Titre.toLowerCase();
        new_obj.text = new_obj.text.concat(new_obj.titre);
    };
    if (obj.SousTitre != undefined) {
        new_obj.sstitre = obj.SousTitre.toLowerCase();
        new_obj.text = new_obj.text.concat(new_obj.sstitre);
    };
    if (obj.Description != undefined) {
        new_obj.description = '';
        for(var i = 0; i < obj.Description.length; i++) {
            new_obj.description = new_obj.description.concat(obj.Description[i].toLowerCase());
        };
        new_obj.text = new_obj.text.concat(new_obj.description);
    };
    if (obj.Tag != undefined) {
        new_obj.tag = obj.Tag.toLowerCase();
        new_obj.text = new_obj.text.concat(new_obj.tag);
    };
    if (obj.Date != undefined) {
        new_obj.date = obj.Date.toLowerCase();
    };
    return new_obj;
};