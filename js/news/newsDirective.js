/* global angular */
'use strict';

function newsDirective($document) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
            position: 'relative',
            cursor: 'pointer',
            display: 'block',
        });
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left:  x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
}

// Fonction de raffraichissement du nombre de colonnes et de réagencement des données
// lors d'un raffraichissement de la page.
function newsResize($window) {
    return {
        link: link,
        restrict: 'A'
    };

    function link(scope, element, attrs){
        function onResize(){
            {
                createColumnResults(scope, $window);
                scope.$digest();
            }
        };

        angular.element($window).on('resize', onResize);

    };
};