/* global angular */
'use strict';

console.log("TEST2");
newsApp.factory('NewsService', NewsService);

function NewsService($http) {
    var urlBase = 'data/news';
    var service = {};

    service.getNews = function() {
    return $http.get(urlBase);
    };

    service.getSpecificNews = function(id) {
    return $http.get(urlBase + '/' + id);
    };

    //service.updateNews = function (news) {
    //    return $http.put(urlBase + '/' + project.id, news);
    //};

    return service;
}