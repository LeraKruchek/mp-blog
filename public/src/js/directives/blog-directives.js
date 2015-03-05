/**
 * Created by Valeryia_Kruchak on 10-Feb-15.
 */
(function(){
    angular.module('blog-app.directives', [])
        .directive('ngBackImage', ngBackImage)
        .directive('ngBackImageOverlay', ngBackImageOverlay)
        .directive('goHome', goHome);

    function ngBackImageOverlay() {
        return{
            restrict: 'A',
            scope :{
                ngBackImageOverlay: '@'
            },
            link: function (scope, element, attrs) {
                attrs.$observe('ngBackImageOverlay', function(url){
                        element.css({
                            'background-image': 'linear-gradient(rgba(46, 48, 57, 0.75), rgba(46, 48, 57, 0.75)),' +  'url(' + url + ')',
                            'background-size': 'cover'
                        });
                });

            }
        };
    }

    function ngBackImage() {
        return{
            restrict: 'A',
            scope :{
                ngBackImage: '@'
            },
            link: function (scope, element, attrs) {
                attrs.$observe('ngBackImage', function(url){
                    element.css({
                        'background-image': 'url(' + url + ')',
                        'background-size': 'cover'
                    });
                });

            }
        };
    }

    function goHome(){
        return{
            restrict: 'E',
            replace: true,
            template: '<a ui-sref="anon.firstPost"><img class="logo" src="/public/dist/images/logo.png"></a>'
        };
    }

})();