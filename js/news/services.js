/* global angular */
'use strict';

function NewsService($http) {

    // URL de base des fichiers JSON
    var urlBase = 'data/news';
    var service = {};

    service.getNews = function() {
        return $http.get(urlBase);
    };

    service.getSpecificNews = function(id) {
        return $http.get(urlBase + '/' + id);
    };

    return service;
}