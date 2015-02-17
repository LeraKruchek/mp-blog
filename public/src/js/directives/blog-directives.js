/**
 * Created by Valeryia_Kruchak on 10-Feb-15.
 */
(function(){
    angular.module('blog-app.directives', [])
        .directive('backImage', backImage)
        .directive('navPrimary', navPrimary);

    function backImage() {
        return{
            restrict: 'A',
            scope :{
                backImage: '@'
            },
            link: function (scope, element, attrs) {
                attrs.$observe('backImage', function(url){
                        element.css({
                            'background-image': 'url(' + url + ')',
                            'background-size': 'cover'
                        });
                });

            }
        };
    }

    function navPrimary(){
        return{
            restrict: 'E',
            templateUrl: '/public/dist/templates/partials/nav-primary.html'
        };
    }

})();