/* global angular */
'use strict';
(function(angular) {
    
    // Déclaration du module
    var newsAppModule = angular.module('newsApp', ['ngAnimate']);

    newsAppModule.controller('newsController', ['$scope', '$window', 'NewsService', newsController]);

    // newsAppModule.directive('newsformat', newsDirective);
    newsAppModule.directive('resize', newsResize);

    newsAppModule.factory('NewsService', NewsService);

    // configure the module.
    // in this example we will create a greeting filter
    newsAppModule.filter('greet', function() {
        return function(name) {
            return 'Hello, ' + name + '!';
        };
    });
    
})(window.angular);
