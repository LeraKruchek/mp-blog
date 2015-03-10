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


    goHome.$inject = ['$state'];
    function goHome($state){
        return{
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<a ui-sref="anon.firstPost"><ng-transclude></ng-transclude></a>',
            link: function(scope, element, attrs){
                element.on('click', function(e) {
                    if ($state.current.name === 'anon.firstPost') {
                        e.preventDefault();
                        $state.reload();
                    }
                });
            }
        };
    }

})();